const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { verifyAdmin, verifySuperAdmin } = require('../middleware/auth');

// Queue Management
router.post('/queue/mark-arrived', verifyAdmin, adminController.markArrived);
router.post('/queue/call-next', verifyAdmin, adminController.callNextToken);

// Weighing
router.post('/weighing', verifyAdmin, adminController.recordWeighing);

// Quality Check
router.post('/quality-check', verifyAdmin, adminController.performQualityCheck);

// Procurement
router.post('/procurement/complete', verifyAdmin, adminController.completeProcurement);

// Farmer Management
router.get('/farmers', verifyAdmin, adminController.getFarmers);
router.get('/farmers/:id', verifyAdmin, adminController.getFarmerDetails);
router.get('/farmers/:id/bookings', verifyAdmin, adminController.getFarmerBookings);

// Reports
router.get('/reports/daily-bookings', verifyAdmin, adminController.getDailyBookings);
router.get('/reports/capacity', verifyAdmin, adminController.getCapacityReport);
router.get('/reports/queue-length', verifyAdmin, adminController.getQueueLength);
router.get('/reports/procurement-status', verifyAdmin, adminController.getProcurementStatus);

// Audit Logs
router.get('/audit-logs', verifySuperAdmin, adminController.getAuditLogs);

module.exports = router;
