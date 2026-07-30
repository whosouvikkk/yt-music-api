const { fetchSearch } = require('../lib/provider');
const { formatTrack } = require('../lib/formatter');
const { requireQueryParam } = require('../utils/validation');
const { handleError } = require('../lib/errors');
const cache = require('../lib/cache');

module.exports = async (req, res) => {
  try {
    const query = requireQueryParam(req, 'q');
    const cacheKey = `search:${query.toLowerCase()}`;

    // Check Cache
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return res.status(200).json({ success: true, results: cachedData });
    }

    // Fetch from Provider
    const rawData = await fetchSearch(query);
    
    // Format response
    const results = (rawData.results || []).map(formatTrack);

    // Save to Cache
    cache.set(cacheKey, results);

    return res.status(200).json({
      success: true,
      results
    });

  } catch (error) {
    handleError(res, error);
  }
};
