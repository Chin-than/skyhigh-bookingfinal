const express = require('express');
const router = express.Router();
const client = require('prom-client');

// Create a new Registry to manage metrics
const register = new client.Registry();

// Add a default label to all metrics (useful if you have multiple apps)
register.setDefaultLabels({
  app: 'skyhigh-booking'
});

// Enable collection of default system metrics (CPU, Memory, Event Loop, etc.)
client.collectDefaultMetrics({ 
    register,
    prefix: 'node_' // Optional: adds a prefix to default metrics
});

// Create a custom counter for HTTP requests (Optional example)
const httpRequestCounter = new client.Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status_code'],
    registers: [register]
});

// @route   GET /api/metrics
// @desc    Expose metrics for Prometheus scraping
router.get('/', async (req, res) => {
    try {
        res.setHeader('Content-Type', register.contentType);
        res.send(await register.metrics());
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;