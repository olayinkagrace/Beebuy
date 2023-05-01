const express = require('express')
const router = express()
const {
    createOrder,
    getOrder, 
    updateOrder,
    myOrder
} = require('../controllers/orderController')

const isAuth = require('../utils')

// require auth for all workout routes
router.use(isAuth)

router.post('/', isAuth , createOrder)
router.get('/mine', isAuth , myOrder)
router.get('/:id', isAuth , getOrder)
router.put('/:id/pay', isAuth , updateOrder)


module.exports = router