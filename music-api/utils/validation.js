const { STATUS } = require('./constants');

/**
 * Validates the presence of required query parameters.
 * @param {Object} req - The Express request object
 * @param {string} param - The parameter name to check
 * @returns {string} - The validated parameter value
 * @throws {Error} - If the parameter is missing
 */
const requireQueryParam = (req, param) => {
  const value = req.query[param];
  if (!value || value.trim() === '') {
    const error = new Error(`Missing required parameter: '${param}'`);
    error.status = STATUS.BAD_REQUEST;
    throw error;
  }
  return value.trim();
};

/**
 * Validates that an ID is numeric (useful for iTunes API).
 * @param {string} id - The ID to validate
 * @returns {number}
 */
const validateId = (id) => {
  const numId = parseInt(id, 10);
  if (isNaN(numId)) {
    const error = new Error(`Invalid ID format. Must be numeric.`);
    error.status = STATUS.BAD_REQUEST;
    throw error;
  }
  return numId;
};

module.exports = {
  requireQueryParam,
  validateId
};
