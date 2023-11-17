const Router = require('express')
const router = new Router()
const discountController = require('../controllers/discountController')


router.post('/fetch-yandex-address/', discountController.fetchYandexAddress)
router.post('/create-discount', discountController.createDiscount)
router.post('/fetch-discount-by-map', discountController.fetchDiscountByMap)
router.post('/fetch-ads-by-id', discountController.fetchAdsById)


module.exports = router