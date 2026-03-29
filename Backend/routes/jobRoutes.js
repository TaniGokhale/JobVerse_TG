import express from "express";
import { protect, authorize } from "../middleware/authMiddleware.js";
import {
  createJob,
  getJobs,
  applyJob,
  getMyJobs,
  updateApplicationStatus
} from "../controllers/jobController.js";

const router = express.Router();

router.post("/", protect, authorize("admin", "recruiter"), createJob);
router.get("/", getJobs);
router.post("/apply/:id", protect, authorize("user"), applyJob);
router.get("/my-jobs", protect, authorize("recruiter"), getMyJobs);
router.put("/application/:appId", protect, authorize("recruiter"), updateApplicationStatus);
router.get("/applied", protect, authorize("user"), getAppliedJobs);


export default router;