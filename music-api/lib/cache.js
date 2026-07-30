const { DEFAULT_CACHE_TTL_MS } = require('../utils/constants');

/**
 * In-memory cache implementation for Serverless environments.
 * Note: Cache persists as long as the Vercel cold-start container is alive.
 */
class InMemoryCache {
  constructor() {
    this.store = new Map();
  }

  /**
   * Retrieves a value from the cache if it exists and hasn't expired.
   * @param {string} key 
   * @returns {any|null}
   */
  get(key) {
    if (!this.store.has(key)) return null;

    const { value, expiry } = this.store.get(key);
    
    if (Date.now() > expiry) {
      this.store.delete(key);
      return null;
    }

    return value;
  }

  /**
   * Sets a value in the cache with a Time-To-Live.
   * @param {string} key 
   * @param {any} value 
   * @param {number} ttlMs - Time to live in milliseconds
   */
  set(key, value, ttlMs = DEFAULT_CACHE_TTL_MS) {
    const expiry = Date.now() + ttlMs;
    this.store.set(key, { value, expiry });
  }

  /**
   * Purges expired entries to prevent memory leaks in warm containers.
   */
  clean() {
    const now = Date.now();
    for (const [key, data] of this.store.entries()) {
      if (now > data.expiry) {
        this.store.delete(key);
      }
    }
  }
}

// Export a singleton instance
module.exports = new InMemoryCache();
