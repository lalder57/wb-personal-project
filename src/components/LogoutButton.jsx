// Logs the user out and sends them back to LandingPage

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
      <button
        className="text-darkGray rounded-md text-xl"
        onClick={handleLogout}
      >
        Logout
      </button>
    </>
  );
};

export default LogoutButton;
