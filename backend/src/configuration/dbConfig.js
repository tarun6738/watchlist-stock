const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/stock-manage",{
    serverSelectionTimeoutMS: 5000
})

mongoose.connection.on("connected",()=>{
    console.log('Connected to MongoDB')
})

mongoose.connection.on("error",(error)=>{
    console.log('Mongo Connection error', error)
})

module.exports = mongoose;