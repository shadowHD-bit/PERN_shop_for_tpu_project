require('dotenv').config()

const express = require('express')
const sequelize = require('./dataBase')

const PORT = process.env.PORT || 5000
const app = express()

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
