//Import libraries
require('dotenv').config()
const express = require('express')
const cors = require('cors')

const fileUpload = require('express-fileupload')

//Import connection data DataBase
const sequelize = require('./dataBase')

//Import Models DataBase
const models = require('./models/models')

//Import main router
const router = require('./routes/index')

//Import middleware
const errorHandler = require('./middleware/ErrorHandlingMidleWare')

const path = require('path')
//Read port local server
const PORT = process.env.PORT || 5000
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(express.static(path.resolve(__dirname, 'static_review')))
app.use(express.static(path.resolve(__dirname, 'static_avatar')))
app.use(express.static(path.resolve(__dirname, 'static_brand_and_type')))

app.use(fileUpload({}))
app.use('/api', router)

//The lastMIdllewares
app.use(errorHandler)


//Function start Server
const start = async () => {
    try{
        await sequelize.authenticate() //connect db
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    }
    catch(e){
        console.log(e)
    }
}

start();
