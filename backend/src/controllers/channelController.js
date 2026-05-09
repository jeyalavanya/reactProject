import Channel from "../models/Channel.js";
import User from "../models/User.js";

export async function getChannel(req, res) {
  try {
    const { channelId } = req.params;

    if (!channelId) {
      const ownChannel = await Channel.findOne({ owner: req.user._id }).populate("videos");
      if (!ownChannel) {
        return res.status(404).json({ message: "Channel not found" });
      }
      return res.json(ownChannel);
    }

    const channel = await Channel.findById(channelId).populate("videos");
    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    res.json(channel);
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
}

export async function createChannel(req, res) {
  try {
    const existing = await Channel.findOne({ owner: req.user._id });
    if (existing) {
      return res.status(409).json({ message: "Channel already exists for this user" });
    }

    const channel = await Channel.create({ ...req.body, owner: req.user._id });
    await User.findByIdAndUpdate(req.user._id, { $push: { channels: channel._id } });

    res.status(201).json(channel);
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
}
