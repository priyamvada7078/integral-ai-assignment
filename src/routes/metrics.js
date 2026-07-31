const express = require("express");

const router = express.Router();

const debuggerService = require("../services/debugger");

router.get("/", (req, res) => {

    const traces = debuggerService.getAll();

    const total = traces.length;

    const cacheHits = traces.filter(
        t => t.cacheHit
    ).length;

    res.json({

        success: true,

        totalRequests: total,

        cacheHits,

        cacheHitRate:
            total === 0
                ? "0%"
                : `${((cacheHits / total) * 100).toFixed(2)}%`,

        recentExecutions: traces.slice(0, 10)

    });

});

module.exports = router;