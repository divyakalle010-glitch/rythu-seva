const Booking = require('../database/models/Booking');
const Queue = require('../database/models/Queue');
const ProcurementCentre = require('../database/models/ProcurementCentre');
const { calculateEstimatedWait } = require('../services/queueService');

const getQueueStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findByPk(bookingId, {
      include: [{ association: 'centre', attributes: ['active_counters', 'centre_name'] }]
    });

    if (!booking) return res.status(404).json({ success: false, error: 'Booking not found' });

    const queue = await Queue.findOne({ where: { booking_id: bookingId } });

    if (!queue) {
      return res.status(404).json({ success: false, error: 'Queue entry not found' });
    }

    const currentQueue = await Queue.findAll({
      where: { current_status: 'WAITING' },
      order: [['position', 'ASC']],
      limit: queue.position
    });

    const estimatedWait = await calculateEstimatedWait(
      queue.position,
      booking.centre.active_counters
    );

    res.json({
      success: true,
      data: {
        token_number: booking.token_number,
        position: queue.position,
        farmers_ahead: queue.position - 1,
        estimated_wait_minutes: estimatedWait,
        status: booking.status,
        centre_name: booking.centre.centre_name
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getCentreQueue = async (req, res) => {
  try {
    const { centreId } = req.params;

    const centre = await ProcurementCentre.findByPk(centreId);
    if (!centre) return res.status(404).json({ success: false, error: 'Centre not found' });

    const queue = await Queue.findAll({
      where: { current_status: 'WAITING' },
      include: [{
        association: 'booking',
        attributes: ['token_number', 'farmer_id']
      }],
      order: [['position', 'ASC']]
    });

    res.json({
      success: true,
      data: {
        centre_name: centre.centre_name,
        total_waiting: queue.length,
        queue: queue
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getNextToken = async (req, res) => {
  try {
    const { centreId } = req.params;

    const nextQueue = await Queue.findOne({
      where: { current_status: 'WAITING' },
      order: [['position', 'ASC']],
      include: [{ association: 'booking', attributes: ['token_number'] }]
    });

    if (!nextQueue) {
      return res.json({
        success: true,
        message: 'No queue entries',
        data: null
      });
    }

    res.json({
      success: true,
      data: {
        token_number: nextQueue.booking.token_number,
        position: nextQueue.position
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  getQueueStatus,
  getCentreQueue,
  getNextToken
};
