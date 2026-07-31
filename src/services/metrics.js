class Metrics {

    constructor() {

        this.startTime = performance.now();

        this.beforeTokens = 0;

        this.afterTokens = 0;

        this.cacheHit = false;

        this.retryCount = 0;

        this.stageTimes = {};

    }

    // -------------------------
    // Token Metrics
    // -------------------------

    setBeforeTokens(tokens) {

        this.beforeTokens = tokens;

    }

    setAfterTokens(tokens) {

        this.afterTokens = tokens;

    }

    getSavedTokens() {

        return this.beforeTokens - this.afterTokens;

    }

    getReductionPercentage() {

        if (this.beforeTokens === 0) return 0;

        return Number(

            (

                ((this.beforeTokens - this.afterTokens) /

                    this.beforeTokens) *

                100

            ).toFixed(2)

        );

    }

    // -------------------------
    // Cache Metrics
    // -------------------------

    setCacheHit(hit) {

        this.cacheHit = hit;

    }

    // -------------------------
    // Retry Metrics
    // -------------------------

    incrementRetry() {

        this.retryCount++;

    }

    // -------------------------
    // Stage Timing
    // -------------------------

    addStageTime(stage, time) {

        this.stageTimes[stage] = Number(time.toFixed(2));

    }

    // -------------------------
    // Pipeline Latency
    // -------------------------

    getLatency() {

        return Number(

            (performance.now() - this.startTime).toFixed(2)

        );

    }

    // -------------------------
    // JSON Summary
    // -------------------------

    getSummary() {

        return {

            beforeTokens: this.beforeTokens,

            afterTokens: this.afterTokens,

            savedTokens: this.getSavedTokens(),

            reduction: this.getReductionPercentage(),

            latency: this.getLatency(),

            cacheHit: this.cacheHit,

            retries: this.retryCount,

            stageTimes: this.stageTimes

        };

    }

}

module.exports = Metrics;