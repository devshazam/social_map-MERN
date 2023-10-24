const Router = require('express')
const router = new Router()
const deviceRouter = require('./deviceRouter')
const userRouter = require('./userRouter')


router.use('/user', userRouter)
router.use('/device', deviceRouter)


module.exports = router
 