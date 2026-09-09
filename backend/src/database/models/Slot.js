const { DataTypes } = require('sequelize');
const { sequelize } = require('../config');
const ProcurementCentre = require('./ProcurementCentre');

const Slot = sequelize.define('Slot', {
  slot_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  centre_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: ProcurementCentre,
      key: 'centre_id'
    }
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  start_time: {
    type: DataTypes.TIME,
    allowNull: false
  },
  end_time: {
    type: DataTypes.TIME,
    allowNull: false
  },
  quantity_capacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'in quintals'
  },
  farmer_capacity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  booked_quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  booked_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  status: {
    type: DataTypes.ENUM('AVAILABLE', 'FULL', 'CLOSED'),
    defaultValue: 'AVAILABLE'
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'slots',
  timestamps: true,
  indexes: [
    { fields: ['centre_id', 'date'] },
    { fields: ['status'] }
  ]
});

Slot.belongsTo(ProcurementCentre, { foreignKey: 'centre_id', as: 'centre' });

module.exports = Slot;
