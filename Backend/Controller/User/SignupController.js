import bcrypt from 'bcrypt';
import User from "../../Database/models/userModel.js"
import signupOTP from "../../Database/models/otpModel.js"
import OTPService from "../../Extras/OTPservice.js";

var emailID = ''
var mobileNo = ''



export const signup = async (req, res) => {
  try {
    const {
      fullName,
      email,
      mobileNumber,
      username,
      password,
      dob,
      profilePicture } = req.body;

    emailID = req.body.email;
    mobileNo = req.body.mobileNumber;


    // Check if the email and mobile number are unique
    const existingUser = await User.findOne({ $or: [{ email }, { mobileNumber }, { username }] });

    if (existingUser) {
      return res.status(400).json({ message: 'Email or mobile number already exists' });
    }

    // Calculate age from DOB
    const dobDate = new Date(dob);
    const currentDate = new Date();
    const dobYear = dobDate.getFullYear();
    const currentYear = currentDate.getFullYear();
    const age = currentYear - dobYear;

    // Adjust age if the birthday hasn't occurred yet this year
    if (currentDate < new Date(currentYear, dobDate.getMonth(), dobDate.getDate())) {
      age--;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      fullName,
      email,
      mobileNumber,
      username,
      password: hashedPassword,
      dob: dobDate,
      age,
      profilePicture
    });

    await newUser.save();


    //OTP generation to authenticate
    const OTP_EMAIL = OTPService.generateOTP();
    const OTP_MOBILE = OTPService.generateOTP();

    const newOTP = new signupOTP({
      email: "201@iiitt.ac.in", 
      mobileNumber: "7484015450",
      signupOTP: {
        codeEmail: "901234",
        codeMobile: "567890",
      }
    });

    await newOTP.save();

    OTPService.sendOTPByEmail(email, OTP_EMAIL);
    OTPService.sendOTPBySMS(mobileNumber, OTP_MOBILE);

    await newOTP.save();

    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export const otpVerification = async (req, res) => {

  const { otpEmail, otpMobile } = req.body;

  const user = await signupOTP.findOne({ $or: [{ email }, { mobileNumber }] });

  if (!user) {
    return res.status(400).json({ message: "Email or mobile number don't exists" });
  }

  if (user.signupOTP.codeEmail === otpEmail) {
    res.status(400).json({ message: "Email OTP Verified" });
  } else {
    res.status(400).json({ message: "Email OTP did not matched" });
  }

  if (user.signupOTP.codeMobile === otpMobile) {
    res.status(400).json({ message: "Mobile OTP Verified" });
  } else {
    res.status(400).json({ message: "Mobile OTP did not matched" });
  }
  return res.status(200).json({ message: "OTP verification successful" })
}

