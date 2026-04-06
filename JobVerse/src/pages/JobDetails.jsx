import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import "../styles/JobDetails.css";

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    API.get(`/jobs/${id}`).then(res => setJob(res.data));
  }, [id]);

  const applyJob = async () => {
    try {
      await API.post(`/jobs/apply/${id}`);
      alert("Applied Successfully ✅");
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  if (!job) return <h2>Loading...</h2>;

  return (
    <div className="job-details-container">

      <div className="job-main">

        <h1>{job.title}</h1>

        <div className="top-info">
          <p>{job.company}</p>
          <p>{job.location}</p>
        </div>

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

        <div className="section">
          <h3>Job Description</h3>
          <p>{job.description || "No description provided"}</p>
        </div>

        <div className="section">
          <h3>Requirements</h3>
          <p>{job.requirements || "No requirements listed"}</p>
        </div>

        <button className="apply-btn" onClick={applyJob}>
          Apply Now
        </button>

      </div>

    </div>
  );
}