const { HTTP_STATUS } = require('../constants');

/**
 * Send success response
 * @param {Object} res - Express response object
 * @param {*} data - Response data
 * @param {string} message - Success message
 * @param {number} status - HTTP status code
 */
exports.sendSuccess = (res, data = null, message = 'Success', status = HTTP_STATUS.OK) => {
  return res.status(status).json({
    success: true,
    message,
    data
  });
};

/**
 * Send error response
 * @param {Object} res - Express response object
 * @param {string} code - Error code
 * @param {string} message - Error message
 * @param {number} status - HTTP status code
 * @param {*} error - Error details
 */
exports.sendError = (res, code, message, status = HTTP_STATUS.BAD_REQUEST, error = null) => {
  const response = {
    success: false,
    code,
    message
  };

  if (error) {
    response.error = error;
  }

  return res.status(status).json(response);
};
