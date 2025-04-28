exports.MESSAGES = {
  // Success Messages
  SUCCESS: {
    LOGIN: 'Login successful',
    LOGOUT: 'Logged out successfully',
    REGISTER: 'Account created successfully',
    ORDER_CREATED: 'Order created successfully',
    ORDER_UPDATED: 'Order status updated successfully',
    ORDER_DELETED: 'Order deleted successfully',
  },

  // Error Messages
  ERROR: {
    // Auth Errors
    INVALID_CREDENTIALS: 'Invalid username or password',
    TOKEN_REQUIRED: 'No token provided',
    TOKEN_INVALID: 'Invalid token',
    USER_EXISTS: 'Username already exists',
    
    // Validation Errors
    REQUIRED_FIELDS: 'Missing required fields',
    INVALID_STATUS: 'Invalid status',
    INVALID_COLOR: 'Invalid color. Must be white or black',
    INVALID_QUANTITY: 'Quantity must be at least 1',
    
    // Order Errors
    ORDER_NOT_FOUND: 'Order not found',
    EMPTY_ORDER: 'Order must contain at least one item',
    INVALID_ORDER_ITEMS: 'Each order item must have color and quantity',
    
    // Generic Errors
    SERVER_ERROR: 'Internal server error',
    DATABASE_ERROR: 'Database operation failed',
  },
};