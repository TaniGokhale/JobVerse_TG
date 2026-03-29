import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css"


export default function Home() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/jobs").then(res => setJobs(res.data));
  }, []);

  return (
    <div className="home-container">

      <h2>Find Your Dream Job</h2>

      <div className="job-list">
        {jobs.map(job => (
          <div className="job-card-indeed" key={job._id}>
            
            <div className="job-header">
              <h3>{job.title}</h3>
              <span className="badge">New</span>
            </div>

            <p className="company">{job.company}</p>
            <p className="location">{job.location}</p>

            <button onClick={() => navigate(`/job/${job._id}`)}>
              View Details
            </button>

          </div>
        ))}
      </div>

    </div>
  );
}