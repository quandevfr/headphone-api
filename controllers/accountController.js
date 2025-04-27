const Account = require("../models/Account");
const bcrypt = require("bcryptjs");

exports.getAccounts = async (req, res) => {
  try {
    console.log("[getAccounts]");
    const accounts = await Account.find({});
    console.log("Fetched accounts:", accounts); // For debugging
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

// Add some test data
exports.addTestAccounts = async (req, res) => {
  try {
    const testAccounts = [
      {
        username: "user1",
        email: "user1@example.com",
        password: "password123",
      },
      {
        username: "user2",
        email: "user2@example.com",
        password: "password456",
      },
    ];

    const result = await Account.insertMany(testAccounts);
    res.status(201).json({
      success: true,
      message: "Test accounts added successfully",
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Error adding test accounts",
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
      return res.status(400).json({
        success: false,
        message: "Username and password are required",
      });
    }

    const account = await Account.findOne({ username });
    if (!account) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    res.json({
      success: true,
      message: "Login successful",
      data: {
        username: account.username,
        createdAt: account.createdAt,
      },
    });
  } catch (err) {
    console.error(`[login], ${(err, null, 2)}`);
    res.status(500).json({
      success: false,
      message: "Error during login",
      error: err.message,
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
