import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMidddleware.js";
import User from "../models/User.js";

const router = express.Router();

/*
========================================
👉 UPDATE PROFILE (TEXT + FILES)
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

      // 👉 fields safely extract
      const {
        name,
        email,
        contact,
        location,
        experience,
        currentCompany
      } = req.body;

      // 👉 file handling
      const resume = req.files?.resume?.[0]?.path;
      const profilePic = req.files?.profilePic?.[0]?.path;

      // 👉 only update provided fields
      const updateData = {
        ...(name && { name }),
        ...(email && { email }),
        ...(contact && { contact }),
        ...(location && { location }),
        ...(experience && { experience }),
        ...(currentCompany && { currentCompany }),
        ...(resume && { resume }),
        ...(profilePic && { profilePic })
      };

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        updateData,
        { returnDocument: "after" }
      );

      res.json(updatedUser);

    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

/*
========================================
👉 GET CURRENT USER PROFILE
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