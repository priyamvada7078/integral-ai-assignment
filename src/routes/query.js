const express = require("express");

const router = express.Router();

const runPipeline = require("../pipeline/pipeline");

router.post("/", async (req, res, next) => {

    try {

        const { query } = req.body;

        if (!query || query.trim() === "") {

            return res.status(400).json({

                success: false,

                requestId: req.requestId,

                message: "Query is required"

            });

        }

        console.log(

            `[${req.requestId}] Incoming Query -> ${query}`

        );

        const result = await runPipeline(

            query,

            req.requestId

        );

        console.log(

            `[${req.requestId}] Request Completed`

        );

        res.status(200).json({

            requestId: req.requestId,

            ...result

        });

    }

    catch (err) {

        err.stage = err.stage || "Query Route";

        next(err);

    }

});

module.exports = router;