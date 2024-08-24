import { useEffect } from "react";
import { useLoggedInUser } from "../../hooks/auth.hooks";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "./admin-dashboard";

const Dashboard = () => {
  const { data: user, isLoading } = useLoggedInUser();
  console.log(user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/sign-in");
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{user.role === "admin" && <AdminDashboard />}</>;
};
export default Dashboard;
