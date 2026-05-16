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

// Update channel
export async function updateChannel(req, res) {
  try {
    const { channelId } = req.params;
    const { channelName, description, channelBanner } = req.body;

    const channel = await Channel.findById(channelId);
    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    if (channel.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this channel" });
    }

    if (channelName) channel.channelName = channelName;
    if (description) channel.description = description;
    if (channelBanner) channel.channelBanner = channelBanner;

    await channel.save();
    res.json(channel);
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
}

// Delete channel
export async function deleteChannel(req, res) {
  try {
    const { channelId } = req.params;

    const channel = await Channel.findById(channelId);
    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    if (channel.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this channel" });
    }

    // Remove channel reference from user
    await User.findByIdAndUpdate(channel.owner, { $pull: { channels: channelId } });

    // Delete all videos in the channel
    const Video = require("../models/Video.js").default;
    await Video.deleteMany({ _id: { $in: channel.videos } });

    // Delete the channel
    await Channel.findByIdAndDelete(channelId);

    res.json({ message: "Channel deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
}
