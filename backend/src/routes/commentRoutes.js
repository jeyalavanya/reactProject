import express from 'express';
import {
  addComment,
  getComments,
  updateComment,
  deleteComment
} from '../controllers/commentController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Get comments for a video
router.get('/:videoId', getComments);

// Add comment (protected)
router.post('/', authMiddleware, addComment);

// Update comment (protected)
router.put('/:commentId', authMiddleware, updateComment);

// Delete comment (protected)
router.delete('/:commentId', authMiddleware, deleteComment);

export default router;
