'use strict'

const Router = require('koa-router')
const controllers = require('../controllers')
const jwtMiddleware = require('../middlewares/jwt')

const router = new Router()
router.prefix('/api/v1')
// router.use(jwtMiddleware)

router.get('/query', controllers.query.findSomething)

router.get('/findAll', controllers.crud.searchBook)

router.post('/search', controllers.crud.search)
// borrow
router.get('/borrow', controllers.crud.borrowText)
router.post('/borrowAdd', controllers.crud.borrowAdd)
router.post('/borrowUpdate', controllers.crud.borrowUpdate)
router.post('/borrowRenew', controllers.crud.borrowRenew)

// Book
router.post('/addBook', controllers.crud.addBook)
router.get('/deleteBook', controllers.crud.deleteBook)
router.post('/updateBook', controllers.crud.updateBook)

// User
router.get('/userAll', controllers.crud.userAll)
router.post('/useradd', controllers.crud.userAdd)
router.get('/userDel', controllers.crud.userDel)
router.post('/userUpdate', controllers.crud.userUpdate)

// classify
router.get('/tagcolAll', controllers.crud.tagcolAll)
router.post('/tagcolAdd', controllers.crud.tagcolAdd)
router.post('/tagcolupdata', controllers.crud.tagcolupdata)
router.get('/tagcolDel', controllers.crud.tagcolDel)

// admin
router.get('/adminAll', controllers.crud.adminAll)
router.post('/adminAdd', controllers.crud.adminAdd)
router.post('/adminUpdate', controllers.crud.adminUpdate)
router.get('/adminDel', controllers.crud.adminDel)

// return
router.post('/returnAdd', controllers.crud.returnAdd)
router.get('/returnAll', controllers.crud.returnAll)
router.get('/borrowDel', controllers.crud.borrowDel)
module.exports = router
