import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,

  // 👉 NEW FIELDS
  description: String,       // JD
  requirements: String,
  salary: String,
  experience: String,
  jobType: String,          // Full-time, Part-time
  skills: String,


  status: {
    type: String,
    enum: ["open", "closed"],
    default: "open"
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

export default mongoose.model("Job", jobSchema);