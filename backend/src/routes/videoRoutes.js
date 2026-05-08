import express from 'express';

const router = express.Router();

// Get all videos (for now, return static data from frontend)
router.get('/', (req, res) => {
  res.json({ message: 'Videos endpoint' });
});

// Get single video
router.get('/:videoId', (req, res) => {
  res.json({ message: 'Get video by ID' });
});

export default router;
