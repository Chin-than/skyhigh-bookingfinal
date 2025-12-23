// File: routes/flightRoutes.cjs
const express = require('express');
const router = express.Router();
const Flight = require('../models/Flight.cjs');
// Import startTimer from your metrics file
const { startTimer } = require('./metrics.cjs');

// NOTE: You'll need to seed your database with flight data first!

// @route   GET /api/flights/
// @desc    Fetch all available flights based on search criteria
router.get('/', async (req, res) => {
    // Start the timer for this specific route
    // This matches the "route" label used in your Grafana query
    const end = startTimer('/api/flights/');

    try {
        // Fetch ALL flights
        const flights = await Flight.find(); // Use .find() for Mongoose
        
        // Return the array of flights
        res.json(flights);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error fetching flights');
    } finally {
        // Stop the timer and record the metric even if the request fails
        end();
    }
});

module.exports = router;