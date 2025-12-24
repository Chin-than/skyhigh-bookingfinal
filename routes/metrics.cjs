// File: routes/metrics.cjs
const express = require('express');
const router = express.Router();
const client = require('prom-client');

const register = new client.Registry();
register.setDefaultLabels({ app: 'skyhigh-booking' });
client.collectDefaultMetrics({ register, prefix: 'node_' });

const httpRequestDurationSeconds = new client.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'route', 'status_code'],
    buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2, 5],
    registers: [register]
});

router.get('/', async (req, res) => {
    try {
        res.setHeader('Content-Type', register.contentType);
        res.send(await register.metrics());
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// IMPORTANT: Exporting as an object with specific keys
module.exports = { 
    metricsRouter: router, 
    register, 
    httpRequestDurationSeconds 
};   