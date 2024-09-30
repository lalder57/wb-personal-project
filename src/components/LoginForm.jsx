import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PiUserCircleThin } from "react-icons/pi";

const LoginForm = ({ setShowRegister, setShowLogin }) => {
  // To login, I need a user to enter their username + password
  // I should keep track of these with state values, and then when the form is submitted,
  // send those state values to my server as a req.body
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // to use Redux, we need to "subscribe" (useSelector()) to the store
  const userId = useSelector((state) => state.userId);
  const dispatch = useDispatch();

  const [invalidLogin, setInvalidLogin] = useState(false);

  const navigate = useNavigate();

  // how to handle the submission of the form? Create a function that the form submission invokes
  const handleLogin = async (e) => {
    e.preventDefault();

    // Need to create my req.body object:
    const formData = {
      username,
      password,
    };

    // now send this data to our /login endpoint to validate:
    const res = await axios.post("/api/login", formData);

    console.log(res.data);
    // get response and save the userId to the redux store
    if (res.data.success) {
      dispatch({
        type: "USER_AUTH",
        payload: { userId: res.data.userId, admin: res.data.admin },
      });
      // reset username and password fields
      // setUsername("");
      // setPassword("");
      //navigate to the user's dashboard
      navigate("/userDashboard");
    } else {
      setInvalidLogin(true);
    }
  };

  return (
    <div
      id="main-div"
      className="bg-greenGray flex h-screen w-full items-center justify-center lg:justify-between lg:bg-white"
    >
      <div
        id="large-screen-div"
        className="bg-lightGreen flex h-screen w-[60%] flex-col items-center justify-center max-lg:hidden"
      >
        <h1 className="mb-10 text-5xl font-normal text-mint">
          EDUCATOR EXCELLENCE
        </h1>
        <h2 className="text-4xl font-light text-mint">Welcome Back</h2>
      </div>
      <div
        id="content-container"
        className="lg:bg-greenGray flex h-[90%] w-[85%] flex-col items-center justify-around lg:h-[80%] lg:w-[40%]"
      >
        <div className="flex h-1/4 w-full justify-center">
          <PiUserCircleThin className="h-[75%] w-[75%]" />
        </div>

        <form
          onSubmit={handleLogin}
          className="flex w-full max-w-[380px] flex-col text-sm"
        >
          <label className="mb-1" htmlFor="username">
            Username
          </label>
          <input
            value={username}
            type="text"
            required
            placeholder="user1"
            onChange={(e) => setUsername(e.target.value)}
            className="mb-10 h-10 rounded-lg px-2"
          />
          <label className="mb-1" htmlFor="password">
            Password
          </label>
          <input
            value={password}
            type="password"
            required
            placeholder="*********"
            onChange={(e) => setPassword(e.target.value)}
            className="mb-16 h-10 rounded-lg px-2"
          />
          <button
            className="bg-lightGreen border-lightGreen h-10 rounded-lg border font-semibold text-white"
            type="submit"
          >
            Sign in
          </button>
        </form>
        <div className="flex flex-row justify-evenly">
          <h2>Don't have an account?</h2>
          <button
            className="text-darkGreen cursor-pointer underline"
            onClick={() => {
              setShowRegister(true);
              setShowLogin(false);
            }}
          >
            Join us
          </button>
        </div>
        {invalidLogin && (
          <p>Incorrect username or password. Please try again.</p>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
