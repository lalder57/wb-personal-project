import { Outlet } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";

function App() {
  const userId = useSelector((state) => state.userId);
  const dispatch = useDispatch();

  const checkSession = async () => {
    const res = await axios.get("/api/check-session");
    if (res.data.success) {
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
