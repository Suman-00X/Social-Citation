import Feedback from '../../Database/models/feedbackModel.js';


  export const addFeedback = async(req, res) => {
    try {

      const { feedback, rating, isCloseFriend } = req.body;

      const newFeedback = new Feedback({
        user: req.user.userId,
        feedback,
        rating,
        isCloseFriend
      });

      await newFeedback.save();

      return res.status(201).json({ message: 'Feedback added successfully' });
    } catch (error) {
      console.error('Add feedback error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  export const updateFeedback = async(req, res) => {
    try {
      const feedbackId = req.params.feedbackId;
      const updateData = req.body;

      const updatedFeedback = await Feedback.findByIdAndUpdate(feedbackId, updateData, { new: true });

      if (!updatedFeedback) {
        return res.status(404).json({ message: 'Feedback not found' });
      }

      return res.status(200).json(updatedFeedback);
    } catch (error) {
      console.error('Update feedback error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  export const deleteFeedback = async(req, res) => {
    try {
      const feedbackId = req.params.feedbackId;

      const deletedFeedback = await Feedback.findByIdAndDelete(feedbackId);

      if (!deletedFeedback) {
        return res.status(404).json({ message: 'Feedback not found' });
      }

      return res.status(200).json({ message: 'Feedback deleted successfully' });
    } catch (error) {
      console.error('Delete feedback error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  export const addLike = async(req, res) => {
    try {
      const feedbackId = req.params.feedbackId;

      const updatedFeedback = await Feedback.findByIdAndUpdate(
        feedbackId,
        { $addToSet: { likes: req.user.userId } }, // Assuming `req.user.userId` holds the user's ID from JWT
        { new: true }
      );

      if (!updatedFeedback) {
        return res.status(404).json({ message: 'Feedback not found' });
      }

      return res.status(200).json(updatedFeedback);
    } catch (error) {
      console.error('Add like error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  export const removeLike = async(req, res) => {
    try {
      const feedbackId = req.params.feedbackId;

      const updatedFeedback = await Feedback.findByIdAndUpdate(
        feedbackId,
        { $pull: { likes: req.user.userId } }, // Assuming `req.user.userId` holds the user's ID from JWT
        { new: true }
      );

      if (!updatedFeedback) {
        return res.status(404).json({ message: 'Feedback not found' });
      }

      return res.status(200).json(updatedFeedback);
    } catch (error) {
      console.error('Remove like error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  export const addDislike = async(req, res) => {
    try {
      const feedbackId = req.params.feedbackId;

      const updatedFeedback = await Feedback.findByIdAndUpdate(
        feedbackId,
        { $addToSet: { dislikes: req.user.userId } }, // Assuming `req.user.userId` holds the user's ID from JWT
        { new: true }
      );

      if (!updatedFeedback) {
        return res.status(404).json({ message: 'Feedback not found' });
      }

      return res.status(200).json(updatedFeedback);
    } catch (error) {
      console.error('Add dislike error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  export const removeDislike = async(req, res) => {
    try {
      const feedbackId = req.params.feedbackId;

      const updatedFeedback = await Feedback.findByIdAndUpdate(
        feedbackId,
        { $pull: { dislikes: req.user.userId } }, // Assuming `req.user.userId` holds the user's ID from JWT
        { new: true }
      );

      if (!updatedFeedback) {
        return res.status(404).json({ message: 'Feedback not found' });
      }

      return res.status(200).json(updatedFeedback);
    } catch (error) {
      console.error('Remove dislike error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  const removeLikeByUser = async(req, res) => {
    try {
      const feedbackId = req.params.feedbackId;
      const userId = req.params.userId;

      const updatedFeedback = await Feedback.findByIdAndUpdate(
        feedbackId,
        { $pull: { likes: userId } },
        { new: true }
      );

      if (!updatedFeedback) {
        return res.status(404).json({ message: 'Feedback not found' });
      }

      return res.status(200).json(updatedFeedback);
    } catch (error) {
      console.error('Remove like by user error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  const removeDislikeByUser = async(req, res) => {
    try {
      const feedbackId = req.params.feedbackId;
      const userId = req.params.userId;

      const updatedFeedback = await Feedback.findByIdAndUpdate(
        feedbackId,
        { $pull: { dislikes: userId } },
        { new: true }
      );

      if (!updatedFeedback) {
        return res.status(404).json({ message: 'Feedback not found' });
      }

      return res.status(200).json(updatedFeedback);
    } catch (error) {
      console.error('Remove dislike by user error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }



