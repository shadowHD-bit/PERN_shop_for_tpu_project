//Import libraries
require('dotenv').config()
const express = require('express')
const cors = require('cors')

//Import connection data DataBase
const sequelize = require('./dataBase')

//Import Models DataBase
const models = require('./models/models')

//Import main router
const router = require('./routes/index')



//Read port local server
const PORT = process.env.PORT || 5000
const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', router)



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
