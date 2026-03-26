import { useEffect, useState } from "react";
import API from "../services/api";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/jobs").then(res => setJobs(res.data));
  }, []);



  const apply = async (id) => {
  await API.post(`/jobs/apply/${id}`);
  alert("Applied Successfully");
};
  return (
    <div className="container">
      <h2>Explore Jobs</h2>

      {jobs.map(job => (
        <motion.div
          className="card"
          key={job._id}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <h3>{job.title}</h3>
          <p>{job.company}</p>
          <button className="btn" onClick={() => navigate(`/job/${job._id}`)}>
            View Details
          </button>
        </motion.div>
      ))}
    </div>
  );
}