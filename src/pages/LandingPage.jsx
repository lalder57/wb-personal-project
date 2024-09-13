import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import RegisterForm from "../components/RegisterForm";

const LandingPage = () => {
  const [showRegister, setShowRegister] = useState(false);

  // to use Redux, we need to "subscribe" (useSelector()) to the store
  const userId = useSelector((state) => state.userId);
  console.log(userId);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // On initial render, I want this component to determine if there is a userId saved in the server's req.session object
  // 1. define a function to do it
 
  // 2. invoke that function on initial render only (with a useEffect() hook)
  // useEffect(callback, optionalDependencyArray)
  // if the dependencyArray is not provided, useEffect will run on EVERY render
  // if the dependencyArray is empty ([]), then this tells useEffect to ONLY run on the INITIAL render
  // if the dependencyArray contains values, useEffect will run each time one of those values is changed/used
 

  

  return showRegister ? (
    <RegisterForm setShowRegister={setShowRegister} />
  ) : (
    <>
    {!userId &&
        <>
          <LoginForm />
          <p>Not a member? Regiter below</p>
          <button className="bg-blue-300 rounded-md w-24" onClick={() => setShowRegister(true)}>Register</button>
        </>
        }
    </>
  );
};

export default LandingPage;
