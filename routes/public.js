'use strict'

const Router = require('koa-router')
const controllers = require('../controllers')

const router = new Router()
router.prefix('/api/v1')

router.post('/login', controllers.login.login)
router.post('/outLogin', controllers.login.outLogin)

// admin
router.post('/adminLogin', controllers.login.adminLogin)

router.post('/userLogin', controllers.login.userLogin)

module.exports = router
