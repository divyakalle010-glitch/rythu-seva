const express = require('express');
const router = express.Router();
const centreController = require('../controllers/centre.controller');
const { verifyAdmin } = require('../middleware/auth');

router.get('/', centreController.getAllCentres);
router.get('/:id', centreController.getCentreById);
router.get('/:id/capacity', centreController.getCentreCapacity);
router.get('/:id/slots', centreController.getCentreSlots);
router.get('/:id/crops', centreController.getCentreCrops);

// Admin routes
router.post('/', verifyAdmin, centreController.createCentre);
router.put('/:id', verifyAdmin, centreController.updateCentre);
router.put('/:id/capacity', verifyAdmin, centreController.updateCapacity);
router.post('/:id/slots', verifyAdmin, centreController.createSlots);

module.exports = router;
