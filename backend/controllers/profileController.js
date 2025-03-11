import User from "../models/User.js";
import asyncHandler from "../middlewares/asyncHandler.js";

// GET /api/v1/users/profiles
export const getUserProfiles = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }
  res.json(user.profiles);
});

// POST /api/v1/users/profiles
export const createUserProfile = asyncHandler(async (req, res) => {
  const { name, avatar, preferences } = req.body;
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }

  const newProfile = { name, avatar, preferences };
  user.profiles.push(newProfile);
  await user.save();

  res.status(201).json(user.profiles);
});

// PUT /api/v1/users/profiles/:profileId
export const updateUserProfile = asyncHandler(async (req, res) => {
  const { profileId } = req.params;
  const { name, avatar, preferences } = req.body;

  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }

  const profile = user.profiles.id(profileId);
  if (!profile) {
    res.status(404);
    throw new Error("Profile not found.");
  }

  profile.name = name || profile.name;
  profile.avatar = avatar || profile.avatar;
  profile.preferences = preferences || profile.preferences;

  await user.save();
  res.json(user.profiles);
});

// DELETE /api/v1/users/profiles/:profileId
export const deleteUserProfile = asyncHandler(async (req, res) => {
  const { profileId } = req.params;
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }

  const profile = user.profiles.id(profileId);
  if (!profile) {
    res.status(404);
    throw new Error("Profile not found.");
  }

  user.profiles.pull(profileId);
  await user.save();

  res.json(user.profiles);
});

export const switchActiveProfile = asyncHandler(async (req, res) => {
  const { profileId } = req.body;
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }
  const profile = user.profiles.id(profileId);
  if (!profile) {
    res.status(404);
    throw new Error("Profile not found.");
  }
  user.activeProfile = profileId;
  await user.save();
  res.json({ activeProfile: profile, profiles: user.profiles });
});
