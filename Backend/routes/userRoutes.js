import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMidddleware.js";
import { uploadFiles } from "../controllers/userController.js";

const router = express.Router();

router.post(
  "/upload",
  protect,
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "profilePic", maxCount: 1 }
  ]),
  uploadFiles
);

export default router;