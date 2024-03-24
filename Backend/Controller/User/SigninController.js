import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../../Database/models/userModel.js';
import OTPService from '../../Extras/OTPservice.js';
import forgetOTP from "../../Database/models/otpModel.js"


var identifierGlobal;


  export const signin = async (req, res) => {
    try {
      const { identifier, password } = req.body;

      // Find user by username, email, or mobile number
      const user = await User.findOne({
        $or: [
          { username: identifier },
          { email: identifier },
          { mobileNumber: identifier }
        ]
      });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Compare password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Generate JWT
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      // Return JWT to client
      return res.status(200).json({ message: 'Signin successful', token });

    } catch (error) {
      console.error('Signin error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  export const forgetPassword = async (req, res) => {
    try {
      const { identifier } = req.body;
      identifierGlobal = identifier
      // Find user by username, email, or mobile number
      const user = await User.findOne({
        $or: [
          { username: identifier },
          { email: identifier },
          { mobileNumber: identifier }
        ]
      });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Generate and send OTP to user's email/mobile number
      const OTP = OTPService.generateOTP();
      const otpExpiresAt = new Date(Date.now() + 300000); // Expires in 5 minutes
      const newOTP = new forgetOTP({
        identifier,
        OTP,
        otpExpiresAt
      })
      await newOTP.save();


      if (identifier.includes("@")) {
        OTPService.sendOTPByEmail(identifier, OTP);
      } else {
        OTPService.sendOTPBySMS(identifier, OTP);
      }

      return res.status(200).json({ message: 'OTP sent successfully' });


    } catch (error) {
      console.error('Forget password error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  export const resetPassword = async (req, res) => {
    try {
      const { OTP, newPassword } = req.body;

      // Find user by email or mobile number
      const otpVerify = await forgetOTP.findOne({
        $or: [
          { email: identifier },
          { mobileNumber: identifier },
        ]
      });

      if (!otpVerify) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Verify OTP
      if (otpVerify.otp === OTP) {
        return res.status(200).json({ message: 'OTP Verified !!' });
      } else {
        return res.status(400).json({ message: 'Invalid or expired OTP' });
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update user's password
      user.password = hashedPassword;
      const user = await User.findOneAndUpdate(
        { $or: [{ email: emailOrMobile }, { mobileNumber: emailOrMobile }] }, // Find user by email or mobileNumber
        { password: newPassword }, // New password
        { new: true } // To return the updated document
      );
      await user.save();

    } catch (error) {
      console.error('Reset password error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

