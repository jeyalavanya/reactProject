import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import {
  getVideos,
  getVideoById,
  createVideo,
  updateVideo,
  deleteVideo,
  reactToVideo
} from '../controllers/videoController.js';
import { addComment } from '../controllers/commentController.js';

const router = express.Router();

router.get('/', getVideos);
router.get('/:videoId', getVideoById);
router.post('/', authMiddleware, createVideo);
router.put('/:videoId', authMiddleware, updateVideo);
router.delete('/:videoId', authMiddleware, deleteVideo);
router.patch('/:videoId/reactions', authMiddleware, reactToVideo);
router.post('/:videoId/comments', authMiddleware, addComment);

export default router;
