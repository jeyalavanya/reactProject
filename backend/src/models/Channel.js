import mongoose from "mongoose";

const channelSchema = new mongoose.Schema(
  {
    channelName: { type: String, required: true, trim: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: { type: String, default: "" },
    channelBanner: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80",
    },
    subscribers: { type: Number, default: 0 },
    videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
  },
  { timestamps: true },
);

export default mongoose.model("Channel", channelSchema);
