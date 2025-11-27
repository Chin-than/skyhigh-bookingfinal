// File: routes/flightRoutes.js
const express = require('express');
const router = express.Router();
const Flight = require('../models/Flight.cjs');

// NOTE: You'll need to seed your database with flight data first!

// @route   GET /api/flights/
// @desc    Fetch all available flights based on search criteria
router.get('/', async (req, res) => {
    // In a real application, you would use req.query (from, to, date)
    // to filter the MongoDB collection.

    try {
        // Fetch ALL flights for now, since filtering logic is complex and we are focusing on connection
        const flights = await Flight.find();
        
        // Return the array of flights
        res.json(flights);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error fetching flights');
    }
});

module.exports = router;