const State = require('../database/models/State');
const District = require('../database/models/District');
const Village = require('../database/models/Village');

const getAllStates = async (req, res) => {
  try {
    const states = await State.findAll({
      order: [['state_name', 'ASC']]
    });
    res.json({
      success: true,
      data: states
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getStateById = async (req, res) => {
  try {
    const { id } = req.params;
    const state = await State.findByPk(id, {
      include: [{ association: 'districts', attributes: ['district_id', 'district_name'] }]
    });
    if (!state) return res.status(404).json({ success: false, error: 'State not found' });
    res.json({ success: true, data: state });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const createState = async (req, res) => {
  try {
    const { state_name, state_code, type } = req.body;
    const state = await State.create({
      state_name,
      state_code,
      type
    });
    res.status(201).json({ success: true, data: state });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const updateState = async (req, res) => {
  try {
    const { id } = req.params;
    const state = await State.findByPk(id);
    if (!state) return res.status(404).json({ success: false, error: 'State not found' });
    await state.update(req.body);
    res.json({ success: true, data: state });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const getAllDistricts = async (req, res) => {
  try {
    const districts = await District.findAll({
      include: [{ association: 'state', attributes: ['state_name'] }],
      order: [['district_name', 'ASC']]
    });
    res.json({ success: true, data: districts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getDistrictById = async (req, res) => {
  try {
    const { id } = req.params;
    const district = await District.findByPk(id, {
      include: [
        { association: 'state', attributes: ['state_name'] },
        { association: 'villages', attributes: ['village_id', 'village_name'] }
      ]
    });
    if (!district) return res.status(404).json({ success: false, error: 'District not found' });
    res.json({ success: true, data: district });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getDistrictsByState = async (req, res) => {
  try {
    const { stateId } = req.params;
    const districts = await District.findAll({
      where: { state_id: stateId },
      attributes: ['district_id', 'district_name'],
      order: [['district_name', 'ASC']]
    });
    res.json({ success: true, data: districts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const createDistrict = async (req, res) => {
  try {
    const { state_id, district_name } = req.body;
    const district = await District.create({ state_id, district_name });
    res.status(201).json({ success: true, data: district });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const updateDistrict = async (req, res) => {
  try {
    const { id } = req.params;
    const district = await District.findByPk(id);
    if (!district) return res.status(404).json({ success: false, error: 'District not found' });
    await district.update(req.body);
    res.json({ success: true, data: district });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const getAllVillages = async (req, res) => {
  try {
    const villages = await Village.findAll({
      include: [{ association: 'district', attributes: ['district_name'] }],
      order: [['village_name', 'ASC']]
    });
    res.json({ success: true, data: villages });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getVillageById = async (req, res) => {
  try {
    const { id } = req.params;
    const village = await Village.findByPk(id, {
      include: [{ association: 'district', attributes: ['district_name'] }]
    });
    if (!village) return res.status(404).json({ success: false, error: 'Village not found' });
    res.json({ success: true, data: village });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getVillagesByDistrict = async (req, res) => {
  try {
    const { districtId } = req.params;
    const villages = await Village.findAll({
      where: { district_id: districtId },
      attributes: ['village_id', 'village_name', 'locality_type'],
      order: [['village_name', 'ASC']]
    });
    res.json({ success: true, data: villages });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const createVillage = async (req, res) => {
  try {
    const { district_id, village_name, locality_type } = req.body;
    const village = await Village.create({
      district_id,
      village_name,
      locality_type
    });
    res.status(201).json({ success: true, data: village });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const updateVillage = async (req, res) => {
  try {
    const { id } = req.params;
    const village = await Village.findByPk(id);
    if (!village) return res.status(404).json({ success: false, error: 'Village not found' });
    await village.update(req.body);
    res.json({ success: true, data: village });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = {
  getAllStates,
  getStateById,
  createState,
  updateState,
  getAllDistricts,
  getDistrictById,
  getDistrictsByState,
  createDistrict,
  updateDistrict,
  getAllVillages,
  getVillageById,
  getVillagesByDistrict,
  createVillage,
  updateVillage
};
