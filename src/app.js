require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const requestId = require("./middleware/requestId");
const errorHandler = require("./middleware/errorHandler");

const queryRoute = require("./routes/query");
const demoRoute = require("./routes/demo");
const metricsRoute = require("./routes/metrics");
const debugRoute = require("./routes/debug");

const app = express();

// ==========================
// Middleware
// ==========================

app.use(express.json());

app.use(cors());

app.use(helmet());

app.use(morgan("dev"));

app.use(requestId);

// ==========================
// Routes
// ==========================

app.use("/query", queryRoute);

app.use("/demo", demoRoute);

app.use("/metrics", metricsRoute);

app.use("/debug", debugRoute);

// ==========================
// Root
// ==========================

app.get("/", (req, res) => {

    res.json({

        success: true,

        application: "Integral AI Assignment",

        version: "1.0.0",

        message: "AI Pipeline API is running 🚀"

    });

});

// ==========================
// Health
// ==========================

app.get("/health", (req, res) => {

    const memory = process.memoryUsage();

    res.json({

        success: true,

        status: "healthy",

        uptime: `${process.uptime().toFixed(2)} seconds`,

        timestamp: new Date().toISOString(),

        node: process.version,

        memory: {

            rss: `${(memory.rss / 1024 / 1024).toFixed(2)} MB`,

            heapUsed: `${(memory.heapUsed / 1024 / 1024).toFixed(2)} MB`

        }

    });

});

// ==========================
// 404
// ==========================

app.use((req, res) => {

    res.status(404).json({

        success: false,

        requestId: req.requestId,

        message: "Route not found"

    });

});

// ==========================
// Global Error Handler
// ==========================

app.use(errorHandler);

// ==========================
// Start Server
// ==========================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log("===================================");

    console.log(`🚀 Server running on port ${PORT}`);

    console.log(`📌 http://localhost:${PORT}`);

    console.log("===================================");

});