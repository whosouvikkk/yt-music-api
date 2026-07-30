/**
 * Converts milliseconds to a formatted mm:ss string.
 * @param {number} ms 
 * @returns {string}
 */
const msToDuration = (ms) => {
  if (!ms) return "0:00";
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

/**
 * Extracts the year from an ISO date string.
 * @param {string} dateString 
 * @returns {string}
 */
const extractYear = (dateString) => {
  if (!dateString) return "";
  return dateString.substring(0, 4);
};

/**
 * Generates high-quality image URLs from the base iTunes artwork URL.
 * @param {string} url - Base URL (usually ends in 100x100bb.jpg)
 * @returns {Array<Object>}
 */
const parseImages = (url) => {
  if (!url) return [];
  
  // iTunes standard sizes
  return [
    { quality: "120x120", url: url.replace('100x100bb.jpg', '120x120bb.jpg') },
    { quality: "500x500", url: url.replace('100x100bb.jpg', '500x500bb.jpg') },
    { quality: "1000x1000", url: url.replace('100x100bb.jpg', '1000x1000bb.jpg') }
  ];
};

module.exports = {
  msToDuration,
  extractYear,
  parseImages
};
