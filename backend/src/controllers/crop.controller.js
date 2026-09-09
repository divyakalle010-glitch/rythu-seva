const Crop = require('../database/models/Crop');
const CropRecord = require('../database/models/CropRecord');
const CentreCrop = require('../database/models/CentreCrop');
const ProcurementCentre = require('../database/models/ProcurementCentre');

const addCropRecord = async (req, res) => {
  try {
    const { farmer_id } = req.user;
    const { crop_id, declared_quantity, unit, land_area, land_unit, harvest_date } = req.body;

    const cropRecord = await CropRecord.create({
      farmer_id,
      crop_id,
      declared_quantity,
      unit,
      land_area,
      land_unit,
      harvest_date,
      status: 'PENDING'
    });

    res.status(201).json({ success: true, data: cropRecord });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getFarmerCrops = async (req, res) => {
  try {
    const { farmer_id } = req.user;
    const crops = await CropRecord.findAll({
      where: { farmer_id },
      include: [{ association: 'crop', attributes: ['crop_name'] }],
      order: [['createdAt', 'DESC']]
    });
    res.json({ success: true, data: crops });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getCropRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const cropRecord = await CropRecord.findByPk(id, {
      include: [{ association: 'crop', attributes: ['crop_name'] }]
    });
    if (!cropRecord) return res.status(404).json({ success: false, error: 'Crop record not found' });
    res.json({ success: true, data: cropRecord });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const updateCropRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const cropRecord = await CropRecord.findByPk(id);
    if (!cropRecord) return res.status(404).json({ success: false, error: 'Crop record not found' });
    await cropRecord.update(req.body);
    res.json({ success: true, data: cropRecord });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getAllCrops = async (req, res) => {
  try {
    const crops = await Crop.findAll({
      where: { status: 'ACTIVE' },
      order: [['crop_name', 'ASC']]
    });
    res.json({ success: true, data: crops });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const createCropMaster = async (req, res) => {
  try {
    const { crop_name, crop_category, unit } = req.body;
    const crop = await Crop.create({
      crop_name,
      crop_category,
      unit,
      status: 'ACTIVE'
    });
    res.status(201).json({ success: true, data: crop });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const configureCentreCrop = async (req, res) => {
  try {
    const { centre_id, crop_id, season, scheme, start_date, end_date } = req.body;
    const centreCrop = await CentreCrop.create({
      centre_id,
      crop_id,
      season,
      scheme,
      start_date,
      end_date,
      status: 'ACTIVE'
    });
    res.status(201).json({ success: true, data: centreCrop });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getCentreAvailableCrops = async (req, res) => {
  try {
    const { centreId } = req.params;
    const today = new Date();

    const crops = await CentreCrop.findAll({
      where: {
        centre_id: centreId,
        status: 'ACTIVE',
        start_date: { [require('sequelize').Op.lte]: today },
        end_date: { [require('sequelize').Op.gte]: today }
      },
      include: [{ association: 'crop', attributes: ['crop_name', 'crop_category'] }],
      order: [['crop_id', 'ASC']]
    });

    res.json({ success: true, data: crops });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  addCropRecord,
  getFarmerCrops,
  getCropRecord,
  updateCropRecord,
  getAllCrops,
  createCropMaster,
  configureCentreCrop,
  getCentreAvailableCrops
};
