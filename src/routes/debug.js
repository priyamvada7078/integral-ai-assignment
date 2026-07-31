const express = require("express");

const router = express.Router();

const debuggerService = require("../services/debugger");

// GET /debug
router.get("/", (req, res) => {

    res.json({

        success: true,

        total: debuggerService.count(),

        traces: debuggerService.getAll()

    });

});

// GET /debug/:requestId
router.get("/:requestId", (req, res) => {

    const trace = debuggerService.getByRequestId(

        req.params.requestId

    );

    if (!trace) {

        return res.status(404).json({

            success: false,

            message: "Debug trace not found"

        });

    }

    res.json({

        success: true,

        trace

    });

});

module.exports = router;