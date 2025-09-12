
const nodemailer = require('nodemailer');
const { connectToMongoDB, disconnectFromMongoDB } = require("./db");
require('dotenv').config()

const User = require('./models/users')

//gmail transporter

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD
    }
  });

async function sendBirthdayEmail(user){
    const mailoptions={
    from: `Birthday bot <${process.env.GMAIL_USER}>`,
    to: user.email,
    subject: `Happy Birthday, ${user.username} 🎉`,
    html:`<div style='font-family: sans-serif; text-align: center; padding: 20px;'>
     <h1> Happy Birthday ${user.username}</h1>
     <p >I hope you have an amazing day.</p>
    
    </div>`
    }

    try {
        await transporter.sendMail(mailoptions)
        console.log(`Email sent to ${user.email}`)
    } catch (error) {
        console.log(`Couldn't send email to ${user.email}`)
    }
}

//check for birthdays


  async function birthdayCheck(){
  console.log('checking for birthdays')
  const today = new Date();
  const month = today.getMonth();
  const day = today.getDate();

  try {
    const users = await User.find();
    for (const user of users) {
      const dob = new Date(user.dob);
      if (dob.getMonth() === month && dob.getDate() === day) {
        await sendBirthdayEmail(user);
      }
    }
    console.log("Birthday check complete.");
  } catch (error) {
    console.log('Error checking birthday')
  }

}

async function main() {
  try {
    await connectToMongoDB();
    console.log("Connected to MongoDB");
    await birthdayCheck();
  } catch (err) {
    console.error(err);
    process.exit(1);
  } finally {
    await disconnectFromMongoDB();
    console.log("Disconnected from MongoDB");
    process.exit(0);
  }
}



main();