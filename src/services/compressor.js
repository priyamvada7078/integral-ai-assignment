
function compressContext(context, maxSentences = 5) {

    if (!context || typeof context !== "string") {
        return "";
    }

    const sentences = context
        .split(/(?<=[.!?])\s+/)
        .map(sentence => sentence.trim())
        .filter(Boolean);

    if (sentences.length <= maxSentences) {
        return context;
    }

    const unique = [...new Set(sentences)];

    const scored = unique.map(sentence => {

        let score = 0;

        const words = sentence.split(/\s+/);

        score += words.length;

        if (/\d/.test(sentence)) score += 5;

        if (
            sentence.includes("important") ||
            sentence.includes("key") ||
            sentence.includes("must") ||
            sentence.includes("critical")
        ) {
            score += 15;
        }

        if (sentence.length > 120)
            score += 5;

        return {
            sentence,
            score
        };

    });

    scored.sort((a, b) => b.score - a.score);

    return scored
        .slice(0, maxSentences)
        .map(item => item.sentence)
        .join(" ");

}

module.exports = compressContext;