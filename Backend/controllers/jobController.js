import Job from "../models/Job.js";
import Application from "../models/Application.js";

export const createJob = async (req, res, next) => {
  try {
    const job = await Job.create({
      ...req.body,
      createdBy: req.user.id
    });
    res.json(job);
  } catch (error) {
    next(error);
  }
};



export const getMyJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.id });

  const jobsWithApplicants = await Promise.all(
    jobs.map(async (job) => {
      const applications = await Application.find({ job: job._id })
        .populate("user", "name email resume profilePic");

      return {
        ...job._doc,
        applicants: applications
      };
    })
  );

  res.json(jobsWithApplicants);
};



export const getJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find().populate("createdBy", "name");
    res.json(jobs);
  } catch (error) {
    next(error);
  }
};

export const applyJob = async (req, res, next) => {
  try {
    const existing = await Application.findOne({
      user: req.user.id,
      job: req.params.id
    });

    if (existing) {
      const err = new Error("Already applied");
      err.status = 400;
      return next(err);
    }

    const application = await Application.create({
      user: req.user.id,
      job: req.params.id
    });

    res.json(application);
  } catch (error) {
    next(error);
  }
};