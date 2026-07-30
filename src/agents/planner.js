function planner(query) {
    return {
        originalQuery: query,
        intent: "answer_question",
        needsRetrieval: true,
        responseType: "text"
    };
}

module.exports = planner;