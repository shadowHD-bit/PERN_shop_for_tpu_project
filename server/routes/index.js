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
const questionRouter = require('./questionRouter')
const answerRouter = require('./answerRouter')
const productExcelRouter = require('./ExcelRouters/productExcelRouter')
const orderExcelRouter = require('./ExcelRouters/orderExcelRouter')
const brandExcelRouter = require('./ExcelRouters/brandExcelRouter')
const typeExcelRouter = require('./ExcelRouters/typeExcelRouter')
const userExcelRouter = require('./ExcelRouters/userExcelRouter')
const likesRouter = require('./likesRouter')

router.use('/user', userRouter)
router.use('/productType', productTypeRouter)
router.use('/productBrand', productBrandRouter)
router.use('/product', productRouter)
router.use('/basket', basketRouter)
router.use('/slider', sliderRouter)
router.use('/order', orderRouter)
router.use('/orderuser', orderUserRouter)
router.use('/rating', ratingRouter)
router.use('/question', questionRouter)
router.use('/answer', answerRouter)

router.use('/product_excel', productExcelRouter)
router.use('/order_excel', orderExcelRouter)
router.use('/brand_excel', brandExcelRouter)
router.use('/type_excel', typeExcelRouter)
router.use('/user_excel', userExcelRouter)
router.use('/likes', likesRouter)

module.exports = router