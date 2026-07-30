const planner = require("../agents/planner");
const retriever = require("../agents/retriever");
const reasoner = require("../agents/reasoner");
const validator = require("../agents/validator");
const formatter = require("../agents/formatter");

const compressContext = require("../services/compressor");
const estimateTokens = require("../services/tokenCounter");
const Metrics = require("../services/metrics");

async function runPipeline(query) {

    const metrics = new Metrics();

    try {

        // Planner
        const plan = planner(query);

        // Retriever
        const retrieved = retriever(plan);

        // Before Optimization
        const beforeTokens = estimateTokens(retrieved.context);

        metrics.setBeforeTokens(beforeTokens);

        // Compress Context
        const compressedContext = compressContext(retrieved.context);

        retrieved.context = compressedContext;

        // After Optimization
        const afterTokens = estimateTokens(compressedContext);

        metrics.setAfterTokens(afterTokens);

        // Reasoning
        const answer = reasoner(retrieved);

        // Validation
        const validated = validator(answer);

        // Formatting
        const formatted = formatter(validated);

        return {

            ...formatted,

            metrics: {

                beforeTokens: metrics.beforeTokens,

                afterTokens: metrics.afterTokens,

                savedTokens: metrics.getSavedTokens(),

                reduction: metrics.getReductionPercentage(),

                latency: metrics.getLatency(),

                cacheHit: metrics.cacheHit,

                retries: metrics.retryCount

            }

        };

    }

    catch (err) {

        return {

            success: false,

            error: err.message

        };

    }

}

module.exports = runPipeline;