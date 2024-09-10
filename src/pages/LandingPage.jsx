
import LoginForm from "../components/LoginForm"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const LandingPage = () => {
  const [invalidLogin, setInvalidLogin] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e, formData) => {
    e.preventDefault();
    const res = await axios.post('/api/login', formData); 
    console.log(res.data)
    if (res.data.success) {
      navigate('/userDashboard')
    } else {
      setInvalidLogin(true);
    }
  }


  return (
    <div>
      Website summary
      <LoginForm onLogin={handleLogin}/>
      { invalidLogin && <p>Incorrect username or password. Please try again</p> }
      
      Register form 
    </div>
  )
};


export default LandingPage
