'use strict'

const { Op } = require('sequelize')

const jwt = require('jsonwebtoken')
const config = require('../config')

const login = {}

const Admin = require('../models/admin')

const User = require('../models/user')
const Borrow = require('../models/borrow')

login.login = async (ctx, next) => {
  const userInfo = ctx.request.body
  console.log(userInfo)
  const info = await User.findAll({
    attributes: ['user_name', 'password'],
    where: {
      [Op.and]: [{ user_name: [userInfo.user_name] }, { password: [userInfo.password] }],
    },
    raw: true,
  })
  console.log(info)
  if (info.length) {
    ctx.body = {
      status: 'ok',
      currentAuthority: 'admin',
      user: info[0],
    }
    return next()
  } else {
    ctx.body = {
      status: 'error',
      currentAuthority: 'guest',
    }
    return next()
  }
}
login.adminLogin = async (ctx, next) => {
  const adminInfo = ctx.request.body
  const username = adminInfo.username
  const info = await Admin.findAll({
    raw: true,
    where: {
      [Op.and]: [{ admin_name: [adminInfo.username] }, { admin_password: [adminInfo.password] }],
    },
  })
  if (info.length) {
    ctx.body = {
      status: 'ok',
      currentAuthority: 'admin',
      user: info[0],
      token: jwt.sign({ username }, config.secret),
    }
    return next()
  } else {
    ctx.body = {
      status: 'error',
      currentAuthority: 'guest',
    }
    return next()
  }
}

login.userLogin = async (ctx, next) => {
  const userInfo = ctx.request.body
  const username = userInfo.username
  console.log(userInfo)
  const info = await User.findAll({
    // raw: true,
    where: {
      [Op.and]: [{ user_name: [userInfo.value.username] }, { password: [userInfo.value.password] }],
    },
  })
  const borrow = await Borrow.findAll({
    // raw: true,
    where: {
      user_certificate: [info[0].user_certificate],
    },
  })
  if (info.length) {
    ctx.body = {
      token: jwt.sign({ username }, config.secret),
      status: 'ok',
      currentAuthority: 'user',
      user: info[0],
      borrow: borrow,
    }
    return next()
  } else {
    ctx.body = {
      status: 'error',
      currentAuthority: 'guest',
    }
    return next()
  }
}

// 退出登录
login.outLogin = async (ctx, next) => {
  ctx.body = { data: {}, success: true, access: '' }
  return next()
}
module.exports = login
