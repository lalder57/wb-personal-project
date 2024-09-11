import LogoutButton from "./LogoutButton"
import { NavLink } from "react-router-dom"

const Header = () => {
  return (
    <nav>
    <div id="nav-bar-list">
       name of website/logo
      <NavLink to="/userDashboard">My Dashboard</NavLink>
      <NavLink to="/addPd">Add Professional Development</NavLink>
      <NavLink to="/addCourse">Add New Course</NavLink>
      <LogoutButton />
    </div>
  </nav>
  )
}

export default Header
