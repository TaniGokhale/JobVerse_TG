import { useEffect, useState } from "react";
import API from "../services/api";
import UserDashboard from "../pages/UserDashboard";
export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [jobs, setJobs] = useState([]);
  const [job, setJob] = useState({});

  useEffect(() => {
    if (user?.role === "recruiter") {
      API.get("/jobs/my-jobs").then(res => setJobs(res.data));
    }
  }, []);

  const createJob = async () => {
    await API.post("/jobs", job);
    alert("Job Created");
  };

  const updateStatus = async (id, status) => {
    await API.put(`/jobs/application/${id}`, { status });
    const res = await API.get("/jobs/my-jobs");
    setJobs(res.data);
  };

  return (
    <div className="container">
      {user?.role === "recruiter" && (
        <>
          <div className="card">
            <h2>Create Job</h2>

            <input placeholder="Title" onChange={e => setJob({...job, title: e.target.value})} />
            <input placeholder="Company" onChange={e => setJob({...job, company: e.target.value})} />

            <button className="btn" onClick={createJob}>Post Job</button>
          </div>

          <h2>Your Jobs</h2>

          {jobs.map(j => (
            <div className="card" key={j._id}>
              <h3>{j.title}</h3>
              <p>{j.company}</p>

              <h4>Applicants ({j.applicants.length})</h4>

              {j.applicants.map(app => (
                <div className="card" key={app._id}>
                  <p>{app.user?.name}</p>
                  <p>{app.user?.email}</p>
                  <p>Status: {app.status}</p>

                  <button className="btn" onClick={() => updateStatus(app._id, "shortlisted")}>
                    Shortlist
                  </button>

                  <button className="btn" onClick={() => updateStatus(app._id, "rejected")}>
                    Reject
                  </button>
                </div>
              ))}
            </div>
          ))}
        </>
      )}

      {user?.role === "user" && <UserDashboard />}
    </div>
  );
}