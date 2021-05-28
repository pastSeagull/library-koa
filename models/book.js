'use strict'

const { Sequelize } = require('sequelize')
const db = require('../lib/db')

const Book = db.define(
  'book',
  {
    book_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    book_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    author: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    book_intro: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    classify: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    ISBN: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    publisher: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    state: {
      type: Sequelize.CHAR,
      allowNull: false,
    },
    location: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { timestamps: false },
)

module.exports = Book
