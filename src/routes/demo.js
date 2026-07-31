const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {

    res.json({

        success: true,

        message: "Demo showing token optimization results",

        sampleQuery: "Explain Artificial Intelligence and its applications",

        beforeOptimization: {

            systemPrompt: 15000,

            conversationHistory: 25000,

            retrievedContext: 60000,

            totalTokens: 100000

        },

        afterOptimization: {

            compressedPrompt: 2000,

            smartRetrieval: 8000,

            cachedPrompt: 2000,

            totalTokens: 12000

        },

        improvement: {

            tokensSaved: 88000,

            reductionPercentage: "88%"

        },

        note: "Values are representative demo metrics illustrating the optimization approach."

    });

});

module.exports = router;