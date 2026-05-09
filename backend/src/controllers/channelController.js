import Channel from "../models/Channel.js";

export async function getChannel(req, res) {
  const { channelId } = req.params;
  let queryId = channelId;
  if (channelId === "me") {
    const ownChannel = await Channel.findOne({ owner: req.user._id }).populate(
      "videos",
    );
    return res.json(ownChannel);
  }
  const channel = await Channel.findById(queryId).populate("videos");
  res.json(channel);
}

export async function createChannel(req, res) {
  const channel = await Channel.create({ ...req.body, owner: req.user._id });
  res.status(201).json(channel);
}
