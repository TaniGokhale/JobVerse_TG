function UserDashboard() {
  const [profile, setProfile] = useState({});
  const [resume, setResume] = useState(null);

  const updateProfile = async () => {
    await API.put("/user/profile", profile);
  };

  const uploadResume = async () => {
    const formData = new FormData();
    formData.append("resume", resume);
    await API.post("/user/upload", formData);
  };

  return (
    <div>
      <h2>Your Profile</h2>

      <input placeholder="Name" onChange={e => setProfile({...profile, name: e.target.value})} />
      <input placeholder="Email" onChange={e => setProfile({...profile, email: e.target.value})} />

      <button onClick={updateProfile}>Update Profile</button>

      <h3>Upload Resume</h3>
      <input type="file" onChange={e => setResume(e.target.files[0])} />
      <button onClick={uploadResume}>Upload</button>
    </div>
  );
}