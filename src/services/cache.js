const cache = new Map();

function getCached(key) {
    return cache.get(key);
}

function setCache(key, value) {
    cache.set(key, value);
}

module.exports = {
    getCached,
    setCache
};