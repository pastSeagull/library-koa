'use strict'
const User = require('../models/user')

const user = {}

// user
user.userAll = async (ctx, next) => {
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
user.userAdd = async (ctx, next) => {
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

user.userDel = async (ctx, next) => {
  const id = ctx.query
  ctx.result = await User.destroy({
    where: {
      user_certificate: [id.id],
    },
  })
  return next()
}
user.userUpdate = async (ctx, next) => {
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

module.exports = user
