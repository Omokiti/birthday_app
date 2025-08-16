const mongoose = require('mongoose');

require('dotenv').config();

const mongoDB_URI = process.env.MONGODB_URI 

function connectToMongoDB(){
    mongoose.connect(mongoDB_URI)

    mongoose.connection.on('connected',()=>{
        console.log('Connected Successfully')
    })

    mongoose.connection.on('error',(err)=>{
        console.log('Error connecting to MogoDB',err)
    })
}

module.exports={ connectToMongoDB }
