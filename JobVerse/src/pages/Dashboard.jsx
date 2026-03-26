import { useEffect, useState } from "react";
import API from "../services/api";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    if (user.role === "recruiter") {
      API.get("/jobs/my-jobs").then(res => setJobs(res.data));
    }
  }, []);

  return (
    <div className="container">
      {user.role === "recruiter" && (
        <>
          <h2>Your Jobs</h2>

          {jobs.map(job => (
            <div className="card" key={job._id}>
              <h3>{job.title}</h3>
              <p>{job.company}</p>

              <h4>Applicants:</h4>

              {job.applicants.map(app => (
                <div key={app._id} className="card">
                  <p>{app.user.name}</p>
                  <p>{app.user.email}</p>

                  <a href={`http://localhost:5000/${app.user.resume}`} target="_blank">
                    View Resume
                  </a>
                </div>
              ))}
            </div>
          ))}
        </>
      )}

      {user.role === "user" && <UserDashboard />}
    </div>
  );
}