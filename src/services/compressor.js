function compressContext(context) {

    const maxCharacters = 120;

    if (context.length <= maxCharacters)
        return context;

    return context.substring(0, maxCharacters) + "...";

}

module.exports = compressContext;