'use strict'
const { Op } = require('sequelize')

const Book = require('../models/book')

const crud = {}

// 前台的测试数据
crud.search = async (ctx, next) => {
  const { value } = ctx.request.body
  ctx.result = await Book.findAll({
    where: {
      [Op.or]: [{ book_name: [value] }, { ISBN: [value] }, { author: [value] }],
    },
  })
  return next()
}
module.exports = crud
