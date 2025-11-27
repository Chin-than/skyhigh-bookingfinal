// File: server.js
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors'); // To allow front-end and back-end to communicate

// Import Routes
const authRoutes = require('../routes/authRoutes.cjs');
const flightRoutes = require('../routes/flightRoutes.cjs');

// Load environment variables (like MONGO_URI) from .env file
dotenv.config();

const app = express();

// --- MIDDLEWARE ---
// Use CORS to allow requests from your Vite front-end (http://localhost:3000)
app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true,
}));
// Allows the server to read JSON data from the request body
app.use(express.json());

// --- DATABASE CONNECTION ---
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/skyhighDB';

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('✅ MongoDB Connected Successfully!');
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        process.exit(1);
    }
}

connectDB();

// --- API ROUTES ---
app.use('/api/auth', authRoutes);      // Handles /api/auth/login, /api/auth/signup
app.use('/api/flights', flightRoutes); // Handles /api/flights/search, etc.

// Basic Test Route
app.get('/', (req, res) => {
    res.send('SkyHigh API is Running');
});

// --- START SERVER ---
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`🚀 Server started on http://localhost:${PORT}`));