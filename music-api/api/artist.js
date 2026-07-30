const { fetchById } = require('../lib/provider');
const { formatArtist, formatAlbum } = require('../lib/formatter');
const { requireQueryParam, validateId } = require('../utils/validation');
const { handleError } = require('../lib/errors');
const { STATUS } = require('../utils/constants');
const cache = require('../lib/cache');

module.exports = async (req, res) => {
  try {
    const id = requireQueryParam(req, 'id');
    validateId(id);
    
    const cacheKey = `artist:${id}`;

    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return res.status(200).json({ success: true, data: cachedData });
    }

    // Fetching entity='album' for an artist ID returns the artist info AND top albums
    const rawData = await fetchById(id, 'album');
    
    if (!rawData.results || rawData.results.length === 0) {
      const err = new Error('Artist not found');
      err.status = STATUS.NOT_FOUND;
      throw err;
    }

    const artistRaw = rawData.results.find(item => item.wrapperType === 'artist');
    const albumsRaw = rawData.results.filter(item => item.wrapperType === 'collection');

    if (!artistRaw) {
        throw new Error('Invalid artist data received from provider');
    }

    const artistData = formatArtist(artistRaw);
    artistData.albums = albumsRaw.map(formatAlbum);

    cache.set(cacheKey, artistData);

    return res.status(200).json({
      success: true,
      data: artistData
    });

  } catch (error) {
    handleError(res, error);
  }
};
