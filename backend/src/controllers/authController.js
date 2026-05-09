import bcrypt from "bcryptjs";
import validator from "validator";
import User from "../models/User.js";
import Channel from "../models/Channel.js";
import { generateToken } from "../utils/generateToken.js";

export async function register(req, res) {
  const { username, email, password } = req.body;
  if (!username || username.trim().length < 3)
    return res
      .status(400)
      .json({ message: "Username must be at least 3 characters" });
  if (!validator.isEmail(email || ""))
    return res.status(400).json({ message: "Please enter a valid email" });
  if (!password || password.length < 6)
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters" });
  const exists = await User.findOne({ email });
  if (exists)
    return res.status(409).json({ message: "Email already registered" });
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, password: hashedPassword });
  const channel = await Channel.create({
    channelName: `${username}'s Channel`,
    owner: user._id,
    description: `Welcome to ${username}'s channel`,
    channelBanner:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
  });
  user.channels = [channel._id];
  await user.save();
  res.status(201).json({ message: "Registration successful. Please login." });
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).populate("channels");
  if (!user)
    return res.status(401).json({ message: "Invalid email or password" });
  const matches = await bcrypt.compare(password, user.password);
  if (!matches)
    return res.status(401).json({ message: "Invalid email or password" });
  const token = generateToken(user);
  res.json({
    token,
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
      channelId: user.channels?.[0]?._id || null,
    },
  });
}
