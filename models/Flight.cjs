// File: models/Flight.js

const mongoose = require('mongoose');

const FlightSchema = new mongoose.Schema({
    // Corresponds to your Flight interface in types.ts
    flightId: { type: String, required: true, unique: true },
    airline: String,
    flightNumber: String,
    origin: String,
    originCode: String,
    destination: String,
    destinationCode: String,
    departureTime: Date, // Use Date for easy comparison
    arrivalTime: Date,   // Use Date
    price: Number,
    duration: String,
    // Add seats property if you decide to store seat data per flight instance
});

module.exports = mongoose.model('Flight', FlightSchema);