import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      contact,
      location,
      experience,
      currentCompany
    } = req.body;

    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      role,
      contact,
      location,
      experience,
      currentCompany,
      resume: req.files?.resume?.[0]?.filename || "",
      profilePic: req.files?.profilePic?.[0]?.filename || ""
    });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    );

    res.json({ token, user });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};