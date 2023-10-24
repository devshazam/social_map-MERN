const Router = require('express')
const router = new Router()
const deviceController = require('../controllers/deviceController')


router.post('/create-device/', deviceController.createDevice) // № 1
router.post('/fetch-user-by-order-id/', deviceController.fetchUserByOrderId) // № 11


module.exports = router