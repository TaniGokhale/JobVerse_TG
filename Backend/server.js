import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* STATIC FILES (IMPORTANT 🔥) */
app.use("/uploads", express.static("uploads"));

/* ROUTES */
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/user", userRoutes);

/* ERROR HANDLER */
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

/* DB CONNECT */
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB Connected");
    app.listen(5000, () => console.log("Server running on 5000"));
  })
  .catch(err => console.log(err));