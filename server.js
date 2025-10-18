const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const path = require("path");
const cookieParser = require('cookie-parser');

const { connectToMongoDB } = require('./connect');
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const patientRoute = require('./routes/patientRoute');

const app = express();


const PORT = process.env.PORT || 5000;

connectToMongoDB(process.env.MONGO_URI);

// View Engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Middleware
app.use(express.json());  // Express built-in middleware to parse JSON
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); // to parse cookies

// auth routes -> jitne bhi req /auth k baad aegi vo authRoutes handle krega
app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRoutes);

app.use("/patient", patientRoute);

// Main page route
app.get('/', (req, res) => {
  res.render("home");
});

// Handle 404, if no route matches above
app.use((req, res) => {
  res.status(404).render("404", { title: "Page Not Found" });
});




app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});