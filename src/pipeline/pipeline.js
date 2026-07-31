const planner = require("../agents/planner");
const retriever = require("../agents/retriever");
const reasoner = require("../agents/reasoner");
const validator = require("../agents/validator");
const formatter = require("../agents/formatter");

const compressContext = require("../services/compressor");
const estimateTokens = require("../services/tokenCounter");
const Metrics = require("../services/metrics");
const {
    getCachedResponse,
    saveResponse
} = require("../services/cache");

const debuggerService = require("../services/debugger");

async function runPipeline(query, requestId = "N/A") {

    const metrics = new Metrics();

    const debug = {
        requestId,
        query,
        stages: {},
        startedAt: new Date().toISOString()
    };

    console.log(`[${requestId}] Pipeline Started`);

    // ---------------- CACHE ----------------

    const cached = getCachedResponse(query);

    if (cached) {

        metrics.setCacheHit(true);

        console.log(`[${requestId}] Cache Hit`);

        debuggerService.save({
            ...debug,
            cacheHit: true,
            completedAt: new Date().toISOString()
        });

        return {

            ...cached,

            metrics: {

                ...cached.metrics,

                cacheHit: true,

                latency: metrics.getLatency()
            }

        };

    }

    try {

        // ==========================
        // Planner
        // ==========================

        let start = performance.now();

        const plan = planner(query);

        metrics.addStageTime(
            "planner",
            performance.now() - start
        );

        debug.stages.planner = "completed";

        console.log(`[${requestId}] Planner completed`);

        // ==========================
        // Retriever
        // ==========================

        start = performance.now();

        const retrieved = retriever(plan);

        metrics.addStageTime(
            "retriever",
            performance.now() - start
        );

        debug.stages.retriever = "completed";

        console.log(`[${requestId}] Retriever completed`);

        // ==========================
        // Compression
        // ==========================

        start = performance.now();

        const beforeTokens = estimateTokens(
            retrieved.context
        );

        metrics.setBeforeTokens(beforeTokens);

        const compressedContext =
            compressContext(retrieved.context);

        retrieved.context = compressedContext;

        const afterTokens =
            estimateTokens(compressedContext);

        metrics.setAfterTokens(afterTokens);

        metrics.addStageTime(
            "compressor",
            performance.now() - start
        );

        debug.stages.compressor = "completed";

        console.log(
            `[${requestId}] Compression saved ${metrics.getReductionPercentage()}%`
        );

        // ==========================
        // Reasoner
        // ==========================

        start = performance.now();

        const answer = reasoner(retrieved);

        metrics.addStageTime(
            "reasoner",
            performance.now() - start
        );

        debug.stages.reasoner = "completed";

        console.log(`[${requestId}] Reasoner completed`);

        // ==========================
        // Validator
        // ==========================

        start = performance.now();

        const validated = validator(answer);

        metrics.addStageTime(
            "validator",
            performance.now() - start
        );

        debug.stages.validator = "completed";

        console.log(`[${requestId}] Validator completed`);

        // ==========================
        // Formatter
        // ==========================

        start = performance.now();

        const formatted = formatter(validated);

        metrics.addStageTime(
            "formatter",
            performance.now() - start
        );

        debug.stages.formatter = "completed";

        console.log(`[${requestId}] Formatter completed`);

        const response = {

            ...formatted,

            metrics: {

                beforeTokens: metrics.beforeTokens,

                afterTokens: metrics.afterTokens,

                savedTokens: metrics.getSavedTokens(),

                reduction: metrics.getReductionPercentage(),

                latency: metrics.getLatency(),

                cacheHit: metrics.cacheHit,

                retries: metrics.retryCount,

                stageTimes: metrics.stageTimes

            }

        };

        saveResponse(query, response);

        debuggerService.save({
            ...debug,
            completedAt: new Date().toISOString()
        });

        console.log(`[${requestId}] Pipeline Finished`);

        return response;

    } catch (err) {

        console.error(
            `[${requestId}] Pipeline Failed`,
            err.message
        );

        debuggerService.save({
            ...debug,
            error: err.message,
            failedAt: new Date().toISOString()
        });

        return {

            success: false,

            stage: err.stage || "Pipeline",

            error: err.message

        };

    }

}

module.exports = runPipeline;