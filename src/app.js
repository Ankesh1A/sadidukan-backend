const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const userRoutes = require("./routes/user.routes");
const profileRoutes = require("./routes/profile.routes.js");
const contactRoutes = require("./routes/contact.routes.js");
const razorpayRoutes = require("./routes/payment.routes.js");
const authRoutes = require('./routes/authRoutes');

// ✅ Define CORS properly
const express = require('express');
const cors = require('cors');
const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://sadi-five.vercel.app",
  "https://sadidukan-frontend.vercel.app"
];

const corsOptions = {
  origin:  "https://sadidukan-frontend.vercel.app",
  credentials: true,
};

app.use(cors(corsOptions));


// ✅ Handle OPTIONS (preflight) requests
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

// ✅ Logger
app.use(morgan("tiny"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Routes
app.use("/user", userRoutes);
app.use("/profile", profileRoutes);
app.use("/contact", contactRoutes);
app.use("/razorpay", razorpayRoutes);
app.use("/api/auth", authRoutes);

// ✅ Export app
module.exports = app;
