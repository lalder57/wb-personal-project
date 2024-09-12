import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "../components/Header";

const UserDashboard = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.userId);
  console.log(userId);

  // const handleLogout = async () => {
  //   const res = await axios.get("/api/logout");
  //   if (res.data.success) {
  //     dispatch({
  //       type: "LOGOUT",
  //     });
  //     navigate("/");
  //   }
  // };
  //can't view userDashboard if you aren't logged in
  useEffect(() => {
    if (!userId) {
      alert("You can't visit this page without being logged in");
      navigate("/");
    }
  }, [userId]);

  return (
    <div>
      <Header />
      <h1 className="text-3xl font-semibold">User Dashboard</h1>
      <h2 className="text-xl font-semibold">My PD progress:</h2>
      <button className="bg-blue-300 rounded-md w-32">Add New PD</button> {/* Route to AddPd */}
      <h2 className="text-xl font-semibold">Next Lane Change</h2>
      <button className="bg-blue-300 rounded-md w-40">Add New Course</button> {/* Route to AddCourse */}
    </div>
  );
};

export default UserDashboard;
