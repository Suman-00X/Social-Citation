import express from 'express';
import verifyToken from '../Extras/JwtAuth.js'
import 
{   addFeedback, 
    updateFeedback, 
    deleteFeedback, 
    addLike, 
    removeLike, 
    addDislike,
    removeDislike,
} from '../Controller/feedback/FeedbackController.js';

const router = express.Router();

// Routes requiring authentication
router.post('/feedback', verifyToken, addFeedback);
router.put('/feedback/:feedbackId', verifyToken, updateFeedback);
router.delete('/feedback/:feedbackId', verifyToken, deleteFeedback);
router.post('/feedback/:feedbackId/like', verifyToken, addLike);
router.delete('/feedback/:feedbackId/like', verifyToken, removeLike);
router.post('/feedback/:feedbackId/dislike', verifyToken, addDislike);
router.delete('/feedback/:feedbackId/dislike', verifyToken, removeDislike);
// router.put('/feedback/:feedbackId', verifyToken, updateFeedbackByUser);
// router.delete('/feedback/:feedbackId/like/:userId', verifyToken, removeLikeByUser);
// router.delete('/feedback/:feedbackId/dislike/:userId', verifyToken, removeDislikeByUser);

export default router;
