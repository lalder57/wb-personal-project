// Logs the user out and sends them back to LandingPage

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.userId);
  // console.log(userId);

  const handleLogout = async () => {
    const res = await axios.get("/api/logout");
    if (res.data.success) {
      dispatch({
        type: "LOGOUT",
      });
      navigate("/");
    }
  };

  return (
    <>
    <button className="bg-blue-300 rounded-md w-24" onClick={handleLogout}>Logout</button>
    </>

  )
};

export default LogoutButton;