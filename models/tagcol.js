'use strict'

const { Sequelize } = require('sequelize')
const db = require('../lib/db')

const Tagcol = db.define(
  'tagcol',
  {
    tag_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    tag_name: {
      type: Sequelize.STRING,
    },
    class_id: {
      type: Sequelize.INTEGER,
    },
  },
  { timestamps: false, freezeTableName: true },
)

module.exports = Tagcol
