import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["user", "recruiter"],
    default: "user"
  },
  contact: String,
  location: String,
  experience: String,
  currentCompany: String,
  resume: String,
  profilePic: String
}, { timestamps: true });

export default mongoose.model("User", userSchema);