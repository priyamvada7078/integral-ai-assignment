function retriever(plan) {

    const largeContext = `
Artificial Intelligence (AI) enables machines to perform tasks that normally require human intelligence.

Large Language Models are trained on huge datasets.

Generative AI can generate code.

Generative AI can summarize documents.

Generative AI powers chatbots.

Prompt engineering improves responses.

Vector databases improve retrieval.

Token optimization reduces latency.

Caching reduces API costs.

Retrieval-Augmented Generation improves accuracy.

`.repeat(40);

    return {

        ...plan,

        context: largeContext

    };

}

module.exports = retriever;