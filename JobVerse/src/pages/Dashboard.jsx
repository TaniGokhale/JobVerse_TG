import UserDashboard from "../pages/UserDashboard";
import RecruiterDashboard from "../pages/RecruiterDashboard";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.role === "recruiter") {
    return <RecruiterDashboard />;
  }

  return <UserDashboard />;
}