/**
 * Application Constants
 */
module.exports = {
  // Provider URL
  PROVIDER_BASE_URL: 'https://itunes.apple.com',
  
  // Cache Settings
  DEFAULT_CACHE_TTL_MS: 1000 * 60 * 60, // 1 hour in milliseconds
  
  // HTTP Status Codes
  STATUS: {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500
  },
  
  // Default limits
  SEARCH_LIMIT: 20
};
