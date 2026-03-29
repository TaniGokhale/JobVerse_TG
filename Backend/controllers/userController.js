import User from "../models/User.js";

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      req.body,
      { returnDocument: "after" }
    );

    res.json(user);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};