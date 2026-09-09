const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const { sequelize } = require('../config');
const ProcurementCentre = require('./ProcurementCentre');

const AdminUser = sequelize.define('AdminUser', {
  admin_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('SUPER_ADMIN', 'CENTRE_ADMIN'),
    defaultValue: 'CENTRE_ADMIN'
  },
  centre_id: {
    type: DataTypes.UUID,
    references: {
      model: ProcurementCentre,
      key: 'centre_id'
    },
    allowNull: true,
    comment: 'NULL for SUPER_ADMIN, required for CENTRE_ADMIN'
  },
  status: {
    type: DataTypes.ENUM('ACTIVE', 'INACTIVE'),
    defaultValue: 'ACTIVE'
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
  tableName: 'admin_users',
  timestamps: true,
  hooks: {
    beforeCreate: async (admin) => {
      if (admin.password_hash) {
        const salt = await bcrypt.genSalt(10);
        admin.password_hash = await bcrypt.hash(admin.password_hash, salt);
      }
    },
    beforeUpdate: async (admin) => {
      if (admin.changed('password_hash')) {
        const salt = await bcrypt.genSalt(10);
        admin.password_hash = await bcrypt.hash(admin.password_hash, salt);
      }
    }
  }
});

AdminUser.prototype.comparePassword = async function(plainPassword) {
  return await bcrypt.compare(plainPassword, this.password_hash);
};

AdminUser.belongsTo(ProcurementCentre, { foreignKey: 'centre_id', as: 'centre' });

module.exports = AdminUser;
