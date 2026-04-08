import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import "../styles/JobDetails.css";

export default function JobDetails() {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      const res = await API.get(`/jobs/${id}`);
      setJob(res.data);

      // 👉 check already applied
      const appliedRes = await API.get("/jobs/applied");
      const already = appliedRes.data.find(
        (a) => a.job?._id === id
      );

      setApplied(!!already);

    } catch (err) {
      console.log(err);
    }
  };

  // ✅ APPLY
  const applyJob = async () => {
    try {
      await API.post(`/jobs/apply/${id}`);
      alert("Applied Successfully ✅");
      setApplied(true);
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  // ✅ WITHDRAW
  const withdrawJob = async () => {
    try {
      await API.delete(`/jobs/withdraw/${id}`);
      alert("Application Withdrawn ❌");
      setApplied(false);
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  if (!job) return <h2 className="loading">Loading...</h2>;

  return (
    <div className="job-details-container">

      <div className="job-main">

        {/* TITLE */}
        <h1>{job.title}</h1>

        {/* TOP INFO */}
        <div className="top-info">
          <p>{job.company}</p>
          <p>{job.location}</p>
        </div>

        {/* STATUS BADGE */}
        {job.isFilled && (
          <span className="filled-badge">Position Filled ❌</span>
        )}

        {/* GRID */}
        <div className="info-grid">
          <div>
            <h4>Salary</h4>
            <p>{job.salary || "Not Disclosed"}</p>
          </div>

          <div>
            <h4>Experience</h4>
            <p>{job.experience || "0-2 Years"}</p>
          </div>

          <div>
            <h4>Role</h4>
            <p>{job.role || job.title}</p>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="section">
          <h3>Job Description</h3>
          <p>{job.description || "No description provided"}</p>
        </div>

        {/* REQUIREMENTS */}
        <div className="section">
          <h3>Requirements</h3>
          <p>{job.requirements || "No requirements listed"}</p>
        </div>

        {/* ✅ BUTTON LOGIC FINAL */}
        {job.isFilled ? (
          <button className="apply-btn disabled">
            Position Filled ❌
          </button>
        ) : applied ? (
          <button className="withdraw-btn" onClick={withdrawJob}>
            Withdraw Application ❌
          </button>
        ) : (
          <button className="apply-btn" onClick={applyJob}>
            Apply Now
          </button>
        )}

      </div>

    </div>
  );
}