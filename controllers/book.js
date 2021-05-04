'use strict'
const Book = require('../models/book')

const book = {}

book.searchBook = async (ctx, next) => {
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

book.addBook = async (ctx, next) => {
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

book.updateBook = async (ctx, next) => {
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
book.deleteBook = async (ctx, next) => {
  const id = ctx.query
  ctx.result = await Book.destroy({
    where: {
      book_id: [id.id],
    },
  })
  return next()
}

book.search = async (ctx, next) => {
  const { value } = ctx.request.body
  ctx.result = await Book.findAll({
    where: {
      [Op.or]: [{ book_name: [value] }, { ISBN: [value] }, { author: [value] }],
    },
  })
  return next()
}

book.Text = async (ctx, next) => {
  ctx.result = await Book.findAll()
  return next()
}

module.exports = book
