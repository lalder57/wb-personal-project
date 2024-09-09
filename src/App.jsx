import AddCourse from "./pages/AddCourse"
import AddPd from "./pages/AddPd"
import LandingPage from "./pages/LandingPage"
import UserDashboard from "./pages/UserDashboard"

import { NavLink, Outlet } from "react-router-dom"

function App() {
  

  return (
    <>
    <nav>
      <div id="nav-bar-list">
         {/* name of website/logo */}
        <NavLink to="/userDashboard">My Dashboard</NavLink>
        <NavLink to="/addPd">Add Professional Development</NavLink>
        <NavLink to="/addCourse">Add New Course</NavLink>
        {/* <LogoutButton onLogout={handleLogout} /> */}
      </div>
    </nav>

    <main>
      <Outlet />
    </main>
  </>
   
  )
}

export default App
