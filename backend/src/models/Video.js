import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: 'No description provided'
    },
    channelName: {
      type: String,
      required: true
    },
    thumbnailUrl: {
      type: String,
      required: true
    },
    videoUrl: {
      type: String,
      default: 'https://example.com/video.mp4'
    },
    category: {
      type: String,
      required: true
    },
    views: {
      type: Number,
      default: 0
    },
    likes: {
      type: Number,
      default: 0
    },
    dislikes: {
      type: Number,
      default: 0
    },
    userLikes: {
      type: [mongoose.Schema.Types.ObjectId],
      default: []
    },
    userDislikes: {
      type: [mongoose.Schema.Types.ObjectId],
      default: []
    }
  },
  { timestamps: true }
);

export default mongoose.model('Video', videoSchema);
