import LogoutButton from "./LogoutButton"
import { NavLink } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";

const Header = () => {
  const admin = useSelector((state) => state.admin)
  console.log("HEADER ADMIN:", admin)


  return (
    <nav className="h-16 bg-blue-400 flex justify-evenly items-center">
        Logo
       name of website/logo
      <NavLink to="/userDashboard">My Dashboard</NavLink>
      <NavLink to="/myPds">My PDs</NavLink>
      <NavLink to="/myCourses">My Courses</NavLink>
      <NavLink to="/myProfile">My Profile</NavLink>
      {admin &&
      <NavLink to="/adminPortal">Admin Portal</NavLink>
      }
      <LogoutButton />
  </nav>
  )
}

export default Header
