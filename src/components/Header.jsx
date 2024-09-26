import LogoutButton from "./LogoutButton";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IoHome } from "react-icons/io5";
import { GiBookshelf } from "react-icons/gi";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";

const Header = () => {
  const admin = useSelector((state) => state.admin);
  console.log("HEADER ADMIN:", admin);

  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      {/* mobile screen navbar */}
      <nav className="flex h-[10vh] w-screen flex-row items-center justify-around bg-blue-400 shadow-lg lg:hidden">
        <GiHamburgerMenu
          className="h-6 w-6"
          onClick={() => setShowMenu(!showMenu)}
        />
        <h1 className="text-2xl font-extralight">EDUCATOR EXCELLENCE</h1>
        {showMenu && (
          <div className="absolute left-0 top-[10vh] z-10 flex h-[90vh] w-3/5 flex-col items-start bg-blue-400 px-5">
            <div className="flex h-1/3 flex-col items-start justify-between">
              <NavLink
                to="/userDashboard"
                onClick={() => setShowMenu(!showMenu)}
                className="text-xl"
              >
                Home
                <hr className="border-black" />
              </NavLink>
              <NavLink
                to="/myPds"
                className="text-xl"
                onClick={() => setShowMenu(!showMenu)}
              >
                My PDs
                <hr className="border-black" />
              </NavLink>
              <NavLink
                to="/myCourses"
                onClick={() => setShowMenu(!showMenu)}
                className="text-xl"
              >
                My Courses
                <hr className="border-black" />
              </NavLink>
              <NavLink
                to="/myProfile"
                className="text-xl"
                onClick={() => setShowMenu(!showMenu)}
              >
                My Profile
                <hr className="border-black" />
              </NavLink>
              {admin && (
                <NavLink
                  to="/adminPortal"
                  className="text-xl"
                  onClick={() => setShowMenu(!showMenu)}
                >
                  Admin Portal
                  <hr className="border-black" />
                </NavLink>
              )}
            </div>
            <div className="absolute bottom-5">
              <LogoutButton />
            </div>
          </div>
        )}
      </nav>

      {/* big screen navbar */}
      <nav className="hidden h-screen w-3/4 flex-col items-center justify-evenly bg-blue-400 shadow-lg lg:flex">
        <NavLink
          to="/userDashboard"
          className="flex flex-col items-center bg-blue-300 hover:bg-green-100"
        >
          Home
        </NavLink>
        <NavLink to="/myPds">My PDs</NavLink>
        <NavLink
          to="/myCourses"
          className="flex flex-col items-center bg-blue-300 hover:bg-green-100"
        >
          My Courses
        </NavLink>
        <NavLink to="/myProfile">My Profile</NavLink>
        {admin && <NavLink to="/adminPortal">Admin Portal</NavLink>}
        <LogoutButton />
      </nav>
    </>
  );
};

export default Header;
