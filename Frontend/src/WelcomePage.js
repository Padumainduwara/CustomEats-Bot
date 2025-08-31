import React from "react";
import {
  Box,
  Button,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import logo from "./assets/Logo.png";
import background from "./assets/background.png";

export default function WelcomePage({ onStart }) {
  const theme = useTheme();

  const accentColor = "#ff7043";

  const listItems = [
    "Help us create a service designed for YOU",
    "Get early access to CustomEats",
    "Earn by inviting friends with your invitation link",
  ];

  const whatYouCanDoItems = [
    "Choose your meal type: Veg, Non-Veg, Mixed, or Diet Plan",
    "Select how many meals per day you want",
    "Share your delivery city",
    "Create your CustomEats profile",
    "Get your invitation link and start eat & earn rewards",
  ];

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center bottom",
        backgroundSize: "cover",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: { xs: 2, sm: 3, md: 4 }, // responsive padding
      }}
    >
      {/* Overlay for readability */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgcolor: "rgba(0, 0, 0, 0.1)",
          zIndex: 0,
        }}
      />
      {/* Content box */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          maxWidth: { xs: "90%", sm: 600, md: 720 },
          borderRadius: 3,
          boxShadow: "0 12px 24px rgba(255, 112, 67, 0.35)",
          bgcolor: theme.palette.background.paper,
          p: { xs: 3, sm: 5, md: 6 }, // responsive padding
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          color: theme.palette.text.primary,
          textAlign: "center",
        }}
      >
        {/* Logo */}
        <Box
          component="img"
          src={logo}
          alt="CustomEats Logo"
          sx={{
            height: { xs: 70, sm: 85, md: 100 },
            mb: { xs: 3, sm: 4 },
            userSelect: "none",
            mx: "auto",
          }}
        />
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontWeight: 700,
            mb: { xs: 2, sm: 3 },
            color: accentColor,
            fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3rem" },
          }}
        >
          Welcome to CustomEats
        </Typography>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 500,
            lineHeight: 1.6,
            mb: { xs: 3, sm: 4 },
            maxWidth: { xs: "100%", sm: 650 },
            mx: "auto",
            color: theme.palette.text.secondary,
            fontSize: { xs: "1rem", sm: "1.25rem" },
          }}
        >
          Your Meal. Your Way. Delivered.
          <br />
          Customize your meal plans and get early access rewards.
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mb: { xs: 3, sm: 4 },
            fontSize: { xs: "0.95rem", sm: "1.1rem" },
            maxWidth: { xs: "100%", sm: 680 },
            mx: "auto",
            color: theme.palette.text.secondary,
            whiteSpace: "pre-line",
          }}
        >
          {`CustomEats is the personalized meal delivery service where you’re in full
control — from choosing your favorite cuisines and dish types to deciding
how many meals you want per day, what portion size suits you, and even when
they should arrive at your doorstep.

We're preparing to launch soon — and we want your feedback to shape the
perfect meal experience!

No more early mornings in the kitchen. No more eating meals stored in the
fridge. Forget the grocery runs and the routine. Just open the app — we’ll
cook, you choose when and where to eat.

Fresh meals. New dishes every day. Pick a plan, customize your meals, and
let your phone be your kitchen. Your Meal. Your Way. Delivered.`}
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={onStart}
          sx={{
            bgcolor: accentColor,
            color: "white",
            px: { xs: 4, sm: 6 },
            py: { xs: 1.5, sm: 1.7 },
            fontWeight: "bold",
            fontSize: { xs: 16, sm: 18 },
            borderRadius: 3,
            mb: { xs: 4, sm: 6 },
            boxShadow: `0 6px 12px ${accentColor}88`,
            "&:hover": { bgcolor: "#e6603f" },
            transition: "all 0.3s ease",
            minWidth: { xs: "100%", sm: "auto" }, // full width on mobile
          }}
        >
          GET STARTED
        </Button>
        <Divider sx={{ mb: { xs: 3, sm: 4 }, borderColor: accentColor + "88" }} />
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            mb: 2,
            color: accentColor,
            fontSize: { xs: "1.1rem", sm: "1.25rem" },
          }}
        >
          By answering just a few quick questions, you’ll:
        </Typography>
        <List
          dense
          sx={{
            maxWidth: { xs: "100%", sm: 500 },
            mx: "auto",
            textAlign: "left",
            fontSize: { xs: "0.9rem", sm: "1rem" },
          }}
        >
          {listItems.map((text, i) => (
            <ListItem key={i} disableGutters>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <CheckCircleIcon sx={{ color: accentColor }} />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            mt: { xs: 4, sm: 5 },
            mb: 2,
            color: accentColor,
            fontSize: { xs: "1.1rem", sm: "1.25rem" },
          }}
        >
          What You Can Do:
        </Typography>
        <List
          dense
          sx={{
            maxWidth: { xs: "100%", sm: 500 },
            mx: "auto",
            textAlign: "left",
            fontSize: { xs: "0.9rem", sm: "1rem" },
          }}
        >
          {whatYouCanDoItems.map((text, i) => (
            <ListItem key={i} disableGutters>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <CheckCircleIcon sx={{ color: accentColor }} />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Typography
          variant="body1"
          sx={{
            fontWeight: 700,
            mt: { xs: 4, sm: 6 },
            color: accentColor,
            fontSize: { xs: "1rem", sm: "1.1rem" },
          }}
        >
          Be among the first to personalize your plate.
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontWeight: 700,
            color: accentColor,
            fontSize: { xs: "1rem", sm: "1.1rem" },
          }}
        >
          Freshly made. Fully yours.
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontWeight: 700,
            mt: 1,
            color: accentColor,
            fontSize: { xs: "1rem", sm: "1.1rem" },
          }}
        >
          Let’s get started.
        </Typography>
      </Box>
    </Box>
  );
}
