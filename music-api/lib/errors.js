const { STATUS } = require('../utils/constants');

/**
 * Centralized error handler for all API endpoints.
 * Ensures the API never crashes and always returns a consistent JSON structure.
 * 
 * @param {Object} res - The Express response object
 * @param {Error} error - The caught error object
 */
const handleError = (res, error) => {
  // Log error for serverless function monitoring (Vercel logs)
  console.error(`[API Error]: ${error.message}`, error.stack);

  const statusCode = error.status || error.response?.status || STATUS.INTERNAL_ERROR;
  const message = error.isAxiosError 
    ? 'Failed to fetch data from upstream provider.'
    : (error.message || 'An internal server error occurred.');

  return res.status(statusCode).json({
    success: false,
    error: message
  });
};

module.exports = {
  handleError
};
