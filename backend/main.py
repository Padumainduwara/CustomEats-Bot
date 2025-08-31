from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from google.oauth2 import service_account
from googleapiclient.discovery import build
from pydantic import BaseModel
import os
import random
import string
from datetime import datetime

app = FastAPI()

# Allow CORS from your React frontend
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Google Sheets config
SERVICE_ACCOUNT_FILE = os.path.join(os.path.dirname(__file__), 'customeats-78ed979397f9.json')
SCOPES = ['https://www.googleapis.com/auth/spreadsheets']
SPREADSHEET_ID = '1qZ97u6arGla1Ph4T4p4Lma0F6LRHONz2gyxzxbsiiMA'

credentials = service_account.Credentials.from_service_account_file(
    SERVICE_ACCOUNT_FILE, scopes=SCOPES)
service = build('sheets', 'v4', credentials=credentials)
sheet = service.spreadsheets()

class UserData(BaseModel):
    meal_type: str
    meal_count: str
    budget: str
    living_location: str
    name: str
    phone: str
    email: str
    referral_code_used: str = None  # Optional referral code user used

def generate_referral_code(length=6):
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=length))

def find_row_by_referral_code(code):
    # Get all referral codes from column H (8th column)
    result = sheet.values().get(spreadsheetId=SPREADSHEET_ID, range='Sheet1!H2:H').execute()
    codes = result.get('values', [])
    for idx, row in enumerate(codes, start=2):  # Google Sheets rows start at 1, header row skipped
        if row and row[0] == code:
            return idx
    return None

def increment_referral_count(row_number):
    count_res = sheet.values().get(spreadsheetId=SPREADSHEET_ID, range=f'Sheet1!I{row_number}').execute()
    count_val = count_res.get('values', [['0']])[0][0]
    new_count = int(count_val) + 1
    body = {'values': [[str(new_count)]]}
    sheet.values().update(
        spreadsheetId=SPREADSHEET_ID,
        range=f'Sheet1!I{row_number}',
        valueInputOption='RAW',
        body=body
    ).execute()

@app.post("/submit-preferences")
async def submit_preferences(data: UserData):
    referral_code = generate_referral_code()

    # If referral code used by new user, increment that user's referral count
    if data.referral_code_used:
        row = find_row_by_referral_code(data.referral_code_used)
        if row:
            increment_referral_count(row)
        else:
            raise HTTPException(status_code=400, detail="Invalid referral code used.")

    now = datetime.now()
    date_str = now.strftime("%Y-%m-%d")      # e.g. 2025-06-07
    time_str = now.strftime("%H:%M:%S")      # e.g. 14:35:59

    values = [[
    data.meal_type,
    data.meal_count,
    f"AED {data.budget}",  # prepend AED for sheet display
    data.living_location,
    data.name,
    data.phone,
    data.email,
    referral_code,
    '0',
    data.referral_code_used or '',
    date_str,
    time_str
]]
    body = {'values': values}
    sheet.values().append(
        spreadsheetId=SPREADSHEET_ID,
        range='Sheet1!A:M',  # extended range including date/time columns
        valueInputOption='RAW',
        body=body
    ).execute()

    return {"status": "success", "referral_code": referral_code}
