const knowledgeBase = require("../data/knowledgeBase");

function retriever(plan) {

    const query = plan.originalQuery.toLowerCase();

    let context = knowledgeBase.default;

    if (query.includes("ai"))
        context = knowledgeBase.ai;

    else if (query.includes("docker"))
        context = knowledgeBase.docker;

    else if (query.includes("node"))
        context = knowledgeBase.nodejs;

    else if (query.includes("mongo"))
        context = knowledgeBase.mongodb;

    else if (query.includes("github"))
        context = knowledgeBase.github;

    return {

        ...plan,

        context

    };

}

module.exports = retriever;