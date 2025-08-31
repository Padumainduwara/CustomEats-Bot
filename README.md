# CustomEats: Personalized Meal Delivery Service

**CustomEats** is a full-stack web application for a personalized meal delivery service. It allows users to customize their meal plans and receive early-access rewards. The primary goal of this project is to gather user preferences to tailor the service to their specific needs.

## Key Features

* **Engaging Welcome Page:** A visually appealing landing page introduces users to the CustomEats service, outlining its benefits and what users can do.
* **Comprehensive User Preference Form:** A multi-step form allows users to input their meal preferences, including:
    * **Meal Type:** Options ranging from "Traditional Comforts" and "Healthy & Light" to "Vegetarian" and "Non-Vegetarian".
    * **Meals Per Day:** Users can select 1, 2, or 3 meals per day.
    * **Budget Plans:** A dynamic dropdown offers various budget plans (Wellness, Premium, Balanced, Essentials) based on the number of meals selected.
    * **Delivery Location:** Users specify their city for delivery.
* **User Information Collection:** The form securely collects user details such as name, phone number, and email address.
* **Built-in Referral System:**
    * Upon form submission, a unique referral code is generated for each user.
    * Users can easily share their referral link via a "Copy Link" button, WhatsApp, or Facebook.
    * The system tracks when a referral code is used and increments the referrer's count in the backend.
* **Snackbar Notifications:** The application provides real-time feedback for actions like successful form submission or copying a link to the clipboard.

## Technical Stack

This project is built with a modern tech stack, separated into a frontend and a backend.

### Frontend
* **Framework:** React
* **UI Components:** Material-UI (MUI) and Emotion for a polished and responsive user interface.
* **Animations:** Framer Motion for smooth transitions and animations.

### Backend
* **Framework:** Python FastAPI
* **Database:** Google Sheets is used as a lightweight database to store user submissions and referral data.
* **API:** A simple REST API endpoint (`/submit-preferences`) handles form submissions.

## How to Get It Running

To set up and run this project locally, follow these steps:

### Frontend Setup:

1.  Navigate to the `frontend` directory.
2.  Install the required packages by running:
    ```bash
    npm install
    ```
   
3.  Start the development server with:
    ```bash
    npm start
    ```
   

### Backend Setup:

1.  Navigate to the `backend` directory.
2.  Install the necessary Python packages from the `requirements.txt` file:
    ```bash
    pip install -r requirements.txt
    ```
   
3.  Run the FastAPI application using Uvicorn:
    ```bash
    uvicorn main:app --reload
    ```
   
4.  **Note:** You will need to set up your own `customeats-78ed979397f9.json` service account file and a Google Sheet to connect to the backend database.
