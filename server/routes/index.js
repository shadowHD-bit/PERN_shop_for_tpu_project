const Router = require('express')
const router = new Router()

//Import Routers
const productRouter = require('./productRouter')
const productBrandRouter = require('./productBrandRouter')
const productTypeRouter = require('./productTypeRouter')
const userRouter = require('./userRouter')


router.use('/user', userRouter)
router.use('/productType', productTypeRouter)
router.use('/productBrand', productBrandRouter)
router.use('/product', productRouter)


module.exports = router