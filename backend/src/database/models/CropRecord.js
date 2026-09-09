const { DataTypes } = require('sequelize');
const { sequelize } = require('../config');
const Farmer = require('./Farmer');
const Crop = require('./Crop');

const CropRecord = sequelize.define('CropRecord', {
  crop_record_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  farmer_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Farmer,
      key: 'farmer_id'
    }
  },
  crop_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Crop,
      key: 'crop_id'
    }
  },
  declared_quantity: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  unit: {
    type: DataTypes.ENUM('kg', 'quintal'),
    defaultValue: 'quintal'
  },
  land_area: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: false
  },
  land_unit: {
    type: DataTypes.ENUM('acre', 'hectare'),
    defaultValue: 'acre'
  },
  harvest_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('PENDING', 'BOOKED', 'PROCESSING', 'COMPLETED', 'CANCELLED'),
    defaultValue: 'PENDING'
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
  tableName: 'crop_records',
  timestamps: true,
  indexes: [
    { fields: ['farmer_id'] },
    { fields: ['status'] }
  ]
});

CropRecord.belongsTo(Farmer, { foreignKey: 'farmer_id', as: 'farmer' });
CropRecord.belongsTo(Crop, { foreignKey: 'crop_id', as: 'crop' });
Farmer.hasMany(CropRecord, { foreignKey: 'farmer_id', as: 'cropRecords' });

module.exports = CropRecord;
