import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Home() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/jobs").then(res => setJobs(res.data));
  }, []);

  return (
    <div className="container">
      <h2>Jobs</h2>

      {jobs.map(job => (
        <div className="card" key={job._id}>
          <h3>{job.title}</h3>
          <p>{job.company}</p>
          <p>{job.location}</p>

          <button className="btn" onClick={() => navigate(`/job/${job._id}`)}>
            View
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;