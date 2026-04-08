import express from "express";
import { protect, authorize } from "../middleware/authMiddleware.js";
import {
  createJob,
  getJobs,
  applyJob,
  getMyJobs,
  updateApplicationStatus,
  getAppliedJobs,
  getJobById ,
   deleteJob,
  markFilled,
  withdrawApplication
} from "../controllers/jobController.js";






const router = express.Router();

router.post("/", protect, authorize("admin", "recruiter"), createJob);

router.get("/applied", protect, authorize("user"), getAppliedJobs); // 👈 TOP pe rakho

router.get("/my-jobs", protect, authorize("recruiter"), getMyJobs);

router.put("/application/:appId", protect, authorize("recruiter"), updateApplicationStatus);

router.post("/apply/:id", protect, authorize("user"), applyJob);

router.get("/", getJobs);
router.get("/:id", getJobById);
router.delete("/:id", protect, deleteJob);
router.put("/close/:id", protect, markFilled);
router.delete("/withdraw/:id", protect, withdrawApplication);


export default router;