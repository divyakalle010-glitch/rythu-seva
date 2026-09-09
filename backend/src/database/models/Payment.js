const { DataTypes } = require('sequelize');
const { sequelize } = require('../config');
const Booking = require('./Booking');

const Payment = sequelize.define('Payment', {
  payment_id: {
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
  amount: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('PAYMENT_PROCESSING', 'PAYMENT_COMPLETED', 'PAYMENT_FAILED'),
    defaultValue: 'PAYMENT_PROCESSING'
  },
  reference: {
    type: DataTypes.STRING,
    allowNull: true
  },
  date: {
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
  tableName: 'payments',
  timestamps: true
});

Payment.belongsTo(Booking, { foreignKey: 'booking_id', as: 'booking' });

module.exports = Payment;
