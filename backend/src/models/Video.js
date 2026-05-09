import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  thumbnailUrl: { type: String, required: true },
  videoUrl: { type: String, required: true },
  description: { type: String, default: '' },
  category: { type: String, required: true },
  channelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Channel', required: true },
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  channelName: { type: String, required: true },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  uploadDate: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Video', videoSchema);
