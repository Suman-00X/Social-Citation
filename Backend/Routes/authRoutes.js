import express from 'express';
import {signup, otpVerification} from '../Controller/User/SignupController.js';
import {signin, forgetPassword, resetPassword} from '../Controller/User/SigninController.js';

const router = express.Router();

// Public routes (no authentication required)
router.post('/signup', signup);
router.post('/signup-otp-verification', otpVerification);
router.post('/signin', signin);
router.post('/forget-password', forgetPassword);
router.post('/reset-password', resetPassword);

export default router;
