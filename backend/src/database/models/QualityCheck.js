const { DataTypes } = require('sequelize');
const { sequelize } = require('../config');
const Booking = require('./Booking');

const QualityCheck = sequelize.define('QualityCheck', {
  quality_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  booking_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Booking,
      key: 'booking_id'
    },
    unique: true
  },
  result: {
    type: DataTypes.ENUM('ACCEPTED', 'REJECTED'),
    allowNull: false
  },
  reason: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  checked_by: {
    type: DataTypes.STRING,
    allowNull: false
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
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
  tableName: 'quality_checks',
  timestamps: true
});

QualityCheck.belongsTo(Booking, { foreignKey: 'booking_id', as: 'booking' });

module.exports = QualityCheck;
