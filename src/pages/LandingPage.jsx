
import LoginForm from "../components/LoginForm"
import { useNavigate } from "react-router-dom";
import { useState, useEffect} from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

const LandingPage = () => {
 
  const [showRegister, setShowRegister] = useState(false);

  // to use Redux, we need to "subscribe" (useSelector()) to the store
  const userId = useSelector((state) => state.userId)
  const dispatch = useDispatch();
 
  // if invalid login
  const [invalidLogin, setInvalidLogin] = useState(false);

  const navigate = useNavigate();


  return (
    <div>
      Website summary
      <LoginForm />
      { invalidLogin && <p>Incorrect username or password. Please try again</p> }
      
      Register form 
    </div>
  )
};


export default LandingPage
