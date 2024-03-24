import nodemailer from 'nodemailer';
import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const OTPService = {
  generateOTP() {
    // Generate a random 6-digit OTP
    return Math.floor(100000 + Math.random() * 900000).toString();
  },

  sendOTPByEmail(email, OTP) {
    // Code to send OTP to the user's email
    // You'll need to configure nodemailer for your email provider
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_ID,
      to: email,
      subject: 'OTP for Verification',
      text: `Your OTP for verification is: ${OTP}`
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  },

  sendOTPBySMS(mobileNumber, OTP) {
    // Code to send OTP to the user's mobile number
    // You'll need to configure twilio for sending SMS
    const accountSid = 'your-twilio-accountSid';
    const authToken = 'your-twilio-authToken';
    const client = twilio(accountSid, authToken);

    client.messages
      .create({
         body: `Your OTP for verification is: ${OTP}`,
         from: 'your-twilio-phone-number',
         to: mobileNumber
       })
      .then(message => console.log(message.sid))
      .catch(error => console.error('Error sending SMS:', error));
  },
  
};

export default OTPService;
