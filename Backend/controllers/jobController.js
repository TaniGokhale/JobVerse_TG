import Job from "../models/Job.js";
import Application from "../models/Application.js";

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

export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("createdBy", "name email");
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const applyJob = async (req, res) => {
  try {
    const { id } = req.params;

    const exist = await Application.findOne({
      job: id,
      user: req.user.id
    });

    if (exist) {
      return res.status(400).json({ message: "Already applied" });
    }

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

export const getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ createdBy: req.user.id });

    const result = await Promise.all(
      jobs.map(async (job) => {
        const applicants = await Application.find({ job: job._id })
          .populate("user", "name email");

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

export const updateApplicationStatus = async (req, res) => {
  try {
    const { appId } = req.params;
    const { status } = req.body;

    const app = await Application.findByIdAndUpdate(
      appId,
      { status },
      { returnDocument: "after" }
    );

    res.json(app);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const applications = await Application.find({ user: req.user.id })
      .populate("job");

    res.json(applications);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};