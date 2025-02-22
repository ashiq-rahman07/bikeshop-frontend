import { useEffect } from "react";
import { selectCurrentUser } from "../../redux/features/user/authSlice";
import { useAppSelector } from "../../redux/hooks";
import CustomerDashboardIndexPage from "./CustomerDasIndex";
import DashboardIndexPage from "./DashboardIndexPage";

const Dashboard = () => {
  useEffect(() => {
    document.title = 'Dashboard- Classic Riders';
  }, []);
  const user = useAppSelector(selectCurrentUser);
  return user?.role =='admin' ? <DashboardIndexPage/>:<CustomerDashboardIndexPage/>;
};

export default Dashboard;
