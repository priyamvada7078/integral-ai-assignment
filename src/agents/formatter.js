function formatter(result) {

    return {
        success: true,
        timestamp: new Date().toISOString(),
        data: result
    };

}

module.exports = formatter;