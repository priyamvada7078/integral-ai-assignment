const cache = new Map();

function getCachedResponse(query) {
    return cache.get(query);
}

function saveResponse(query, response) {
    cache.set(query, response);
}

module.exports = {
    getCachedResponse,
    saveResponse
};