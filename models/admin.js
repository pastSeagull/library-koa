'use strict'

const { Sequelize } = require('sequelize')
const db = require('../lib/db')

const Admin = db.define(
  'admin',
  {
    admin_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    admin_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    admin_password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    admin_sex: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    admin_email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    admin_telephone: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    admin_mark: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    purview: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { timestamps: false, freezeTableName: true },
)

module.exports = Admin
