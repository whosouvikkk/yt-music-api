const { msToDuration, extractYear, parseImages } = require('./parser');

/**
 * Formats a raw track object into the required standardized schema.
 * @param {Object} raw 
 * @returns {Object}
 */
const formatTrack = (raw) => {
  return {
    id: raw.trackId ? raw.trackId.toString() : "",
    title: raw.trackName || "",
    artist: raw.artistName || "",
    album: raw.collectionName || "",
    duration: msToDuration(raw.trackTimeMillis),
    thumbnail: raw.artworkUrl100 || "",
    image: parseImages(raw.artworkUrl100),
    year: extractYear(raw.releaseDate),
    genre: raw.primaryGenreName || "",
    explicit: raw.trackExplicitness === 'explicit',
    lyricsAvailable: false // iTunes API doesn't provide lyrics directly
  };
};

/**
 * Formats a raw album object into the standardized schema.
 * @param {Object} raw 
 * @returns {Object}
 */
const formatAlbum = (raw) => {
  return {
    id: raw.collectionId ? raw.collectionId.toString() : "",
    title: raw.collectionName || "",
    artist: raw.artistName || "",
    trackCount: raw.trackCount || 0,
    thumbnail: raw.artworkUrl100 || "",
    image: parseImages(raw.artworkUrl100),
    year: extractYear(raw.releaseDate),
    genre: raw.primaryGenreName || ""
  };
};

/**
 * Formats a raw artist object.
 * @param {Object} raw 
 * @returns {Object}
 */
const formatArtist = (raw) => {
  return {
    id: raw.artistId ? raw.artistId.toString() : "",
    name: raw.artistName || "",
    genre: raw.primaryGenreName || "",
    artistLink: raw.artistLinkUrl || ""
  };
};

module.exports = {
  formatTrack,
  formatAlbum,
  formatArtist
};
