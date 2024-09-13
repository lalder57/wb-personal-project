import AddCourse from "./pages/AddCourse"
import AddPd from "./pages/AddPd"
import LandingPage from "./pages/LandingPage"
import UserDashboard from "./pages/UserDashboard"

import { NavLink, Outlet, useNavigate } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import axios from "axios"


function App() {
  const userId = useSelector((state) => state.userId)
  console.log(userId)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // On initial render, I want this component to determine if there is a userId saved in the server's req.session object
  // 1. define a function to do it
  // const checkSession = async () => {
  //   const res = await axios.get('/api/check-session');
  //   if (res.data.success) {
  //     // setUserId(res.data.userId)
  //     dispatch({
  //       type: "USER_AUTH",
  //       payload: res.data.userId
  //     })
  //     navigate('/userDashboard')
  //   } 
  // }
  // // 2. invoke that function on initial render only (with a useEffect() hook)
  // // useEffect(callback, optionalDependencyArray)
  // // if the dependencyArray is not provided, useEffect will run on EVERY render
  // // if the dependencyArray is empty ([]), then this tells useEffect to ONLY run on the INITIAL render
  // // if the dependencyArray contains values, useEffect will run each time one of those values is changed/used
  const checkSession = async () => {
    const res = await axios.get("/api/check-session");
    if (res.data.success) {
      // setUserId(res.data.userId)
      dispatch({
        type: "USER_AUTH",
        payload: res.data.userId,
      });
    }
  };

  useEffect(() => {
    checkSession();
  }, []);
  
  useEffect(() => {
    if (userId) {
      navigate("/userDashboard");
    }
  }, [userId]);

  return (
    <>
    {!userId &&
      <nav className="h-16 bg-blue-400">
        Logo
      </nav>
    }

    <main>
      <Outlet />
    </main>
  </>
   
  )
}

export default App
