const Router = require('express')
const router = new Router()
const discountController = require('../controllers/discountController')


router.post('/create-discount/', discountController.createDiscount) // № 1
router.post('/fetch-user-by-order-id/', discountController.fetchUserByOrderId) // № 11


module.exports = router