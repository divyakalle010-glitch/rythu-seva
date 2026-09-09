const { DataTypes } = require('sequelize');
const { sequelize } = require('../config');
const Farmer = require('./Farmer');

const Notification = sequelize.define('Notification', {
  notification_id: {
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
  type: {
    type: DataTypes.ENUM(
      'REGISTRATION', 'CROP_ADDED', 'SLOT_BOOKED', 'BOOKING_CONFIRMATION',
      'SLOT_REMINDER', 'TOKEN_GENERATED', 'TOKEN_CALLED', 'QUEUE_MOVEMENT',
      'CENTRE_DELAY', 'CENTRE_CLOSURE', 'PROCUREMENT_COMPLETED',
      'QUALITY_ACCEPTED', 'QUALITY_REJECTED', 'PAYMENT_PROCESSING', 'PAYMENT_COMPLETED'
    ),
    allowNull: false
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('SENT', 'DELIVERED', 'READ'),
    defaultValue: 'SENT'
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
  tableName: 'notifications',
  timestamps: true,
  indexes: [
    { fields: ['farmer_id', 'timestamp'] }
  ]
});

Notification.belongsTo(Farmer, { foreignKey: 'farmer_id', as: 'farmer' });

module.exports = Notification;
