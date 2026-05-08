import Comment from '../models/Comment.js';

// Add comment
export async function addComment(req, res) {
  try {
    const { videoId, text } = req.body;
    const userId = req.userId;

    if (!videoId || !text || !text.trim()) {
      return res.status(400).json({ message: 'Video ID and comment text are required' });
    }

    const user = req.user;

    const comment = await Comment.create({
      videoId,
      userId,
      username: user.username,
      text: text.trim()
    });

    return res.status(201).json({
      message: 'Comment added successfully',
      comment: {
        _id: comment._id,
        videoId: comment.videoId,
        userId: comment.userId,
        username: comment.username,
        text: comment.text,
        createdAt: comment.createdAt
      }
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error: ' + error.message });
  }
}

// Get comments for a video
export async function getComments(req, res) {
  try {
    const { videoId } = req.params;

    if (!videoId) {
      return res.status(400).json({ message: 'Video ID is required' });
    }

    const comments = await Comment.find({ videoId })
      .sort({ createdAt: -1 });

    return res.json({
      comments: comments.map(comment => ({
        _id: comment._id,
        videoId: comment.videoId,
        userId: comment.userId,
        username: comment.username,
        text: comment.text,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt
      }))
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
}

// Update comment
export async function updateComment(req, res) {
  try {
    const { commentId } = req.params;
    const { text } = req.body;
    const userId = req.userId;

    if (!text || !text.trim()) {
      return res.status(400).json({ message: 'Comment text is required' });
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (comment.userId.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized to update this comment' });
    }

    comment.text = text.trim();
    await comment.save();

    return res.json({
      message: 'Comment updated successfully',
      comment: {
        _id: comment._id,
        videoId: comment.videoId,
        userId: comment.userId,
        username: comment.username,
        text: comment.text,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt
      }
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
}

// Delete comment
export async function deleteComment(req, res) {
  try {
    const { commentId } = req.params;
    const userId = req.userId;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (comment.userId.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized to delete this comment' });
    }

    await Comment.findByIdAndDelete(commentId);

    return res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
}
