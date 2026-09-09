const Booking = require('../database/models/Booking');
const Weighing = require('../database/models/Weighing');
const QualityCheck = require('../database/models/QualityCheck');
const Queue = require('../database/models/Queue');
const Farmer = require('../database/models/Farmer');
const Notification = require('../database/models/Notification');
const AuditLog = require('../database/models/AuditLog');

const markArrived = async (req, res) => {
  try {
    const { booking_id } = req.body;
    const { admin_id } = req.user;

    const booking = await Booking.findByPk(booking_id);
    if (!booking) return res.status(404).json({ success: false, error: 'Booking not found' });

    booking.status = 'ARRIVED';
    await booking.save();

    await AuditLog.create({
      user_id: admin_id,
      action: 'MARK_ARRIVED',
      entity: 'Booking',
      entity_id: booking_id
    });

    res.json({ success: true, message: 'Marked as arrived', data: booking });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const callNextToken = async (req, res) => {
  try {
    const { centre_id } = req.body;
    const { admin_id } = req.user;

    const booking = await Booking.findOne({
      where: { centre_id, status: 'ARRIVED' },
      order: [['createdAt', 'ASC']]
    });

    if (!booking) {
      return res.json({ success: true, message: 'No bookings to call' });
    }

    booking.status = 'TOKEN_CALLED';
    await booking.save();

    await Notification.create({
      farmer_id: booking.farmer_id,
      type: 'TOKEN_CALLED',
      message: `Your token ${booking.token_number} has been called`
    });

    await AuditLog.create({
      user_id: admin_id,
      action: 'CALL_TOKEN',
      entity: 'Booking',
      entity_id: booking.booking_id
    });

    res.json({
      success: true,
      message: 'Token called',
      data: { token_number: booking.token_number }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const recordWeighing = async (req, res) => {
  try {
    const { booking_id, actual_quantity, verified_by } = req.body;
    const { admin_id } = req.user;

    const booking = await Booking.findByPk(booking_id);
    if (!booking) return res.status(404).json({ success: false, error: 'Booking not found' });

    const weighing = await Weighing.create({
      booking_id,
      declared_quantity: booking.declared_quantity,
      actual_quantity,
      unit: 'quintal',
      verified_by
    });

    booking.status = 'WEIGHING';
    await booking.save();

    await AuditLog.create({
      user_id: admin_id,
      action: 'RECORD_WEIGHING',
      entity: 'Booking',
      entity_id: booking_id,
      new_values: { actual_quantity }
    });

    res.json({ success: true, message: 'Weighing recorded', data: weighing });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const performQualityCheck = async (req, res) => {
  try {
    const { booking_id, result, reason, checked_by } = req.body;
    const { admin_id } = req.user;

    const qualityCheck = await QualityCheck.create({
      booking_id,
      result,
      reason,
      checked_by
    });

    const booking = await Booking.findByPk(booking_id);
    booking.status = result === 'ACCEPTED' ? 'ACCEPTED' : 'REJECTED';
    await booking.save();

    const notificationType = result === 'ACCEPTED' ? 'QUALITY_ACCEPTED' : 'QUALITY_REJECTED';
    await Notification.create({
      farmer_id: booking.farmer_id,
      type: notificationType,
      message: `Your procurement has been ${result}. ${reason ? 'Reason: ' + reason : ''}`
    });

    await AuditLog.create({
      user_id: admin_id,
      action: 'QUALITY_CHECK',
      entity: 'Booking',
      entity_id: booking_id,
      new_values: { result, reason }
    });

    res.json({ success: true, message: 'Quality check completed', data: qualityCheck });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const completeProcurement = async (req, res) => {
  try {
    const { booking_id } = req.body;
    const { admin_id } = req.user;

    const booking = await Booking.findByPk(booking_id);
    if (!booking) return res.status(404).json({ success: false, error: 'Booking not found' });

    booking.status = 'PROCUREMENT_COMPLETED';
    await booking.save();

    await Notification.create({
      farmer_id: booking.farmer_id,
      type: 'PROCUREMENT_COMPLETED',
      message: 'Your procurement has been completed successfully'
    });

    await AuditLog.create({
      user_id: admin_id,
      action: 'COMPLETE_PROCUREMENT',
      entity: 'Booking',
      entity_id: booking_id
    });

    res.json({ success: true, message: 'Procurement completed', data: booking });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getFarmers = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    const farmers = await Farmer.findAndCountAll({
      offset,
      limit: parseInt(limit),
      order: [['createdAt', 'DESC']]
    });

    res.json({ success: true, data: farmers });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getFarmerDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const farmer = await Farmer.findByPk(id);
    if (!farmer) return res.status(404).json({ success: false, error: 'Farmer not found' });
    res.json({ success: true, data: farmer });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getFarmerBookings = async (req, res) => {
  try {
    const { id } = req.params;
    const bookings = await Booking.findAll({ where: { farmer_id: id } });
    res.json({ success: true, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getDailyBookings = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const bookings = await Booking.findAll({
      where: { createdAt: { [require('sequelize').Op.gte]: today } }
    });

    res.json({
      success: true,
      data: {
        date: today,
        total_bookings: bookings.length,
        by_status: {
          booked: bookings.filter(b => b.status === 'BOOKED').length,
          arrived: bookings.filter(b => b.status === 'ARRIVED').length,
          completed: bookings.filter(b => b.status === 'PROCUREMENT_COMPLETED').length,
          rejected: bookings.filter(b => b.status === 'REJECTED').length
        }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getCapacityReport = async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Capacity report endpoint',
      data: {}
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getQueueLength = async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Queue length report endpoint',
      data: {}
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getProcurementStatus = async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Procurement status report endpoint',
      data: {}
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getAuditLogs = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    const logs = await AuditLog.findAndCountAll({
      offset,
      limit: parseInt(limit),
      order: [['timestamp', 'DESC']]
    });

    res.json({ success: true, data: logs });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  markArrived,
  callNextToken,
  recordWeighing,
  performQualityCheck,
  completeProcurement,
  getFarmers,
  getFarmerDetails,
  getFarmerBookings,
  getDailyBookings,
  getCapacityReport,
  getQueueLength,
  getProcurementStatus,
  getAuditLogs
};
