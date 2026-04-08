import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");

  // 🔥 salary range
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");

  const [sort, setSort] = useState("latest");

  const navigate = useNavigate();

  useEffect(() => {
    API.get("/jobs").then(res => {
      setJobs(res.data);
      setFilteredJobs(res.data);
    });
  }, []);

  // 🔥 salary parser (fix for "3.0 LPA")
  const parseSalary = (salary) => {
    if (!salary) return 0;
    return Number(salary.toString().replace(/[^0-9.]/g, ""));
  };

  // 🔥 LIVE FILTER
  useEffect(() => {
    let result = [...jobs];

    // search
    if (search) {
      result = result.filter(j =>
        j.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // location
    if (location) {
      result = result.filter(j =>
        j.location?.toLowerCase().includes(location.toLowerCase())
      );
    }

    // experience
    if (experience) {
      result = result.filter(j =>
        j.experience?.toLowerCase().includes(experience.toLowerCase())
      );
    }

    // 🔥 salary range filter
    if (minSalary) {
      result = result.filter(j =>
        parseSalary(j.salary) >= Number(minSalary)
      );
    }

    if (maxSalary) {
      result = result.filter(j =>
        parseSalary(j.salary) <= Number(maxSalary)
      );
    }

    // 🔥 SORT
    if (sort === "latest") {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    if (sort === "salary") {
      result.sort((a, b) => parseSalary(b.salary) - parseSalary(a.salary));
    }

    if (sort === "relevance") {
      result.sort((a, b) => {
        let scoreA = 0;
        let scoreB = 0;

        if (search) {
          if (a.title.toLowerCase().includes(search.toLowerCase())) scoreA += 2;
          if (b.title.toLowerCase().includes(search.toLowerCase())) scoreB += 2;
        }

        if (location) {
          if (a.location?.toLowerCase().includes(location.toLowerCase())) scoreA += 1;
          if (b.location?.toLowerCase().includes(location.toLowerCase())) scoreB += 1;
        }

        return scoreB - scoreA;
      });
    }

    setFilteredJobs(result);

  }, [search, location, experience, minSalary, maxSalary, sort, jobs]);

  return (
    <div className="home-wrapper">

      {/* FILTER */}
      <div className="filter-panel">

        <h3>Filters</h3>

        <input
          placeholder="Search job..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <input
          placeholder="Location"
          value={location}
          onChange={e => setLocation(e.target.value)}
        />

        <input
          placeholder="Experience (e.g. 1 year)"
          value={experience}
          onChange={e => setExperience(e.target.value)}
        />

        {/* 🔥 SALARY RANGE */}
        <input
          type="number"
          placeholder="Min Salary"
          value={minSalary}
          onChange={e => setMinSalary(e.target.value)}
        />

        <input
          type="number"
          placeholder="Max Salary"
          value={maxSalary}
          onChange={e => setMaxSalary(e.target.value)}
        />

        {/* SORT */}
        <select value={sort} onChange={e => setSort(e.target.value)}>
          <option value="latest">Latest</option>
          <option value="salary">Highest Salary</option>
          <option value="relevance">Relevance</option>
        </select>

      </div>

      {/* JOB LIST */}
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

              <p className="extra">
                💼 {job.experience || "Fresher"} | 💰 ₹{job.salary || "N/A"}
              </p>

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