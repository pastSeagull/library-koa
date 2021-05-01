'use strict'

const Router = require('koa-router')
const controllers = require('../controllers')
const jwtMiddleware = require('../middlewares/jwt')

const router = new Router()
router.prefix('/api/v1')

router.use(jwtMiddleware)

router.get('/text', controllers.crud.Text)

module.exports = router
