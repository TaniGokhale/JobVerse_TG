import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/RecruiterDashboard.css";

export default function RecruiterDashboard() {
  const [jobs, setJobs] = useState([]);
  const [job, setJob] = useState({});
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const res = await API.get("/jobs/my-jobs");
    setJobs(res.data);
  };

  const createJob = async () => {
    await API.post("/jobs", job);
    setShowForm(false);
    fetchJobs();
    alert("Job Posted");
  };

  const updateStatus = async (id, status) => {
    await API.put(`/jobs/application/${id}`, { status });
    fetchJobs();
  };

  return (
    <div className="dashboard">

      <div className="sidebar">
        <h3>Recruiter</h3>
        <p>Post Job</p>
        <p>Applications</p>
      </div>

      <div className="main">

        <div className="card">
          <div className="card-header">
            <h2>Jobs</h2>
            <button onClick={() => setShowForm(!showForm)}>Post</button>
          </div>

          {showForm && (
            <div className="form">
              <input placeholder="Title" onChange={e => setJob({...job, title: e.target.value})} />
              <input placeholder="Company" onChange={e => setJob({...job, company: e.target.value})} />
              <input placeholder="Location" onChange={e => setJob({...job, location: e.target.value})} />
              <button onClick={createJob}>Create</button>
            </div>
          )}

          {jobs.map(job => (
            <div className="job-card" key={job._id}>
              <h3>{job.title}</h3>
              <p>{job.company}</p>

              <h4>Applicants</h4>

              {job.applicants.map(app => (
                <div className="applicant" key={app._id}>
                  <p>{app.user.name}</p>
                  <p>Status: {app.status || "under process"}</p>

                  <button onClick={() => updateStatus(app._id, "shortlisted")}>
                    Accept
                  </button>

                  <button onClick={() => updateStatus(app._id, "rejected")}>
                    Reject
                  </button>
                </div>
              ))}
            </div>
          ))}

        </div>

      </div>

    </div>
  );
}