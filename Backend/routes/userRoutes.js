import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMidddleware.js";
import User from "../models/User.js";

const router = express.Router();

/*
========================================
👉 UPDATE PROFILE (FINAL FIXED)
========================================
*/
router.put(
  "/profile",
  protect,
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "profilePic", maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      const userId = req.user.id;

      console.log("BODY:", req.body);
      console.log("FILES:", req.files);

      const {
        name,
        email,
        contact,
        location,
        experience,
        currentCompany
      } = req.body;

      const updateData = {};

      if (name) updateData.name = name;
      if (email) updateData.email = email;
      if (contact) updateData.contact = contact;
      if (location) updateData.location = location;
      if (experience) updateData.experience = experience;
      if (currentCompany) updateData.currentCompany = currentCompany;

      // ✅ FILE SAFE HANDLE
      if (req.files?.resume) {
        updateData.resume = req.files.resume[0].path;
      }

      if (req.files?.profilePic) {
        updateData.profilePic = req.files.profilePic[0].path;
      }

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        updateData,
        { new: true } // IMPORTANT FIX
      );

      res.json(updatedUser);

    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  }
);

/*
========================================
👉 GET PROFILE (for refresh)
========================================
*/
router.get("/me", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;