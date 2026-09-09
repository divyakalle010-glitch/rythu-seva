const jwt = require('jsonwebtoken');
const { sequelize } = require('../database/config');
const Farmer = require('../database/models/Farmer');
const AdminUser = require('../database/models/AdminUser');
const State = require('../database/models/State');
const District = require('../database/models/District');
const Village = require('../database/models/Village');

const otpStore = {};

const sendOTP = async (req, res) => {
  try {
    const { mobile } = req.body;

    if (!mobile || mobile.length !== 10) {
      return res.status(400).json({
        success: false,
        error: 'Invalid mobile number'
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[mobile] = {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000
    };

    console.log(`📱 OTP for ${mobile}: ${otp}`);

    res.json({
      success: true,
      message: 'OTP sent successfully',
      mobile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { mobile, otp } = req.body;

    if (!otpStore[mobile]) {
      return res.status(400).json({
        success: false,
        error: 'OTP not found or expired'
      });
    }

    if (Date.now() > otpStore[mobile].expiresAt) {
      delete otpStore[mobile];
      return res.status(400).json({
        success: false,
        error: 'OTP expired'
      });
    }

    if (otpStore[mobile].otp !== otp) {
      return res.status(400).json({
        success: false,
        error: 'Invalid OTP'
      });
    }

    delete otpStore[mobile];

    const farmer = await Farmer.findOne({ where: { mobile } });

    res.json({
      success: true,
      message: 'OTP verified',
      isNewFarmer: !farmer,
      mobile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const registerFarmer = async (req, res) => {
  try {
    const { name, mobile, state_id, district_id, village_id, language } = req.body;

    const existingFarmer = await Farmer.findOne({ where: { mobile } });
    if (existingFarmer) {
      return res.status(400).json({
        success: false,
        error: 'Mobile number already registered'
      });
    }

    const farmer = await Farmer.create({
      name,
      mobile,
      state_id,
      district_id,
      village_id,
      language,
      status: 'ACTIVE'
    });

    const token = jwt.sign(
      { farmer_id: farmer.farmer_id, mobile, type: 'farmer' },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: process.env.JWT_EXPIRY || '7d' }
    );

    res.json({
      success: true,
      message: 'Farmer registered successfully',
      farmer: {
        farmer_id: farmer.farmer_id,
        name: farmer.name,
        mobile: farmer.mobile,
        language: farmer.language
      },
      token
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const farmerLogin = async (req, res) => {
  try {
    const { mobile } = req.body;

    const farmer = await Farmer.findOne({ where: { mobile, status: 'ACTIVE' } });

    if (!farmer) {
      return res.status(400).json({
        success: false,
        error: 'Farmer not found'
      });
    }

    const token = jwt.sign(
      { farmer_id: farmer.farmer_id, mobile, type: 'farmer' },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: process.env.JWT_EXPIRY || '7d' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      farmer: {
        farmer_id: farmer.farmer_id,
        name: farmer.name,
        mobile: farmer.mobile
      },
      token
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await AdminUser.findOne({ where: { username, status: 'ACTIVE' } });

    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    const token = jwt.sign(
      {
        admin_id: admin.admin_id,
        username: admin.username,
        role: admin.role,
        centre_id: admin.centre_id,
        type: 'admin'
      },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: process.env.JWT_EXPIRY || '7d' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      admin: {
        admin_id: admin.admin_id,
        name: admin.name,
        username: admin.username,
        role: admin.role
      },
      token
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const logout = (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
};

const verifyToken = (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'No token provided'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    res.json({
      success: true,
      user: decoded
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      error: 'Invalid token'
    });
  }
};

module.exports = {
  sendOTP,
  verifyOTP,
  registerFarmer,
  farmerLogin,
  adminLogin,
  logout,
  verifyToken
};
