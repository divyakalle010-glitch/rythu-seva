const express = require('express');
const router = express.Router();
const cropController = require('../controllers/crop.controller');
const { verifyToken, verifyAdmin } = require('../middleware/auth');

// Farmer routes
router.post('/', verifyToken, cropController.addCropRecord);
router.get('/farmer/records', verifyToken, cropController.getFarmerCrops);
router.get('/:id', verifyToken, cropController.getCropRecord);
router.put('/:id', verifyToken, cropController.updateCropRecord);

// Admin routes
router.get('/admin/all', verifyAdmin, cropController.getAllCrops);
router.post('/admin/master', verifyAdmin, cropController.createCropMaster);
router.post('/admin/centre-crop', verifyAdmin, cropController.configureCentreCrop);
router.get('/centre/:centreId/available', cropController.getCentreAvailableCrops);

module.exports = router;
