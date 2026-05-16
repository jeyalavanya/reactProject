import express from 'express';
import { createChannel, getChannel, updateChannel, deleteChannel } from '../controllers/channelController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/me', authMiddleware, getChannel);
router.get('/:channelId', getChannel);
router.post('/', authMiddleware, createChannel);
router.put('/:channelId', authMiddleware, updateChannel);
router.delete('/:channelId', authMiddleware, deleteChannel);

export default router;
