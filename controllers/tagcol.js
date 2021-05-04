'use strict'
const Tagcol = require('../models/tagcol')

const tagcol = {}

// classify
tagcol.tagcolAll = async (ctx, next) => {
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
tagcol.tagcolAdd = async (ctx, next) => {
  const tagcolInfo = ctx.request.body
  ctx.result = await Tagcol.create({
    tag_id: 0,
    tag_name: tagcolInfo.tag_name,
    class_id: tagcolInfo.class_id,
  })
  return next()
}
tagcol.tagcolupdata = async (ctx, next) => {
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
tagcol.tagcolDel = async (ctx, next) => {
  const id = ctx.query
  ctx.result = await Tagcol.destroy({
    where: {
      tag_id: [id.id],
    },
  })
  return next()
}

module.exports = tagcol
