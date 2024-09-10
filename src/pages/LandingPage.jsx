
import LoginForm from "../components/LoginForm"
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LandingPage = () => {
  const navigate = useNavigate();
  const handleLogin = async (e, formData) => {
    e.preventDefault();
    const res = await axios.post('/api/login', formData); 
    console.log(res.data)
    // if (res.data.success) {
    //   navigate('/UserDashboard')
    // }

  }

  return (
    <div>
      Website summary
      <LoginForm onLogin={handleLogin}/>
      Register form 
    </div>
  )
}

export default LandingPage
