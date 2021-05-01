'use strict'
const { Op } = require('sequelize')

/* const User = require('../models/user') */
const Book = require('../models/book')

const Borrow = require('../models/borrow')

const User = require('../models/user')

const Tagcol = require('../models/tagcol')

const Admin = require('../models/admin')

const Rerurn = require('../models/return')

const crud = {}

// borrow
crud.borrowText = async (ctx, next) => {
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
crud.borrowAdd = async (ctx, next) => {
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
crud.borrowUpdate = async (ctx, next) => {
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
crud.borrowDel = async (ctx, next) => {
  const id = ctx.query
  ctx.result = await Borrow.destroy({
    where: {
      borrow_id: [id.id],
    },
  })
  return next()
}
// 续借
crud.borrowRenew = async (ctx, next) => {
  const borrowInfo = ctx.request.body
  console.log(borrowInfo)
  const original = await Borrow.findAll({
    raw: true,
    attributes: ['return_date'],
    where: {
      borrow_id: [borrowInfo.borrow_id],
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
        borrow_id: [borrowInfo.borrow_id],
      },
    },
  )
  return next()
}
// Book
crud.searchBook = async (ctx, next) => {
  const params = ctx.query
  ctx.result = await Book.findAll(
    params.book_name
      ? {
          where: {
            book_name: [params.book_name],
          },
        }
      : {},
  )
  return next()
}
crud.addBook = async (ctx, next) => {
  const bookInfo = ctx.request.body
  ctx.result = await Book.create({
    book_id: 0,
    book_name: bookInfo.book_name,
    author: bookInfo.author,
    book_intro: bookInfo.book_intro,
    classify: bookInfo.classify,
    ISBN: bookInfo.ISBN,
    publisher: bookInfo.publisher,
    state: 1,
    location: bookInfo.location,
  })
  return next()
}

crud.updateBook = async (ctx, next) => {
  const bookInfo = ctx.request.body
  ctx.result = await Book.update(
    {
      book_id: bookInfo.book_id,
      book_name: bookInfo.book_name,
      author: bookInfo.author,
      book_intro: bookInfo.book_intro,
      classify: bookInfo.classify,
      ISBN: bookInfo.ISBN,
      publisher: bookInfo.publisher,
    },
    {
      where: {
        book_id: [bookInfo.book_id],
      },
    },
  )
  return next()
}
crud.deleteBook = async (ctx, next) => {
  const id = ctx.query
  ctx.result = await Book.destroy({
    where: {
      book_id: [id.id],
    },
  })
  return next()
}

crud.search = async (ctx, next) => {
  const { value } = ctx.request.body
  ctx.result = await Book.findAll({
    where: {
      [Op.or]: [{ book_name: [value] }, { ISBN: [value] }, { author: [value] }],
    },
  })
  return next()
}

crud.Text = async (ctx, next) => {
  ctx.result = await Book.findAll()
  return next()
}
// user
crud.userAll = async (ctx, next) => {
  const params = ctx.query
  ctx.result = await User.findAll(
    params.user_name
      ? {
          where: { user_name: [params.user_name] },
        }
      : {},
  )
  return next()
}
crud.userAdd = async (ctx, next) => {
  const userInfo = ctx.request.body
  ctx.result = await User.create({
    user_certificate: 0,
    user_name: userInfo.user_name,
    password: userInfo.password,
    user_sex: userInfo.user_sex,
    lend: userInfo.lend,
    is_loss: 0,
    borrowed: 0,
    unpaid: 0.0,
  })
  return next()
}

crud.userDel = async (ctx, next) => {
  const id = ctx.query
  ctx.result = await User.destroy({
    where: {
      user_certificate: [id.id],
    },
  })
  return next()
}
crud.userUpdate = async (ctx, next) => {
  const userInfo = ctx.request.body
  ctx.result = await User.update(
    {
      user_certificate: userInfo.user_certificate,
      user_name: userInfo.user_name,
      password: userInfo.password,
      user_sex: userInfo.user_sex,
      lend: userInfo.lend,
      is_loss: userInfo.is_loss,
      borrowed: userInfo.borrowed,
      unpaid: userInfo.unpaid,
    },
    {
      where: {
        user_certificate: [userInfo.user_certificate],
      },
    },
  )
  return next()
}

// classify
crud.tagcolAll = async (ctx, next) => {
  const params = ctx.query
  ctx.result = await Tagcol.findAll(
    params.tag_name
      ? {
          where: {
            tag_name: [params.tag_name],
          },
        }
      : {},
  )
  return next()
}
crud.tagcolAdd = async (ctx, next) => {
  const tagcolInfo = ctx.request.body
  ctx.result = await Tagcol.create({
    tag_id: 0,
    tag_name: tagcolInfo.tag_name,
    class_id: tagcolInfo.class_id,
  })
  return next()
}
crud.tagcolupdata = async (ctx, next) => {
  const tagcolInfo = ctx.request.body
  ctx.result = await Tagcol.update(
    {
      tag_id: tagcolInfo.tag_id,
      tag_name: tagcolInfo.tag_name,
      class_id: tagcolInfo.class_id,
    },
    {
      where: {
        tag_id: [tagcolInfo.tag_id],
      },
    },
  )
  return next()
}
crud.tagcolDel = async (ctx, next) => {
  const id = ctx.query
  ctx.result = await Tagcol.destroy({
    where: {
      tag_id: [id.id],
    },
  })
  return next()
}

// admin
crud.adminAll = async (ctx, next) => {
  const adminInfo = ctx.request.body
  ctx.result = await Admin.findAll(
    adminInfo.admin_name
      ? {
          where: {
            admin_name: [adminInfo.admin_name],
          },
        }
      : {},
  )
  return next()
}
crud.adminAdd = async (ctx, next) => {
  const adminInfo = ctx.request.body
  ctx.result = await Admin.create({
    admin_id: 0,
    admin_name: adminInfo.admin_name,
    admin_password: adminInfo.admin_password,
    admin_sex: adminInfo.admin_sex,
    admin_email: adminInfo.admin_email,
    admin_telephone: adminInfo.admin_telephone,
    admin_mark: adminInfo.admin_mark,
    purview: adminInfo.purview,
  })
  return next()
}
crud.adminUpdate = async (ctx, next) => {
  const adminInfo = ctx.request.body
  ctx.result = await Admin.update(
    {
      admin_id: adminInfo.admin_id,
      admin_name: adminInfo.admin_name,
      admin_password: adminInfo.admin_password,
      admin_sex: adminInfo.admin_sex,
      admin_email: adminInfo.admin_email,
      admin_telephone: adminInfo.admin_telephone,
      admin_mark: adminInfo.admin_mark,
      purview: adminInfo.purview,
    },
    {
      where: {
        admin_id: [adminInfo.admin_id],
      },
    },
  )
  return next()
}
crud.adminDel = async (ctx, next) => {
  const id = ctx.query
  ctx.result = await Admin.destroy({
    where: {
      admin_id: [id.id],
    },
  })
  return next()
}

// return
crud.returnAdd = async (ctx, next) => {
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
  ctx.result = await Rerurn.create({
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

crud.returnAll = async (ctx, next) => {
  ctx.result = await Rerurn.findAll({})
  return next()
}

module.exports = crud
