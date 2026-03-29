import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  job: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
  status: {
    type: String,
    enum: ["pending", "shortlisted", "rejected"],
    default: "pending"
  }
}, { timestamps: true });

export default mongoose.model("Application", applicationSchema);