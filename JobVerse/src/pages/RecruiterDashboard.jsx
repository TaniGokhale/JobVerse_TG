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
    try {
      const res = await API.get("/jobs/my-jobs");
      setJobs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ CREATE JOB (with validation)
  const createJob = async () => {
    if (!job.title || !job.company || !job.location) {
      return alert("Please fill required fields ⚠️");
    }

    try {
      await API.post("/jobs", job);
      setShowForm(false);
      setJob({});
      fetchJobs();
      alert("Job Posted ✅");
    } catch (err) {
      alert("Error posting job ❌");
    }
  };

  // ✅ DELETE JOB
  const handleDelete = async (id) => {
    if (window.confirm("Delete this job?")) {
      await API.delete(`/jobs/${id}`);
      fetchJobs();
    }
  };

  // ✅ MARK FILLED
  const handleClose = async (id) => {
    await API.put(`/jobs/close/${id}`);
    fetchJobs();
  };

  // ✅ UPDATE STATUS
  const updateStatus = async (id, status) => {
    await API.put(`/jobs/application/${id}`, { status });
    fetchJobs();
  };

  return (
    <div className="dashboard">

      {/* SIDEBAR */}
      <div className="sidebar">
        <h2 className="logo">JobVerse</h2>

        <p onClick={() => setShowForm(true)}>➕ Post Job</p>
        <p onClick={() => setShowForm(false)}>📄 My Jobs</p>
      </div>

      {/* MAIN */}
      <div className="main">

        {/* EMPTY STATE */}
        {!showForm && jobs.length === 0 && (
          <div className="empty-state">
            <h2>🚀 Welcome Recruiter</h2>
            <p>No jobs posted yet</p>

            <button onClick={() => setShowForm(true)}>
              ➕ Post Your First Job
            </button>
          </div>
        )}

        {/* JOB FORM */}
        {showForm && (
          <div className="job-form">

            <h2>Post New Job</h2>

            <div className="form-grid">

              <input
                placeholder="Job Title"
                value={job.title || ""}
                onChange={e => setJob({ ...job, title: e.target.value })}
              />

              <input
                placeholder="Company"
                value={job.company || ""}
                onChange={e => setJob({ ...job, company: e.target.value })}
              />

              <input
                placeholder="Location"
                value={job.location || ""}
                onChange={e => setJob({ ...job, location: e.target.value })}
              />

              <input
                placeholder="Salary (e.g. 3-6 LPA)"
                value={job.salary || ""}
                onChange={e => setJob({ ...job, salary: e.target.value })}
              />

              <input
                placeholder="Experience"
                value={job.experience || ""}
                onChange={e => setJob({ ...job, experience: e.target.value })}
              />

              <input
                placeholder="Role"
                value={job.role || ""}
                onChange={e => setJob({ ...job, role: e.target.value })}
              />

            </div>

            <textarea
              placeholder="Job Description"
              value={job.description || ""}
              onChange={e => setJob({ ...job, description: e.target.value })}
            />

            <textarea
              placeholder="Requirements"
              value={job.requirements || ""}
              onChange={e => setJob({ ...job, requirements: e.target.value })}
            />

            <div className="form-actions">
              <button onClick={createJob}>🚀 Post Job</button>
              <button className="cancel" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>

          </div>
        )}

        {/* JOB LIST */}
        {!showForm && (
          <div className="job-grid">

            {jobs.map(job => (
              <div className="job-card" key={job._id}>

                <h3>{job.title}</h3>
                <p>{job.company}</p>
                <p>{job.location}</p>

                <span className={`status ${job.status}`}>
                  {job.status === "closed" ? "Position Filled" : "Open"}
                </span>

                {/* ACTIONS */}
                <div className="job-actions">

                  <button
  disabled={job.status === "closed"}
  onClick={() => handleClose(job._id)}
>
  {job.status === "closed" ? "Filled" : "Mark Filled"}
</button>

                  <button
                    className="delete"
                    onClick={() => handleDelete(job._id)}
                  >
                    Delete
                  </button>

                </div>

                {/* APPLICANTS */}
                <h4>Applicants ({job.applicants.length})</h4>

                {job.applicants.map(app => (
                  <div className="applicant-card" key={app._id}>

                    <h4>{app.user?.name}</h4>
                    <p>{app.user?.email}</p>
                    <p>{app.user?.contact}</p>
                    <p>{app.user?.location}</p>

                    {app.user?.resume && (
                      <a href={app.user.resume} target="_blank">
                        📄 Resume
                      </a>
                    )}

                    <p className={`status ${app.status}`}>
                      {app.status}
                    </p>

                    <div className="btn-group">
                      <button onClick={() => updateStatus(app._id, "shortlisted")}>
                        Accept
                      </button>

                      <button onClick={() => updateStatus(app._id, "rejected")}>
                        Reject
                      </button>
                    </div>

                  </div>
                ))}

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}