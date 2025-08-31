import React, { useState, useEffect } from "react";
import WelcomePage from "./WelcomePage";
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Fade,
  useMediaQuery,
  useTheme,
  Snackbar,
  Alert,
  Container,
} from "@mui/material";
import {
  ContentCopy as ContentCopyIcon,
  WhatsApp as WhatsAppIcon,
  Facebook as FacebookIcon,
} from "@mui/icons-material";

const budgetOptionsByMealCount = {
  "1 Meal": [
    {
      price: 799,
      plan: "Wellness Plan",
      idealFor: "Full-service users",
      description:
        "1 Meals + 1 Snack + 1 Drinks + 1 dessert (If you want you can Customize this Plan)",
    },
    {
      price: 699,
      plan: "Premium Plan",
      idealFor: "Health-focused, varied eaters",
      description:
        "1 Meals + 1 Snack + 1 Drinks or 1 dessert (If you want you can Customize this Plan)",
    },
    {
      price: 599,
      plan: "Balanced Plan",
      idealFor: "Regular eaters with light add-ons",
      description:
        "1 Meals + 1 Drink or 1 Dessert per day for 30 days (If you want you can Customize this Plan)",
    },
    {
      price: 499,
      plan: "Essentials Plan",
      idealFor: "Budget-conscious customers",
      description: "1 Meal per day for 30 days/no snacks, Juices, or dessert",
    },
  ],
  "2 Meals": [
    {
      price: 519,
      plan: "Wellness Plan",
      idealFor: "Full-service users",
      description: "2 Meals + 2 Snack + 2 Drinks + 2 dessert per day for 30 days (If you want you can Customize this Plan)",
    },
    {
      price: 499,
      plan: "Premium Plan",
      idealFor: "Health-focused, varied eaters",
      description: "2 Meals + 1 Snack + 2 Drinks or 2 dessert per day for 30 days (If you want you can Customize this Plan)",
    },
    {
      price: 459,
      plan: "Balanced Plan",
      idealFor: "Regular eaters with light add-ons",
      description: "2 Meals + 1 Drink or 1 Dessert per day for 30 days (If you want you can Customize this Plan)",
    },
    {
      price: 429,
      plan: "Essentials Plan",
      idealFor: "Budget-conscious customers",
      description: "2 Meal per day for 30 days/no snacks, Juices, or dessert",
    },
  ],
  "3 Meals": [
    { price: 330, plan: "Wellness Plan", idealFor: "Full-service users", description: "3 meals + snack + juice + healthy dessert" },
    { price: 300, plan: "Premium Plan", idealFor: "Health-focused, varied eaters", description: "3 meals + 1 snack + 1 fresh juice" },
    { price: 260, plan: "Balanced Plan", idealFor: "Regular eaters with light add-ons", description: "3 meals + 1 daily snack" },
    { price: 220, plan: "Essentials Plan", idealFor: "Budget-conscious customers", description: "3 basic meals/day (no snacks, juices, or dessert)" },
  ],
};

export default function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [showWelcome, setShowWelcome] = useState(true);

  const [formData, setFormData] = useState({
    meal_type: "",
    meal_count: "",
    budget: "",
    living_location: "",
    name: "",
    phone: "",
    email: "",
    referral_code_used: "",
  });

  const [budgetOptions, setBudgetOptions] = useState([]);

  const [referralCode, setReferralCode] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // 'success' | 'error'
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Submit button loading state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Parse referral code from URL on first render
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const refCode = params.get("ref");
    if (refCode) {
      setFormData((prev) => ({ ...prev, referral_code_used: refCode }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

     setFormData((prev) => ({
    ...prev,
    [name]: name === "budget" ? value.toString() : value,
  }));

    if (name === "meal_count") {
    if (budgetOptionsByMealCount[value]) {
      setBudgetOptions(budgetOptionsByMealCount[value]);
      setFormData((prev) => ({ ...prev, budget: "" }));
    } else {
      setBudgetOptions([]);
    }
  }
};

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // prevent double submit

    setIsSubmitting(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/submit-preferences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
  let errData;
  try {
    errData = await res.json();
  } catch {
    errData = { detail: "Unknown error occurred." };
  }
  const detail = typeof errData.detail === "string" ? errData.detail : JSON.stringify(errData.detail);
  setSnackbarSeverity("error");
  setSnackbarMessage(`Submission failed: ${detail}`);
  setSnackbarOpen(true);
  setIsSubmitting(false);
  return;
}

      const data = await res.json();
      setReferralCode(data.referral_code);
      setSubmitted(true);
      setSnackbarSeverity("success");
      setSnackbarMessage("Form submitted successfully!");
      setSnackbarOpen(true);
    } catch (err) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Error submitting form. Please try again.");
      setSnackbarOpen(true);
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const referralLink = referralCode
    ? `${window.location.origin}/?ref=${referralCode}`
    : "";

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(referralLink)
      .then(() => {
        setSnackbarSeverity("success");
        setSnackbarMessage("Referral link copied!");
        setSnackbarOpen(true);
      })
      .catch(() => {
        setSnackbarSeverity("error");
        setSnackbarMessage("Failed to copy referral link.");
        setSnackbarOpen(true);
      });
  };

  if (showWelcome) {
    return <WelcomePage onStart={() => setShowWelcome(false)} />;
  }

  if (submitted) {
    return (
      <>
        <Fade in={true}>
          <Container maxWidth="sm" sx={{ mt: 8, textAlign: "center" }}>
            <Box
              sx={{
                bgcolor: "#fdf6f0",
                p: 5,
                borderRadius: 3,
                boxShadow:
                  "0 8px 24px rgba(255, 165, 125, 0.3), 0 6px 12px rgba(255, 200, 150, 0.25)",
              }}
            >
              <Typography
                variant={isMobile ? "h4" : "h3"}
                fontWeight="700"
                gutterBottom
                color="primary.main"
              >
                Thank You!
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                mb={4}
                sx={{ lineHeight: 1.6 }}
              >
                Your form was submitted successfully.
              </Typography>
              <Typography
                variant="h5"
                color="secondary.main"
                mb={2}
                fontWeight="600"
              >
                Your referral code is: {referralCode}
              </Typography>
              <Typography color="text.secondary" mb={4}>
                Share your referral link with friends and earn rewards!
              </Typography>
              <TextField
                fullWidth
                value={referralLink}
                InputProps={{ readOnly: true }}
                sx={{ bgcolor: "#fff6f3", borderRadius: 2, mb: 4 }}
              />
              <Box display="flex" justifyContent="center" gap={2} flexWrap="wrap">
                <Button
                  variant="outlined"
                  startIcon={<ContentCopyIcon />}
                  onClick={copyToClipboard}
                  sx={{ color: "primary.main", borderColor: "primary.main" }}
                >
                  Copy Link
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  href={`https://wa.me/?text=Join%20CustomEats%20with%20my%20referral%20link%20${encodeURIComponent(
                    referralLink
                  )}`}
                  target="_blank"
                  startIcon={<WhatsAppIcon />}
                  sx={{ minWidth: 120 }}
                >
                  WhatsApp
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    referralLink
                  )}`}
                  target="_blank"
                  startIcon={<FacebookIcon />}
                  sx={{ minWidth: 120 }}
                >
                  Facebook
                </Button>
              </Box>
            </Box>
          </Container>
        </Fade>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </>
    );
  }

  return (
    <>
      <Fade in={true}>
        <Container maxWidth="sm" sx={{ mt: 8, mb: 6 }}>
          <Box
            sx={{
              bgcolor: "#fdf6f0",
              p: { xs: 3, sm: 5 },
              borderRadius: 3,
              boxShadow:
                "0 8px 24px rgba(255, 165, 125, 0.3), 0 6px 12px rgba(255, 200, 150, 0.25)",
            }}
          >
            <Typography
              variant="h5"
              fontWeight="700"
              color="secondary.main"
              mb={4}
              align="center"
              sx={{ letterSpacing: 0.5 }}
            >
              Customize Your Meal Preferences
            </Typography>

            <form onSubmit={handleSubmit} noValidate>
              <FormControl fullWidth sx={{ mb: 3 }}>
  <InputLabel>Meal Type</InputLabel>
  <Select
    name="meal_type"
    value={formData.meal_type}
    label="Meal Type"
    onChange={handleChange}
    required
    sx={{ bgcolor: "#fff6f3", borderRadius: 2 }}
  >
    <MenuItem value="">
      <em>None</em>
    </MenuItem>
    <MenuItem value="Traditional Comforts">
      Traditional Comforts (Home-style cultural meals – Emirati, Indian, Filipino, Sri Lankan, etc.)
    </MenuItem>
    <MenuItem value="Healthy & Light">
      Healthy & Light (Low-cal, protein-rich, keto, or balanced diet)
    </MenuItem>
    <MenuItem value="Continental & Modern">
      Continental & Modern (Pastas, grills, wraps, sandwiches)
    </MenuItem>
    <MenuItem value="Vegetarian Only">
      Vegetarian Only (Plant-based, eggless, or with dairy)
    </MenuItem>
    <MenuItem value="Non-Vegetarian Only">
      Non-Vegetarian Only (Chicken, seafood, red meat options)
    </MenuItem>
    <MenuItem value="Mixed">
      Mixed (Veg + Non-Veg) (Flexible & varied each day)
    </MenuItem>
    <MenuItem value="Custom">
      I'd like to build my own combinations daily
    </MenuItem>
  </Select>
</FormControl>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Meals Per Day</InputLabel>
                <Select
                  name="meal_count"
                  value={formData.meal_count}
                  label="Meals Per Day"
                  onChange={handleChange}
                  required
                  sx={{ bgcolor: "#fff6f3", borderRadius: 2 }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="1 Meal">1 Meal Per Day</MenuItem>
                  <MenuItem value="2 Meals">2 Meals Per Day</MenuItem>
                  <MenuItem value="3 Meals">3 Meals Per Day</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Budget</InputLabel>
                <Select
                  name="budget"
                  value={formData.budget}
                  label="Budget"
                  onChange={handleChange}
                  required
                  sx={{ bgcolor: "#fff6f3", borderRadius: 2 }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {budgetOptions.map((option) => (
                    <MenuItem key={option.price} value={option.price}>
                      AED {option.price} ({option.plan})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {formData.budget && (
                <Box
                  sx={{
                    bgcolor: "#fff6f3",
                    p: 2,
                    borderRadius: 2,
                    mb: 3,
                    boxShadow: "0 0 10px rgba(0,0,0,0.05)",
                  }}
                >
                  {budgetOptions
                    .filter((opt) => opt.price.toString() === formData.budget.toString())
                    .map((opt) => (
                      <Box key={opt.price}>
                        <Typography variant="subtitle1" fontWeight="bold" color="primary">
                          {opt.plan}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Ideal For: {opt.idealFor}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" mt={1}>
                          {opt.description}
                        </Typography>
                      </Box>
                    ))}
                </Box>
              )}

              <TextField
                fullWidth
                label="Living Location"
                name="living_location"
                value={formData.living_location}
                onChange={handleChange}
                placeholder="Enter your city"
                required
                sx={{ bgcolor: "#fff6f3", borderRadius: 2, mb: 3 }}
              />

              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                sx={{ bgcolor: "#fff6f3", borderRadius: 2, mb: 3 }}
              />

              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                sx={{ bgcolor: "#fff6f3", borderRadius: 2, mb: 3 }}
              />

              <TextField
                fullWidth
                label="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                type="email"
                sx={{ bgcolor: "#fff6f3", borderRadius: 2, mb: 3 }}
              />

              <input
                type="hidden"
                name="referral_code_used"
                value={formData.referral_code_used}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isSubmitting}
                sx={{
                  bgcolor: "primary.main",
                  color: "#fff",
                  fontWeight: "700",
                  fontSize: 16,
                  py: 1.5,
                  borderRadius: 2,
                  boxShadow: "0 4px 10px rgba(217, 90, 54, 0.4)",
                  "&:hover": {
                    bgcolor: "primary.dark",
                    boxShadow: "0 6px 20px rgba(217, 90, 54, 0.6)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </Box>
        </Container>
      </Fade>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
