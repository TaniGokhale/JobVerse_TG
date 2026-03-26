import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState({});

  useEffect(() => {
    API.get("/jobs").then(res => {
      const found = res.data.find(j => j._id === id);
      setJob(found);
    });
  }, [id]);

  const apply = async () => {
    await API.post(`/jobs/apply/${id}`);
    alert("Applied");
  };

  return (
    <div className="container">
      <div className="card">
        <h2>{job.title}</h2>
        <p>{job.company}</p>
        <p>{job.location}</p>
        <p>{job.description}</p>
        <button className="btn" onClick={apply}>Apply</button>
      </div>
    </div>
  );
}