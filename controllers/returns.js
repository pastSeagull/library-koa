'use strict'
const Returns = require('../models/returns')

const returns = {}

// return
returns.returnAdd = async (ctx, next) => {
  const info = ctx.request.body
  // lend day
  const lendDay = parseInt(
    (new Date(info.params.return_date).getTime() - new Date(info.params.lend_date).getTime()) / (1000 * 60 * 60 * 24),
  )
  // actual day
  const actualDay = parseInt(
    (new Date(info.actual).getTime() - new Date(info.params.lend_date).getTime()) / (1000 * 60 * 60 * 24),
  )
  const penalty = 2
  let unpaid = 0
  if (lendDay < actualDay) {
    unpaid = (actualDay - lendDay) * penalty
  }
  ctx.result = await Returns.create({
    return_id: 0,
    return_date: info.params.lend_date, // 借阅开始
    sreturn_date: info.params.return_date, // 理应归还
    reality_date: info.actual, // 实际
    unpaid: unpaid,
    book_isbn: info.params.book_isbn,
    user_id: info.params.user_certificate,
  })
  return next()
}

returns.returnAll = async (ctx, next) => {
  ctx.result = await Returns.findAll({})
  return next()
}

module.exports = returns
