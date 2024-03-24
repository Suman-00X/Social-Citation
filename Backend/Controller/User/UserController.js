import User from '../../Database/models/userModel.js';


export const updateAccount = async(req, res) => {
    try {
      const userId = req.params.userId;
      const yourId = req.user.id;
      if (userId !== yourId) {
        return next(errorHandler(401, 'You can only update your own account!'));
      }
      const updateData = req.body;

      const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Update account error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

export const   getFeedbacksByUser = async (req, res) => {
    try {
      const userId = req.params.userId;

      const user = await User.findById(userId).populate('feedbacks');

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json(user.feedbacks);
    } catch (error) {
      console.error('Get feedbacks by user error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

