import Video from '../models/Video.js';
import Channel from '../models/Channel.js';
import Comment from '../models/Comment.js';

function extractYouTubeId(rawUrl = '') {
  try {
    const parsed = new URL(rawUrl);
    const host = parsed.hostname.replace('www.', '').toLowerCase();

    if (host === 'youtu.be') {
      return parsed.pathname.replace('/', '').trim();
    }

    if (host === 'youtube.com' || host === 'm.youtube.com') {
      if (parsed.pathname === '/watch') {
        return parsed.searchParams.get('v');
      }

      if (parsed.pathname.startsWith('/shorts/')) {
        return parsed.pathname.split('/')[2];
      }

      if (parsed.pathname.startsWith('/embed/')) {
        return parsed.pathname.split('/')[2];
      }
    }
  } catch (error) {
    return '';
  }

  return '';
}

function normalizeVideoUrl(rawUrl = '') {
  const trimmed = (rawUrl || '').trim();
  if (!trimmed) {
    return 'https://www.youtube.com/embed/w7ejDZ8SWv8';
  }

  const youtubeId = extractYouTubeId(trimmed);
  if (youtubeId) {
    return `https://www.youtube.com/embed/${youtubeId}`;
  }

  return trimmed;
}

export async function getVideos(req, res) {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
}

export async function getVideoById(req, res) {
  try {
    const video = await Video.findById(req.params.videoId).lean();
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    const comments = await Comment.find({ videoId: req.params.videoId })
      .populate('userId', 'username')
      .sort({ createdAt: -1 });

    res.json({ ...video, comments });
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
}

export async function createVideo(req, res) {
  try {
    const { title, description, category, thumbnailUrl, videoUrl, channelId } = req.body;

    if (!channelId) {
      return res.status(400).json({ message: 'Channel ID is required' });
    }

    const channel = await Channel.findById(channelId);
    if (!channel || String(channel.owner) !== String(req.user._id)) {
      return res.status(403).json({ message: 'Not allowed' });
    }

    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'Video title is required' });
    }

    const video = await Video.create({
      title: title.trim(),
      description: description?.trim() || '',
      category: category?.trim() || 'General',
      thumbnailUrl: thumbnailUrl?.trim() || 'https://via.placeholder.com/320x180?text=Thumbnail',
      videoUrl: normalizeVideoUrl(videoUrl),
      channelId,
      uploader: req.user._id,
      channelName: channel.channelName
    });

    channel.videos.push(video._id);
    await channel.save();

    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
}

export async function updateVideo(req, res) {
  try {
    const video = await Video.findById(req.params.videoId);
    if (!video || String(video.uploader) !== String(req.user._id)) {
      return res.status(403).json({ message: 'Not allowed' });
    }

    const nextData = { ...req.body };
    if (Object.prototype.hasOwnProperty.call(nextData, 'videoUrl')) {
      nextData.videoUrl = normalizeVideoUrl(nextData.videoUrl);
    }

    Object.assign(video, nextData);
    await video.save();

    res.json(video);
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
}

export async function deleteVideo(req, res) {
  try {
    const video = await Video.findById(req.params.videoId);
    if (!video || String(video.uploader) !== String(req.user._id)) {
      return res.status(403).json({ message: 'Not allowed' });
    }

    await Channel.findByIdAndUpdate(video.channelId, { $pull: { videos: video._id } });
    await Comment.deleteMany({ videoId: req.params.videoId });
    await video.deleteOne();

    res.json({ message: 'Video deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
}

export async function reactToVideo(req, res) {
  try {
    const { type } = req.body;
    const update = type === 'like' ? { $inc: { likes: 1 } } : { $inc: { dislikes: 1 } };
    const video = await Video.findByIdAndUpdate(req.params.videoId, update, { new: true });

    res.json(video);
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
}
