const { fetchById } = require('../lib/provider');
const { formatTrack } = require('../lib/formatter');
const { requireQueryParam, validateId } = require('../utils/validation');
const { handleError } = require('../lib/errors');
const { STATUS } = require('../utils/constants');
const cache = require('../lib/cache');

module.exports = async (req, res) => {
  try {
    const id = requireQueryParam(req, 'id');
    validateId(id);
    
    const cacheKey = `song:${id}`;

    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return res.status(200).json({ success: true, data: cachedData });
    }

    const rawData = await fetchById(id, 'song');
    
    if (!rawData.results || rawData.results.length === 0) {
      const err = new Error('Song not found');
      err.status = STATUS.NOT_FOUND;
      throw err;
    }

    const songData = formatTrack(rawData.results[0]);
    cache.set(cacheKey, songData);

    return res.status(200).json({
      success: true,
      data: songData
    });

  } catch (error) {
    handleError(res, error);
  }
};
