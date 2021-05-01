const { Sequelize } = require('sequelize')
const db = require('../lib/db')

const Borrow = db.define(
  'borrow',
  {
    borrow_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    user_certificate: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    book_isbn: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lend_date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    return_date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    penalty: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    is_renew: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: false, freezeTableName: true },
)

module.exports = Borrow
