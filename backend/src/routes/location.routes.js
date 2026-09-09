const express = require('express');
const router = express.Router();
const locationController = require('../controllers/location.controller');

// States
router.get('/states', locationController.getAllStates);
router.get('/states/:id', locationController.getStateById);
router.post('/states', locationController.createState);
router.put('/states/:id', locationController.updateState);

// Districts
router.get('/districts', locationController.getAllDistricts);
router.get('/districts/:id', locationController.getDistrictById);
router.get('/states/:stateId/districts', locationController.getDistrictsByState);
router.post('/districts', locationController.createDistrict);
router.put('/districts/:id', locationController.updateDistrict);

// Villages
router.get('/villages', locationController.getAllVillages);
router.get('/villages/:id', locationController.getVillageById);
router.get('/districts/:districtId/villages', locationController.getVillagesByDistrict);
router.post('/villages', locationController.createVillage);
router.put('/villages/:id', locationController.updateVillage);

module.exports = router;
