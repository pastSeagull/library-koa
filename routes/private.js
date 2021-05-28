'use strict'

const Router = require('koa-router')
const controllers = require('../controllers')
const jwtMiddleware = require('../middlewares/jwt')

const router = new Router()
router.prefix('/api/v1')
// 请求带 token
router.use(jwtMiddleware)

router.post('/search', controllers.crud.search)
// borrow
router.get('/borrow', controllers.borrow.borrowAll)
router.post('/borrowAdd', controllers.borrow.borrowAdd)
router.post('/borrowUpdate', controllers.borrow.borrowUpdate)
router.get('/borrowRenew', controllers.borrow.borrowRenew)
// 前台请求
router.post('/getBorrow', controllers.borrow.getBorrow)

// Book
router.get('/findAll', controllers.book.searchBook)
router.post('/addBook', controllers.book.addBook)
router.get('/deleteBook', controllers.book.deleteBook)
router.post('/updateBook', controllers.book.updateBook)

// User
router.get('/userAll', controllers.user.userAll)
router.post('/useradd', controllers.user.userAdd)
router.get('/userDel', controllers.user.userDel)
router.post('/userUpdate', controllers.user.userUpdate)

// classify
router.get('/tagcolAll', controllers.tagcol.tagcolAll)
router.post('/tagcolAdd', controllers.tagcol.tagcolAdd)
router.post('/tagcolupdata', controllers.tagcol.tagcolupdata)
router.get('/tagcolDel', controllers.tagcol.tagcolDel)

// admin
router.get('/adminAll', controllers.admin.adminAll)
router.post('/adminAdd', controllers.admin.adminAdd)
router.post('/adminUpdate', controllers.admin.adminUpdate)
router.get('/adminDel', controllers.admin.adminDel)

// return
router.post('/returnAdd', controllers.returns.returnAdd)
router.get('/returnAll', controllers.returns.returnAll)

router.get('/borrowDel', controllers.borrow.borrowDel)

module.exports = router
