const Router = require('express')
const router = new Router()

//Import Routers
const productRouter = require('./productRouter')
const productBrandRouter = require('./productBrandRouter')
const productTypeRouter = require('./productTypeRouter')
const userRouter = require('./userRouter')
const basketRouter = require('./basketRouter');
const sliderRouter = require('./sliderRouter');
const orderRouter = require('./orderRouter')
const ratingRouter = require('./ratingRouter')
const orderUserRouter = require('./orderUserRouter')

router.use('/user', userRouter)
router.use('/productType', productTypeRouter)
router.use('/productBrand', productBrandRouter)
router.use('/product', productRouter)
router.use('/basket', basketRouter)
router.use('/slider', sliderRouter)
router.use('/order', orderRouter)
router.use('/orderuser', orderUserRouter)
router.use('/rating', ratingRouter)

module.exports = router