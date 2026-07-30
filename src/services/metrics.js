class Metrics {

    constructor() {
        this.startTime = Date.now();
        this.beforeTokens = 0;
        this.afterTokens = 0;
        this.cacheHit = false;
        this.retryCount = 0;
    }

    setBeforeTokens(tokens) {
        this.beforeTokens = tokens;
    }

    setAfterTokens(tokens) {
        this.afterTokens = tokens;
    }

    incrementRetry() {
        this.retryCount++;
    }

    setCacheHit(value) {
        this.cacheHit = value;
    }

    getLatency() {
        return `${Date.now() - this.startTime} ms`;
    }

    getSavedTokens() {
        return this.beforeTokens - this.afterTokens;
    }

    getReductionPercentage() {

        if (this.beforeTokens === 0)
            return "0%";

        return (
            (
                (this.beforeTokens - this.afterTokens)
                / this.beforeTokens
            ) * 100
        ).toFixed(2) + "%";
    }

}

module.exports = Metrics;