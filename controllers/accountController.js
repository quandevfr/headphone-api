const Account = require("../models/Account");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {
  HTTP_STATUS,
  ERROR_CODES,
  MESSAGES,
  JWT_CONFIG
} = require('../constants');

// Generate random JWT_SECRET if not exists
const generateJWTSecret = () => {
  return crypto.randomBytes(64).toString("hex");
};

// Ensure JWT_SECRET is always available
if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = generateJWTSecret();
  console.log("Generated new JWT_SECRET");
}

exports.getAccounts = async (req, res) => {
  try {
    console.log("[getAccounts]");
    const accounts = await Account.find().select("-password");
    res.json({
      success: true,
      data: accounts,
      count: accounts.length,
    });
  } catch (err) {
    console.error("Error fetching accounts:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching accounts",
      error: err.message,
    });
  }
};

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required",
      });
    }

    const existingUser = await Account.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Username already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAccount = new Account({
      username,
      password: hashedPassword,
    });

    await newAccount.save();

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: {
        username: newAccount.username,
        createdAt: newAccount.createdAt,
      },
    });
  } catch (err) {
    console.error(`[register], ${(err, null, 2)}`);
    res.status(500).json({
      success: false,
      message: "Error registering account",
      error: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        code: ERROR_CODES.MISSING_REQUIRED_FIELDS,
        message: MESSAGES.ERROR.REQUIRED_FIELDS
      });
    }

    const account = await Account.findOne({ username });
    if (!account) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        code: ERROR_CODES.INVALID_CREDENTIALS,
        message: MESSAGES.ERROR.INVALID_CREDENTIALS
      });
    }

    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        code: ERROR_CODES.INVALID_CREDENTIALS,
        message: MESSAGES.ERROR.INVALID_CREDENTIALS
      });
    }

    // Generate random session ID
    const sessionId = crypto.randomBytes(32).toString("hex");

    // Generate JWT token with more secure payload
    const token = jwt.sign(
      {
        id: account._id,
        username: account.username,
        sessionId: sessionId,
        iat: Math.floor(Date.now() / 1000),
      },
      process.env.JWT_SECRET,
      {
        expiresIn: JWT_CONFIG.EXPIRES_IN,
        algorithm: JWT_CONFIG.ALGORITHM,
      }
    );

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: MESSAGES.SUCCESS.LOGIN,
      data: {
        username: account.username,
        token: token,
        expiresIn: JWT_CONFIG.EXPIRES_IN
      }
    });
  } catch (err) {
    console.error(`[login] ${err}`);
    res.status(HTTP_STATUS.INTERNAL_SERVER).json({
      success: false,
      code: ERROR_CODES.DATABASE_ERROR,
      message: MESSAGES.ERROR.SERVER_ERROR,
      error: err.message
    });
  }
};

exports.logout = async (req, res) => {
  try {
    res.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (err) {
    console.error(`[logout], ${(err, null, 2)}`);
    res.status(500).json({
      success: false,
      message: "Error during logout",
      error: err.message,
    });
  }
};
