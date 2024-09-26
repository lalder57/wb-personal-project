import LogoutButton from "./LogoutButton"
import { NavLink } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";

const Header = () => {
  const admin = useSelector((state) => state.admin)
  console.log("HEADER ADMIN:", admin)


  return (
    <nav className="h-screen w-50 bg-blue-400 flex flex-col justify-evenly items-center shadow-lg ">
        Logo
       name of website/logo
      <NavLink to="/userDashboard" className="bg-blue-300 hover:bg-green-100">My Dashboard</NavLink>
      <NavLink to="/myPds">My PDs</NavLink>
      <NavLink to="/myCourses" className="bg-blue-300 hover:bg-green-100">My Courses</NavLink>
      <NavLink to="/myProfile">My Profile</NavLink>
      {admin &&
      <NavLink to="/adminPortal">Admin Portal</NavLink>
      }
      <LogoutButton />
  </nav>
  )
}

export default Header
