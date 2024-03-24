import mongoose from 'mongoose';

// User Schema
const SignupOTPschema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobileNumber: {
        type: String,
        required: true,
        unique: true
    },
    signupOTP: {
        codeEmail: String,
        codeMobile: String,
        expiresAt: {
            type: Date,
            default: Date.now,
            expires: 300 // Expires after 5 minutes (300 seconds)
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    expires: 300 // Expires after 5 minutes (300 seconds)
});


const forgotPassOTPschema = new mongoose.Schema({
    identifier :{
        type: String
    },
    otp :{
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 5,
    }
},{
    expires: 300 // Expires after 5 minutes (300 seconds)
});


const signupOTP = mongoose.model('SignupOTP', SignupOTPschema);
const forgetOTP = mongoose.model('forgetOTP', forgotPassOTPschema);

export default { signupOTP, forgetOTP };
