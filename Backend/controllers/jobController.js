import Job from "../models/Job.js";
import Application from "../models/Application.js";

// CREATE JOB
export const createJob = async (req, res) => {
  try {
    const job = await Job.create({
      ...req.body,
      createdBy: req.user.id
    });

    res.json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL JOBS
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET JOB BY ID (IMPORTANT FOR VIEW DETAILS)
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// APPLY JOB
export const applyJob = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ CHECK JOB EXISTS
    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // ✅ BLOCK IF FILLED
    if (job.isFilled) {
      return res.status(400).json({
        message: "Position already filled ❌"
      });
    }

    // ✅ CHECK ALREADY APPLIED
    const exist = await Application.findOne({
      job: id,
      user: req.user.id
    });

    if (exist) {
      return res.status(400).json({
        message: "Already applied"
      });
    }

    // ✅ CREATE APPLICATION
    const application = await Application.create({
      job: id,
      user: req.user.id,
      status: "pending"
    });

    res.json(application);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ IMPORTANT: Recruiter Dashboard (FULL USER DATA)
export const getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ createdBy: req.user.id });

    const result = await Promise.all(
      jobs.map(async (job) => {
        const applicants = await Application.find({ job: job._id })
          .populate("user"); // 👈 FULL USER DATA (IMPORTANT FIX)

        return {
          ...job._doc,
          applicants
        };
      })
    );

    res.json(result);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE STATUS
export const updateApplicationStatus = async (req, res) => {
  try {
    const { appId } = req.params;
    const { status } = req.body;

    const app = await Application.findByIdAndUpdate(
      appId,
      { status },
      { new: true }
    );

    res.json(app);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// USER APPLIED JOBS
export const getAppliedJobs = async (req, res) => {
  try {
    const applications = await Application.find({
      user: req.user.id
    }).populate("job");

    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// ✅ DELETE JOB
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await job.deleteOne();

    res.json({ message: "Job removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ MARK POSITION FILLED
export const markFilled = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // ✅ only recruiter who created can close
    if (job.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    job.status = "closed";
    await job.save();

    res.json({ message: "Job marked as filled", job });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ WITHDRAW APPLICATION (candidate)
export const withdrawApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await Application.findOne({
      job: id,
      user: req.user.id
    });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    await application.deleteOne();

    res.json({ message: "Application withdrawn successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};