import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/Dashboard.css"
export default function Dashboard() {
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
  };

  const updateStatus = async (id, status) => {
    await API.put(`/jobs/application/${id}`, { status });
    fetchJobs();
  };

  return (
    <div className="recruiter-container">

      <div className="header">
        <h2>Recruiter Dashboard</h2>
        <button className="btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Close" : "Post Job"}
        </button>
      </div>

      {showForm && (
        <div className="job-form">
          <input placeholder="Job Title" onChange={e => setJob({...job, title: e.target.value})} />
          <input placeholder="Company" onChange={e => setJob({...job, company: e.target.value})} />
          <input placeholder="Location" onChange={e => setJob({...job, location: e.target.value})} />

          <button className="btn" onClick={createJob}>Post Job</button>
        </div>
      )}

      <div className="job-grid">
        {jobs.map(job => (
          <div className="job-card" key={job._id}>
            <h3>{job.title}</h3>
            <p>{job.company}</p>
            <p>{job.location}</p>

            <h4>Applicants ({job.applicants.length})</h4>

            {job.applicants.map(app => (
              <div className="applicant-card" key={app._id}>
                <p>{app.user.name}</p>
                <p>{app.user.email}</p>
                <p>Status: {app.status}</p>

                <div className="btn-group">
                  <button onClick={() => updateStatus(app._id, "shortlisted")}>Shortlist</button>
                  <button onClick={() => updateStatus(app._id, "rejected")}>Reject</button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

    </div>
  );
}