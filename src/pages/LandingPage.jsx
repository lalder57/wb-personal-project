import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import RegisterForm from "../components/RegisterForm";

const LandingPage = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  // to use Redux, we need to "subscribe" (useSelector()) to the store
  const userId = useSelector((state) => state.userId);
  const admin = useSelector((state) => state.admin);
  console.log(userId);
  // console.log(admin);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      navigate("/userDashboard");
    }
  }, [userId]);

  return showLogin ? (
    <>
      <LoginForm
        setShowRegister={setShowRegister}
        setShowLogin={setShowLogin}
      />
    </>
  ) : (
    <RegisterForm
      setShowLogin={setShowLogin}
      setShowRegister={setShowRegister}
    />
  );
};

export default LandingPage;
