const express = require("express");

const router = express.Router();

const runPipeline = require("../pipeline/pipeline");

router.post("/", async (req, res) => {

    const { query } = req.body;

    if (!query) {
        return res.status(400).json({
            success: false,
            message: "Query is required"
        });
    }

    const result = await runPipeline(query);

    res.status(200).json(result);

});

module.exports = router;