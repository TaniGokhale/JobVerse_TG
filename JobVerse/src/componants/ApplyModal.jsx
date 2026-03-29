import { useState } from "react";
import API from "../services/api";

export default function ApplyModal({ jobId, close }) {
  const [form, setForm] = useState({});
  const [resume, setResume] = useState(null);

  const apply = async () => {
    const data = new FormData();
    data.append("name", form.name);
    data.append("email", form.email);
    data.append("resume", resume);

    await API.post(`/jobs/apply/${jobId}`, data);

    alert("Applied Successfully");
    close();
  };

  return (
    <div className="modal">
      <div className="card">
        <h3>Apply Job</h3>

        <input placeholder="Name" onChange={e => setForm({...form, name: e.target.value})} />
        <input placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} />

        <input type="file" onChange={e => setResume(e.target.files[0])} />

        <button className="btn" onClick={apply}>Submit</button>
        <button onClick={close}>Close</button>
      </div>
    </div>
  );
}