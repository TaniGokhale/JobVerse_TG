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