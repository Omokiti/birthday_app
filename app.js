require('dotenv').config()

const express = require('express')

const app = express ()
const bodyParser = require('body-parser')
const Port = process.env.PORT
const User = require('./models/users')
const path = require('path')

//connect to Mongodb
const db = require('./db')
db.connectToMongoDB()

//middleware
app.use(bodyParser.urlencoded({ extended: true}))

//render the form that takes user input
app.get('/',(req,res)=>{
 res.sendFile(path.join(__dirname,'views','index.html'));

})

// add user details to database
app.post('/add',async (req,res)=>{
    console.log('see data',req.body)
    const { username,email,dob}=req.body

    try {
        await User.create({username,email,dob})
       return res.status(201).json({message:`Birthday succesfully added for ${username}`})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})


app.listen(Port,()=>{
    console.log(`Server is listening on port ${Port}`)
    require("./cron");
})