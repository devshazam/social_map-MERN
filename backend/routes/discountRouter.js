const Router = require('express')
const router = new Router()
const discountController = require('../controllers/discountController')


router.post('/fetch-yandex-address/', discountController.fetchYandexAddress)
router.post('/create-discount', discountController.createDiscount)
router.post('/fetch-discount-by-map', discountController.fetchDiscountByMap)
router.post('/fetch-ads-by-id', discountController.fetchAdsById)
router.post('/fetch-ads-list', discountController.fetchAdsList)
// router.post('/check-ip', discountController.checkIp)
router.post('/record-error-to-log', discountController.recordErrorToLog)
router.post('/fetch-user-ads-list', discountController.fetchUserAdsList)
router.post('/delete-user-ads-list', discountController.deleteUserAdsList)
router.post('/fetch-ads-by-id-for-user', discountController.fetchAdByIdForUser)
router.post('/save-changes-of-discount', discountController.saveChangesOfDiscount)
router.post('/check-numbers-of-ads', discountController.checkNumbersOfAds)


router.get('/error-test', discountController.errorTest)
router.get('/error-testos', discountController.errorTestos)

router.get('/get-errors-list', discountController.getErrorsList)


// /api/discounts/error-test
module.exports = router