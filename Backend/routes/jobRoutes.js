import express from "express";
import { protect, authorize } from "../middleware/authMiddleware.js";
import { createJob, getJobs, applyJob } from "../controllers/jobController.js";

const router = express.Router();

router.post("/", protect, authorize("admin", "recruiter"), createJob);
router.get("/", getJobs);
router.post("/apply/:id", protect, authorize("user"), applyJob);

export default router;