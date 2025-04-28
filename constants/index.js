const { HTTP_STATUS } = require('./httpStatus');
const { ERROR_CODES } = require('./errorCodes');
const { MESSAGES } = require('./messages');

// Authentication and Authorization
exports.JWT_CONFIG = {
  EXPIRES_IN: '30d',
  ALGORITHM: 'HS256'
};

// Order Status Definitions
exports.ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  SHIPPING: 'shipping',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
};

// Available Product Colors
exports.COLORS = {
  WHITE: 'white',
  BLACK: 'black'
};

// Export all constants
exports.HTTP_STATUS = HTTP_STATUS;
exports.ERROR_CODES = ERROR_CODES;
exports.MESSAGES = MESSAGES;

