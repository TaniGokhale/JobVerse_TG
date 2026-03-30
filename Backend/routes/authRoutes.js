import express from "express";
import upload from "../middleware/uploadMidddleware.js";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

router.post(
  "/register",
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "profilePic", maxCount: 1 }
  ]),
  register
);

router.post("/login", login);

export default router;