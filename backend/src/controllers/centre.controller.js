const ProcurementCentre = require('../database/models/ProcurementCentre');
const Slot = require('../database/models/Slot');
const CentreCrop = require('../database/models/CentreCrop');
const Booking = require('../database/models/Booking');

const getAllCentres = async (req, res) => {
  try {
    const { state_id, district_id, village_id, status } = req.query;
    const where = { status: status || 'OPEN' };

    if (state_id) where.state_id = state_id;
    if (district_id) where.district_id = district_id;
    if (village_id) where.village_id = village_id;

    const centres = await ProcurementCentre.findAll({
      where,
      order: [['centre_name', 'ASC']]
    });

    res.json({ success: true, data: centres });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getCentreById = async (req, res) => {
  try {
    const { id } = req.params;
    const centre = await ProcurementCentre.findByPk(id);
    if (!centre) return res.status(404).json({ success: false, error: 'Centre not found' });
    res.json({ success: true, data: centre });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getCentreCapacity = async (req, res) => {
  try {
    const { id } = req.params;
    const centre = await ProcurementCentre.findByPk(id);
    if (!centre) return res.status(404).json({ success: false, error: 'Centre not found' });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const slots = await Slot.findAll({
      where: { centre_id: id, date: today }
    });

    const totalBooked = slots.reduce((sum, slot) => sum + slot.booked_quantity, 0);

    res.json({
      success: true,
      data: {
        daily_capacity: centre.daily_capacity,
        booked_quantity: totalBooked,
        remaining_capacity: centre.daily_capacity - totalBooked,
        utilization_percentage: Math.round((totalBooked / centre.daily_capacity) * 100),
        active_counters: centre.active_counters
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getCentreSlots = async (req, res) => {
  try {
    const { id } = req.params;
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ success: false, error: 'Date is required' });
    }

    const slots = await Slot.findAll({
      where: { centre_id: id, date },
      order: [['start_time', 'ASC']]
    });

    res.json({ success: true, data: slots });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getCentreCrops = async (req, res) => {
  try {
    const { id } = req.params;
    const today = new Date();

    const crops = await CentreCrop.findAll({
      where: {
        centre_id: id,
        status: 'ACTIVE',
        start_date: { [require('sequelize').Op.lte]: today },
        end_date: { [require('sequelize').Op.gte]: today }
      },
      include: [{ association: 'crop', attributes: ['crop_name', 'crop_category'] }]
    });

    res.json({ success: true, data: crops });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const createCentre = async (req, res) => {
  try {
    const {
      centre_name,
      state_id,
      district_id,
      village_id,
      address,
      latitude,
      longitude,
      daily_capacity,
      active_counters
    } = req.body;

    const centre = await ProcurementCentre.create({
      centre_name,
      state_id,
      district_id,
      village_id,
      address,
      latitude,
      longitude,
      daily_capacity,
      active_counters,
      status: 'OPEN'
    });

    res.status(201).json({ success: true, data: centre });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const updateCentre = async (req, res) => {
  try {
    const { id } = req.params;
    const centre = await ProcurementCentre.findByPk(id);
    if (!centre) return res.status(404).json({ success: false, error: 'Centre not found' });
    await centre.update(req.body);
    res.json({ success: true, data: centre });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const updateCapacity = async (req, res) => {
  try {
    const { id } = req.params;
    const { daily_capacity, active_counters } = req.body;
    const centre = await ProcurementCentre.findByPk(id);
    if (!centre) return res.status(404).json({ success: false, error: 'Centre not found' });

    centre.daily_capacity = daily_capacity || centre.daily_capacity;
    centre.active_counters = active_counters || centre.active_counters;
    await centre.save();

    res.json({ success: true, data: centre });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const createSlots = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, slots: slotData } = req.body;

    const centre = await ProcurementCentre.findByPk(id);
    if (!centre) return res.status(404).json({ success: false, error: 'Centre not found' });

    const createdSlots = await Promise.all(
      slotData.map(slot =>
        Slot.create({
          centre_id: id,
          date,
          start_time: slot.start_time,
          end_time: slot.end_time,
          quantity_capacity: slot.quantity_capacity,
          farmer_capacity: slot.farmer_capacity,
          status: 'AVAILABLE'
        })
      )
    );

    res.status(201).json({ success: true, data: createdSlots });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  getAllCentres,
  getCentreById,
  getCentreCapacity,
  getCentreSlots,
  getCentreCrops,
  createCentre,
  updateCentre,
  updateCapacity,
  createSlots
};
