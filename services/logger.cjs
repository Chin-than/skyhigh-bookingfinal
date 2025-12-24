//services/logger.cjs

const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, '../app.log');

const log = (level, message, extra = {}, funcName = "<module>") => {
    const timestamp = Date.now() / 1000;
    const dateStr = new Date().toISOString().replace('T', ' ').split('.')[0] + "+05:30";

    const logEntry = {
        "text": `${message}\n`,
        "record": {
            "elapsed": { "repr": "0:00:00.000000", "seconds": 0.0 },
            "exception": null,
            "extra": extra,
            "file": { "name": "index.cjs", "path": "skyhigh-booking/api/index.cjs" },
            "function": funcName,
            "level": { "icon": level === "ERROR" ? "❌" : "ℹ️", "name": level, "no": level === "ERROR" ? 40 : 20 },
            "line": 1, 
            "message": message,
            "module": "index",
            "name": "api.index",
            "process": { "id": process.pid, "name": "MainProcess" },
            "thread": { "id": 0, "name": "MainThread" },
            "time": { "repr": dateStr, "timestamp": timestamp }
        }
    };

    fs.appendFileSync(logFilePath, JSON.stringify(logEntry) + '\n');
};

module.exports = log;