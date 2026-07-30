const { fetchById } = require('../lib/provider');
const { formatAlbum, formatTrack } = require('../lib/formatter');
const { requireQueryParam, validateId } = require('../utils/validation');
const { handleError } = require('../lib/errors');
const { STATUS } = require('../utils/constants');
const cache = require('../lib/cache');

module.exports = async (req, res) => {
  try {
    const id = requireQueryParam(req, 'id');
    validateId(id);
    
    const cacheKey = `album:${id}`;

    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return res.status(200).json({ success: true, data: cachedData });
    }

    // Fetching entity='song' for an album ID returns the album info AND all tracks
    const rawData = await fetchById(id, 'song');
    
    if (!rawData.results || rawData.results.length === 0) {
      const err = new Error('Album not found');
      err.status = STATUS.NOT_FOUND;
      throw err;
    }

    // iTunes returns the album collection object first, followed by the track objects
    const albumRaw = rawData.results.find(item => item.wrapperType === 'collection');
    const tracksRaw = rawData.results.filter(item => item.wrapperType === 'track');

    if (!albumRaw) {
        throw new Error('Invalid album data received from provider');
    }

    const albumData = formatAlbum(albumRaw);
    albumData.tracks = tracksRaw.map(formatTrack);

    cache.set(cacheKey, albumData);

    return res.status(200).json({
      success: true,
      data: albumData
    });

  } catch (error) {
    handleError(res, error);
  }
};
