/**
 * Debug Service
 *
 * Stores recent pipeline executions for troubleshooting.
 * Keeps the latest 100 requests in memory.
 */

class DebuggerService {

    constructor() {

        this.history = [];

        this.maxHistory = 100;

    }

    /**
     * Save execution trace
     */
    save(trace) {

        this.history.unshift({

            ...trace,

            timestamp: new Date().toISOString()

        });

        if (this.history.length > this.maxHistory) {

            this.history.pop();

        }

    }

    /**
     * Get latest executions
     */
    getAll() {

        return this.history;

    }

    /**
     * Find execution by request ID
     */
    getByRequestId(requestId) {

        return this.history.find(

            item => item.requestId === requestId

        );

    }

    /**
     * Get total stored traces
     */
    count() {

        return this.history.length;

    }

    /**
     * Clear all traces
     */
    clear() {

        this.history = [];

    }

}

module.exports = new DebuggerService();