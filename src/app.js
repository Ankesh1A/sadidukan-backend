const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const userRoutes = require("./routes/user.routes");
const profileRoutes = require("./routes/profile.routes.js");
const contactRoutes = require("./routes/contact.routes.js");
const razorpayRoutes = require("./routes/payment.routes.js");
const authRoutes = require('./routes/authRoutes');

const bodyParser = require('body-parser');
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

// ✅ Allowed frontend origins (NO trailing slashes!)
const allowedOrigins = [
  'http://localhost:5173',
  'https://sadi-five.vercel.app'
];

// ✅ Define CORS options
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// ✅ Apply CORS middleware BEFORE routes
app.use(cors(corsOptions));

// ✅ Handle preflight OPTIONS for all routes
app.options('*', cors(corsOptions));

// ✅ Debugging: log incoming origins (optional)
app.use((req, res, next) => {
  console.log("Request Origin:", req.headers.origin);
  next();
});

// ✅ Middleware
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());

// ✅ Routes
app.use("/user", userRoutes);
app.use("/profile", profileRoutes);
app.use("/contact", contactRoutes);
app.use("/razorpay", razorpayRoutes);
app.use("/api/auth", authRoutes);

// ✅ Export
module.exports = app;
