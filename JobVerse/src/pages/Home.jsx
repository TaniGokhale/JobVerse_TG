import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    API.get("/jobs").then(res => {
      setJobs(res.data);
      setFilteredJobs(res.data);
    });
  }, []);

  const filterJobs = () => {
    let result = jobs;

    if (search) {
      result = result.filter(j =>
        j.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (location) {
      result = result.filter(j =>
        j.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    setFilteredJobs(result);
  };

  return (
    <div className="home-wrapper">

      {/* LEFT FILTER */}
      <div className="filter-panel">

        <h3>Filters</h3>

        <input
          placeholder="Job title"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <input
          placeholder="Location"
          value={location}
          onChange={e => setLocation(e.target.value)}
        />

        <button onClick={filterJobs}>Search</button>

      </div>

      {/* RIGHT JOB LIST */}
      <div className="job-section">

        <h2>Find Your Dream Job</h2>

        <div className="job-grid">
          {filteredJobs.map(job => (
            <div className="job-card" key={job._id}>

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

    </div>
  );
}