// Imports
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

// ✅ List of allowed frontend domains
const allowedOrigins = [
  "http://localhost:5173",
  "https://sadi-five.vercel.app",
  "https://sadidukan-frontend.vercel.app"
];

// ✅ CORS middleware
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (e.g., mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

// ✅ Preflight OPTIONS requests
app.options("*", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(204);
});


app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

// Logger & Body Parsing
app.use(morgan("tiny"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const userRoutes = require("./routes/user.routes");
const profileRoutes = require("./routes/profile.routes.js");
const contactRoutes = require("./routes/contact.routes.js");
const razorpayRoutes = require("./routes/payment.routes.js");
const authRoutes = require("./routes/authRoutes");

app.use("/user", userRoutes);
app.use("/profile", profileRoutes);
app.use("/contact", contactRoutes);
app.use("/razorpay", razorpayRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;
