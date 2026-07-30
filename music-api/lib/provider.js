const axios = require('axios');
const { PROVIDER_BASE_URL, SEARCH_LIMIT } = require('../utils/constants');

/**
 * HTTP client configured for the upstream metadata provider (iTunes).
 */
const client = axios.create({
  baseURL: PROVIDER_BASE_URL,
  timeout: 8000
});

/**
 * Fetches search results based on a query.
 * @param {string} query 
 */
const fetchSearch = async (query) => {
  const response = await client.get('/search', {
    params: {
      term: query,
      entity: 'song',
      limit: SEARCH_LIMIT
    }
  });
  return response.data;
};

/**
 * Fetches a single entity (song, album, or artist) by its ID.
 * @param {string} id 
 * @param {string} entityType - 'song', 'album', or 'musicArtist'
 */
const fetchById = async (id, entityType) => {
  const response = await client.get('/lookup', {
    params: {
      id: id,
      entity: entityType
    }
  });
  return response.data;
};

module.exports = {
  fetchSearch,
  fetchById
};
