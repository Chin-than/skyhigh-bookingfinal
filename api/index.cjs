// File: api/index.cjs
const express = require('express');
const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');
const cors = require('cors');
const client = require('prom-client');

// ----- 1. INITIALIZE APP & ENV -----
dotenv.config();
const app = express(); // Initialized early to prevent ReferenceErrors
const sequelize = new Sequelize('skyhigh_db', 'postgres', 'root', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});

// ----- 2. PROMETHEUS SETUP -----
const register = new client.Registry();
client.collectDefaultMetrics({
    register,
    prefix: 'skyhigh_',
});

const httpRequestDurationSeconds = new client.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'route', 'status_code'],
    buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2, 5],
});
register.registerMetric(httpRequestDurationSeconds);

// ----- 3. GLOBAL MIDDLEWARE -----
app.use((req, res, next) => {
    const end = httpRequestDurationSeconds.startTimer();
    res.on('finish', () => {
        end({
            method: req.method,
            route: req.route ? req.route.path : req.path,
            status_code: res.statusCode,
        });
    });
    next();
});

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(express.json());

// ----- 4. DATABASE CONNECTION -----

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        // sync() creates tables based on models. 
        // Use { alter: true } during development to update tables as models change.
        await sequelize.sync({ alter: true }); 
        console.log('✅ Local PostgreSQL Connected Successfully!');
    } catch (error) {
        console.error('❌ PostgreSQL Connection Error:', error.message);
        process.exit(1);
    }
};

connectDB();



// ----- 5. ROUTES -----
// const authRoutes = require('../routes/authRoutes.cjs');
// const flightRoutes = require('../routes/flightRoutes.cjs');

// app.use('/api/auth', authRoutes);
// app.use('/api/flights', flightRoutes);

// Metrics endpoint
app.get('/api/metrics', async (req, res) => {
    try {
        res.setHeader('Content-Type', register.contentType);
        res.end(await register.metrics());
    } catch (err) {
        res.status(500).send('Error collecting metrics');
    }
});

app.get('/', (req, res) => {
    res.send('SkyHigh API is Running');
});

// ----- 6. SERVER START -----
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server started on http://localhost:${PORT}`));
}

module.exports = { app, sequelize };

const authRoutes = require('../routes/authRoutes.cjs');
const flightRoutes = require('../routes/flightRoutes.cjs');

app.use('/api/auth', authRoutes);
app.use('/api/flights', flightRoutes);