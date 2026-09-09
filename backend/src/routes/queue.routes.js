const express = require('express');
const router = express.Router();
const queueController = require('../controllers/queue.controller');
const { verifyToken } = require('../middleware/auth');

router.get('/:bookingId', verifyToken, queueController.getQueueStatus);
router.get('/centre/:centreId/current', queueController.getCentreQueue);
router.post('/centre/:centreId/next', queueController.getNextToken);

module.exports = router;
