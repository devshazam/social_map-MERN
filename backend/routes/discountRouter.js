const Router = require('express')
const router = new Router()
const discountController = require('../controllers/discountController')


router.post('/fetch-yandex-address/', discountController.fetchYandexAddress) // № 1
router.post('/create-discount', discountController.createDiscount) // № 1
router.post('/fetch-discount-by-map/', discountController.fetchDiscountByMap) // № 1


module.exports = router