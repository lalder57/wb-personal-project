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
      <nav className="bg-ashGray flex h-[10vh] w-screen flex-row items-center justify-around shadow-md lg:hidden">
        <GiHamburgerMenu
          className="h-6 w-6 text-white"
          onClick={() => setShowMenu(!showMenu)}
        />
        <h1 className="text-2xl font-extralight text-white">
          EDUCATOR EXCELLENCE
        </h1>
        {showMenu && (
          <div className="bg-ashGray absolute left-0 top-[10vh] z-10 flex h-[90vh] w-3/5 flex-col items-start px-5">
            <div className="flex h-1/3 flex-col items-start justify-between">
              <NavLink
                to="/userDashboard"
                onClick={() => setShowMenu(!showMenu)}
                className="text-xl text-white"
              >
                Home
                <hr className="border-white" />
              </NavLink>
              <NavLink
                to="/myPds"
                className="text-xl text-white"
                onClick={() => setShowMenu(!showMenu)}
              >
                My PDs
                <hr className="border-white" />
              </NavLink>
              <NavLink
                to="/myCourses"
                onClick={() => setShowMenu(!showMenu)}
                className="text-xl text-white"
              >
                My Courses
                <hr className="border-white" />
              </NavLink>
              <NavLink
                to="/myProfile"
                className="text-xl text-white"
                onClick={() => setShowMenu(!showMenu)}
              >
                My Profile
                <hr className="border-white" />
              </NavLink>
              {admin && (
                <NavLink
                  to="/adminPortal"
                  className="text-xl text-white"
                  onClick={() => setShowMenu(!showMenu)}
                >
                  Admin Portal
                  <hr className="border-white" />
                </NavLink>
              )}
            </div>
            <div className="absolute bottom-5">
              <LogoutButton />
              <hr className="border-darkGray" />
            </div>
          </div>
        )}
      </nav>

      {/* big screen navbar */}
      <nav className="bg-ashGray hidden h-[10vh] w-screen flex-row items-center shadow-md lg:flex">
        <div className="flex w-screen flex-row items-center justify-around">
          <NavLink
            to="/userDashboard"
            className="hover:bg-darkGray focus-within:bg-darkGray border-darkGray w-32 rounded-md text-center text-xl text-white"
          >
            Home
          </NavLink>
          <NavLink
            to="/myPds"
            className="hover:bg-darkGray focus-within:bg-darkGray border-darkGray w-32 rounded-md text-center text-xl text-white"
          >
            My PDs
          </NavLink>
          <NavLink
            to="/myCourses"
            className="hover:bg-darkGray focus-within:bg-darkGray border-darkGray w-32 rounded-md text-center text-xl text-white"
          >
            My Courses
          </NavLink>
          <NavLink
            to="/myProfile"
            className="hover:bg-darkGray focus-within:bg-darkGray border-darkGray w-32 rounded-md text-center text-xl text-white"
          >
            My Profile
          </NavLink>
          {admin && (
            <NavLink
              to="/adminPortal"
              className="hover:bg-darkGray focus-within:bg-darkGray border-darkGray w-32 rounded-md text-center text-xl text-white"
            >
              Admin Portal
            </NavLink>
          )}
          <LogoutButton />
        </div>
      </nav>
    </>
  );
};

export default Header;
