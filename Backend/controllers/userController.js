import User from "../models/User.js";

export const uploadFiles = async (req, res) => {
  const userId = req.user.id;

  const resume = req.files["resume"]?.[0]?.path;
  const profilePic = req.files["profilePic"]?.[0]?.path;

  const user = await User.findByIdAndUpdate(
    userId,
    { resume, profilePic },
    { new: true }
  );

  res.json(user);
};