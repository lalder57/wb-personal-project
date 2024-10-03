import AddCourse from "./pages/AddCourse";
import AddPd from "./pages/AddPd";
import LandingPage from "./pages/LandingPage";
import UserDashboard from "./pages/UserDashboard";

import { NavLink, Outlet, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";

function App() {
  const userId = useSelector((state) => state.userId);
  // console.log(userId)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkSession = async () => {
    const res = await axios.get("/api/check-session");
    if (res.data.success) {
      console.log(res.data.admin);
      // setUserId(res.data.userId)
      dispatch({
        type: "USER_AUTH",
        payload: { userId: res.data.userId, admin: res.data.admin },
      });
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  // useEffect(() => {
  //   if(!userId) {
  //     navigate('/')
  //   }
  // },[])

  return (
    <div className="flex h-full w-full flex-col">
      <div>
        {/* {!userId && (
          <nav className="bg-ashGray flex h-[10vh] w-screen flex-row items-center justify-around shadow-md lg:hidden">
            <h1 className="text-2xl font-extralight text-white">
              EDUCATOR EXCELLENCE
            </h1>
          </nav>
        )} */}
        {userId && <Header />}
      </div>
      <div className="bg-greenGray">
        <main className="bg-greenGray">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App;
