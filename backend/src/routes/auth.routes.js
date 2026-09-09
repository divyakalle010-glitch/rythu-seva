const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { farmerRegistrationRules, adminLoginRules, validate } = require('../middleware/validation');

// Farmer Auth
router.post('/farmer/send-otp', authController.sendOTP);
router.post('/farmer/verify-otp', authController.verifyOTP);
router.post('/farmer/register', farmerRegistrationRules(), validate, authController.registerFarmer);
router.post('/farmer/login', authController.farmerLogin);

// Admin Auth
router.post('/admin/login', adminLoginRules(), validate, authController.adminLogin);
router.post('/logout', authController.logout);
router.get('/verify', authController.verifyToken);

module.exports = router;
