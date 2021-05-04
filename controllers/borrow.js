'use strict'
const Borrow = require('../models/borrow')

const borrow = {}

// borrow
borrow.borrowAll = async (ctx, next) => {
  const params = ctx.query
  ctx.result = await Borrow.findAll(
    params.user_certificate || params.book_isbn
      ? {
          attributes: ['borrow_id', 'user_certificate', 'book_isbn', 'lend_date', 'return_date'],
          where: {
            //
            [Op.or]: [{ user_certificate: [params.user_certificate] }, { book_isbn: [params.book_isbn] }],
          },
        }
      : {
          // limit: parseInt(params.pageSize),
          attributes: ['borrow_id', 'user_certificate', 'book_isbn', 'lend_date', 'return_date'],
        },
  )
  return next()
}
borrow.borrowAdd = async (ctx, next) => {
  const borrowInfo = ctx.request.body
  ctx.result = await Borrow.create({
    borrow_id: 0,
    user_certificate: parseInt(borrowInfo.user_certificate),
    book_isbn: borrowInfo.book_isbn,
    lend_date: borrowInfo.dateTimeRange[0],
    return_date: borrowInfo.dateTimeRange[1],
    penalty: 1,
    is_renew: 1,
  })
  return next()
}
borrow.borrowUpdate = async (ctx, next) => {
  const borrowInfo = ctx.request.body
  console.log(borrowInfo)
  ctx.result = await Borrow.update(
    {
      borrow_id: borrowInfo.borrow_id,
      user_certificate: parseInt(borrowInfo.user_certificate),
      book_isbn: borrowInfo.book_isbn,
      lend_date: borrowInfo.dateTimeRange[0],
      return_date: borrowInfo.dateTimeRange[1],
    },
    {
      where: {
        borrow_id: [borrowInfo.borrow_id],
      },
    },
  )
  return next()
}
// return add success and del borrow
borrow.borrowDel = async (ctx, next) => {
  const id = ctx.query
  ctx.result = await Borrow.destroy({
    where: {
      borrow_id: [id.id],
    },
  })
  return next()
}
// 续借
borrow.borrowRenew = async (ctx, next) => {
  const id = ctx.query
  console.log(id)
  const original = await Borrow.findAll({
    raw: true,
    attributes: ['return_date'],
    where: {
      borrow_id: [id.borrow_id],
    },
  })
  ctx.result = await Borrow.update(
    {
      // return_date + 10 day
      return_date: new Date(new Date(original[0].return_date).getTime() + 24 * 60 * 60 * 1000 * 10),
      // and is_renew change  0 -> 1 if is_renew is 1 not renew once
      is_renew: 1,
    },
    {
      where: {
        borrow_id: [id.borrow_id],
      },
    },
  )
  return next()
}
// 前台个人中心查看借阅图书
borrow.getBorrow = async (ctx, next) => {
  const user_id = ctx.request.body
  ctx.result = await Borrow.findall({
    where: {
      user_certificate: [user_id.id],
    },
  })
  return next()
}

module.exports = borrow
