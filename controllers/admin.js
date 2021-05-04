'use strict'
const Admin = require('../models/admin')

const admin = {}

// admin
admin.adminAll = async (ctx, next) => {
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
admin.adminAdd = async (ctx, next) => {
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
admin.adminUpdate = async (ctx, next) => {
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
admin.adminDel = async (ctx, next) => {
  const id = ctx.query
  console.log(id)
  ctx.result = await Admin.destroy({
    where: {
      admin_id: [id.id],
    },
  })
  return next()
}

module.exports = admin
