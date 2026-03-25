import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const exist = await User.findOne({ email });
    if (exist) {
      const err = new Error("User already exists");
      err.status = 400;
      return next(err);
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      role
    });

    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      const err = new Error("User not found");
      err.status = 400;
      return next(err);
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      const err = new Error("Invalid credentials");
      err.status = 400;
      return next(err);
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    );

    res.json({ token, user });
  } catch (error) {
    next(error);
  }
};