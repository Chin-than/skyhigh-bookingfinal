// File: routes/flightRoutes.cjs
const express = require('express');
const router = express.Router();
const Flight = require('../models/Flight.cjs');

// Import the ALREADY REGISTERED metric from your main server file
const { httpRequestDurationSeconds } = require('../api/index.cjs');

// REMOVE the following lines:
// const client = require('prom-client');
// const httpRequestDurationMicroseconds = new client.Histogram({ ... });

router.get('/', async (req, res) => {
    // Use the imported metric
    const end = httpRequestDurationSeconds.startTimer(); 
    
    try {
        const flights = await Flight.findAll(); 
        res.json(flights);
        end({ route: '/api/flights', status_code: res.statusCode, method: req.method });
    } catch (err) {
        end({ route: '/api/flights', status_code: 500, method: req.method });
        res.status(500).send('Server Error');
    }
});

module.exports = router;