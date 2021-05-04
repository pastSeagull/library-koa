const { Sequelize } = require('sequelize')
const db = require('../lib/db')

const Rerurn = db.define(
  'returns',
  {
    return_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    return_date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    sreturn_date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    reality_date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    unpaid: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    book_isbn: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: false, freezeTableName: true },
)

module.exports = Rerurn
