const cron = require('node-cron')
const nodemailer = require('node-mailer')

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


//check for borthdays at 7am daily

cron.schedule("0 7 * * *", async()=>{
  console.log('checking for birthdays')

  const today = new Date();
  const month = today.getMonth();
  const day = today.getDate();

  try {
    const users = await User.find()
    users.forEach(user => {
        const dob = new Date(user.dob)
        if(dob.getMonth() === month && dob.getDate() === day){
            sendBirthdayEmail(user)

        }
    })
  } catch (error) {
    console.log('Error checking birthday')
  }

})
