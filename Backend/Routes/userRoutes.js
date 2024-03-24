import express from 'express';
import verifyToken  from '../Extras/JwtAuth.js'
import {updateAccount, getFeedbacksByUser} from '../Controller/User/UserController.js';

const router = express.Router();

// Routes requiring authentication
router.put('/account/:userId', verifyToken, updateAccount);
router.get('/account/:userId/feedbacks', verifyToken, getFeedbacksByUser);

export default router;

