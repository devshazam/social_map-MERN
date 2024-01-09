const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')


router.get('/auth', authMiddleware, userController.check) // № 3

router.post('/registration', userController.registration) // № 1
router.post('/login', userController.login) // № 2
router.post('/login-registration', userController.logReg) // № 2
// router.post('/confirm-mail', userController.confirmMail)
// router.post('/change', authMiddleware, userController.change) // № 1


router.post('/fetch-user-data-by-id', userController.fetchUserDataById)
router.post('/change-credencials', userController.changeCredencials)



router.get('/get-users-list', userController.getUsersList) // № 3

module.exports = router
