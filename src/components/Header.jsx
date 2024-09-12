import LogoutButton from "./LogoutButton"
import { NavLink } from "react-router-dom"

const Header = () => {
  return (
    <nav className="h-16 bg-blue-400 flex justify-evenly items-center">
        Logo
       name of website/logo
      <NavLink to="/userDashboard">My Dashboard</NavLink>
      <NavLink to="/addPd">Add Professional Development</NavLink>
      <NavLink to="/addCourse">Add New Course</NavLink>
      <LogoutButton />
  </nav>
  )
}

export default Header
