const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controller');
const { verifyToken } = require('../middleware/auth');
const { bookingRules, validate } = require('../middleware/validation');

router.post('/', verifyToken, bookingRules(), validate, bookingController.createBooking);
router.get('/', verifyToken, bookingController.getFarmerBookings);
router.get('/:id', verifyToken, bookingController.getBookingById);
router.put('/:id', verifyToken, bookingController.updateBooking);
router.delete('/:id', verifyToken, bookingController.cancelBooking);
router.get('/:id/token', verifyToken, bookingController.getToken);

module.exports = router;
