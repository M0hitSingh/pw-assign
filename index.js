const cors = require('cors');
const dotenv = require('dotenv');
const express = require("express");
const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");

const authRoutes = require('./routes/auth.route');

// Load environment variables
dotenv.config();

// Create Express server
const app = express();

// Connecting Database
app.listen(process.env.PORT);
console.log("App is running at http://localhost:%d ",process.env.PORT);

// Express configuration
app.use(express.json());


// CORS configuration
const corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
app.options("*", cors);


// My Routes
app.use("/api/auth",authRoutes);

// Error handling
app.use(errorHandler)
app.use(notFound);

module.exports = app;