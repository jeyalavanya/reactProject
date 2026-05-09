import express from 'express';
import { createChannel, getChannel } from '../controllers/channelController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/me', authMiddleware, getChannel);
router.get('/:channelId', getChannel);
router.post('/', authMiddleware, createChannel);

export default router;
