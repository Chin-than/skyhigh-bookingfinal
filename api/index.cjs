// File: api/index.cjs
const express = require('express');
const log = require('../services/logger.cjs');
const sequelize = require('../services/db.cjs'); 
const dotenv = require('dotenv');
const cors = require('cors');

// IMPORT from the metrics file
const { metricsRouter, httpRequestDurationSeconds } = require('../routes/metrics.cjs');

dotenv.config();
const app = express();

// ----- 1. GLOBAL LOGGING MIDDLEWARE -----
app.use((req, res, next) => {
    const start = Date.now();
    
    // Safety check: ensure metric exists before starting timer
    const end = (httpRequestDurationSeconds && typeof httpRequestDurationSeconds.startTimer === 'function') 
                ? httpRequestDurationSeconds.startTimer() 
                : null;
    
    res.on('finish', () => {
        const duration = Date.now() - start;
        
        // Update Prometheus if timer was started
        if (end) {
            end({
                method: req.method,
                route: req.route ? req.route.path : req.path,
                status_code: res.statusCode,
            });
        }

        // Write Structured JSON Log to app.log
        log("INFO", "HTTP request completed", {
            method: req.method,
            path: req.path,
            status_code: res.statusCode,
            duration_ms: duration,
            client_ip: req.ip || "127.0.0.1",
            user_agent: req.headers['user-agent'] || "unknown"
        }, "dispatch");
    });
    next();
});

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

// ----- 2. ROUTES -----
// Use require here directly to ensure they load after middleware is set
app.use('/api/auth', require('../routes/authRoutes.cjs'));
app.use('/api/flights', require('../routes/flightRoutes.cjs'));
app.use('/api/metrics', metricsRouter);

app.get('/', (req, res) => res.send('SkyHigh API is Running'));

// ----- 3. STARTUP LOGIC -----
const startServer = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
        log("INFO", "Database connection pool created successfully");

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            log("INFO", `Starting skyhigh-booking service environment=local version=1.0.0`);
            console.log(`🚀 Server started on http://localhost:${PORT}`);
        });
    } catch (error) {
        log("ERROR", `Failed to initialize database: ${error.message}`);
        console.error("❌ Database Connection Error:", error.message);
        process.exit(1);
    }
};

startServer();

module.exports = { app, sequelize };