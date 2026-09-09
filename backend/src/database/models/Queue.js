const { DataTypes } = require('sequelize');
const { sequelize } = require('../config');
const Booking = require('./Booking');

const Queue = sequelize.define('Queue', {
  queue_id: {
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
  position: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  estimated_wait: {
    type: DataTypes.INTEGER,
    comment: 'in minutes'
  },
  current_status: {
    type: DataTypes.ENUM('WAITING', 'PROCESSING', 'COMPLETED'),
    defaultValue: 'WAITING'
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
  tableName: 'queue',
  timestamps: true,
  indexes: [
    { fields: ['booking_id'] },
    { fields: ['position'] }
  ]
});

Queue.belongsTo(Booking, { foreignKey: 'booking_id', as: 'booking' });

module.exports = Queue;
