import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    <div className="lg:bg-ashGray lg:grid lg:h-screen lg:place-items-center">
      <div className="flex h-[75vh] flex-col justify-around px-10 lg:h-[65vh] lg:w-[65vw] lg:justify-evenly lg:rounded-lg lg:bg-white lg:px-60">
        <div>
          <h1 className="text-2xl">Welcome back</h1>
          <h2 className="text-sm">Enter your details to continue</h2>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col text-sm">
          <label className="mb-1" htmlFor="username">
            Username
          </label>
          <input
            value={username}
            type="text"
            required
            placeholder="user1"
            onChange={(e) => setUsername(e.target.value)}
            className="mb-10 h-10 rounded-md px-2"
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
            className="mb-16 h-10 rounded-md px-2"
          />
          <button
            className="border-mint bg-mint h-10 rounded-md border"
            type="submit"
          >
            Sign in
          </button>
        </form>
        <div className="flex flex-row justify-evenly">
          <h2>Don't have an account?</h2>
          <button
            className="text-mint cursor-pointer underline"
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
