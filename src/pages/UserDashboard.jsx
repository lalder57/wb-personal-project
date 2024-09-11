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
      <h1>User Dashboard</h1>
      <h2>My PD progress:</h2>
      <button>Add New PD</button> {/* Route to AddPd */}
      <h2>Next Lane Change</h2>
      <button>Add New Course</button> {/* Route to AddCourse */}
      {/* <button onClick={handleLogout}>Logout</button> */}
    </div>
  );
};

export default UserDashboard;
