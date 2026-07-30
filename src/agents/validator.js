function validator(result) {

    if (!result.answer) {
        throw new Error("Answer missing");
    }

    if (!result.confidence) {
        throw new Error("Confidence missing");
    }

    return result;
}

module.exports = validator;