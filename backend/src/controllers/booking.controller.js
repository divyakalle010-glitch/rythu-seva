const { v4: uuidv4 } = require('uuid');
const Booking = require('../database/models/Booking');
const Crop = require('../database/models/Crop');
const ProcurementCentre = require('../database/models/ProcurementCentre');
const Slot = require('../database/models/Slot');
const Queue = require('../database/models/Queue');
const Payment = require('../database/models/Payment');
const Notification = require('../database/models/Notification');
const { generateToken } = require('../services/tokenGenerator');

const createBooking = async (req, res) => {
  try {
    const { farmer_id } = req.user;
    const {
      crop_id,
      centre_id,
      declared_quantity,
      land_area,
      land_unit,
      harvest_date,
      slot_date,
      slot_start_time,
      slot_end_time
    } = req.body;

    const centre = await ProcurementCentre.findByPk(centre_id);
    if (!centre) return res.status(404).json({ success: false, error: 'Centre not found' });

    const slot = await Slot.findOne({
      where: {
        centre_id,
        date: slot_date,
        start_time: slot_start_time
      }
    });

    if (!slot) return res.status(404).json({ success: false, error: 'Slot not found' });

    const remainingQuantity = slot.quantity_capacity - slot.booked_quantity;
    if (declared_quantity > remainingQuantity) {
      return res.status(400).json({
        success: false,
        error: 'Quantity exceeds available capacity'
      });
    }

    const booking = await Booking.create({
      farmer_id,
      crop_id,
      centre_id,
      declared_quantity,
      land_area,
      land_unit,
      harvest_date,
      slot_date,
      slot_start_time,
      slot_end_time,
      status: 'BOOKED'
    });

    const tokenNumber = generateToken(centre_id, booking.id);
    booking.token_number = tokenNumber;
    await booking.save();

    slot.booked_quantity += parseFloat(declared_quantity);
    slot.booked_count += 1;
    if (slot.booked_quantity >= slot.quantity_capacity) {
      slot.status = 'FULL';
    }
    await slot.save();

    await Payment.create({
      booking_id: booking.booking_id,
      status: 'PAYMENT_PROCESSING'
    });

    await Notification.create({
      farmer_id,
      type: 'SLOT_BOOKED',
      message: `Your slot at ${centre.centre_name} has been booked successfully. Token: ${tokenNumber}`
    });

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: {
        booking_id: booking.booking_id,
        token_number: tokenNumber,
        status: booking.status,
        centre_name: centre.centre_name
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getFarmerBookings = async (req, res) => {
  try {
    const { farmer_id } = req.user;
    const bookings = await Booking.findAll({
      where: { farmer_id },
      include: [
        { association: 'crop', attributes: ['crop_name'] },
        { association: 'centre', attributes: ['centre_name', 'address'] }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.json({ success: true, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByPk(id, {
      include: [
        { association: 'farmer', attributes: ['name', 'mobile'] },
        { association: 'crop', attributes: ['crop_name'] },
        { association: 'centre', attributes: ['centre_name', 'address'] }
      ]
    });
    if (!booking) return res.status(404).json({ success: false, error: 'Booking not found' });
    res.json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { farmer_id } = req.user;
    const booking = await Booking.findByPk(id);

    if (!booking) return res.status(404).json({ success: false, error: 'Booking not found' });
    if (booking.farmer_id !== farmer_id) {
      return res.status(403).json({ success: false, error: 'Unauthorized' });
    }

    if (!['BOOKED', 'ARRIVED'].includes(booking.status)) {
      return res.status(400).json({
        success: false,
        error: 'Booking cannot be modified in current status'
      });
    }

    await booking.update(req.body);
    res.json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { farmer_id } = req.user;
    const booking = await Booking.findByPk(id);

    if (!booking) return res.status(404).json({ success: false, error: 'Booking not found' });
    if (booking.farmer_id !== farmer_id) {
      return res.status(403).json({ success: false, error: 'Unauthorized' });
    }

    booking.status = 'CANCELLED';
    await booking.save();

    res.json({ success: true, message: 'Booking cancelled' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getToken = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByPk(id, {
      attributes: ['token_number', 'status', 'declared_quantity', 'slot_date', 'slot_start_time'],
      include: [
        { association: 'centre', attributes: ['centre_name'] },
        { association: 'crop', attributes: ['crop_name'] }
      ]
    });

    if (!booking) return res.status(404).json({ success: false, error: 'Booking not found' });

    res.json({
      success: true,
      data: {
        token_number: booking.token_number,
        crop_name: booking.crop.crop_name,
        quantity: booking.declared_quantity,
        centre_name: booking.centre.centre_name,
        date: booking.slot_date,
        time: booking.slot_start_time,
        status: booking.status
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  createBooking,
  getFarmerBookings,
  getBookingById,
  updateBooking,
  cancelBooking,
  getToken
};
