function reasoner(data) {
    return {
        answer: `Based on the retrieved context, here's the answer to: "${data.originalQuery}"`,
        confidence: 0.96,
        sources: ["Local Knowledge Base"]
    };
}

module.exports = reasoner;