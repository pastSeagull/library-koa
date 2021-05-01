'use strict'

const { Sequelize } = require('sequelize')
const db = require('../lib/db')

const User = db.define(
  'user',
  {
    user_certificate: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    user_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    user_sex: {
      type: Sequelize.CHAR,
      allowNull: false,
    },
    lend: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    is_loss: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    borrowed: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    unpaid: {
      type: Sequelize.DECIMAL,
      allowNull: false,
    },
  },
  { timestamps: false, freezeTableName: true },
)

module.exports = User
