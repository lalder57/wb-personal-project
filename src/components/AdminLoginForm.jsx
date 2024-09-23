import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLoginForm = () => {
  // To login, I need a user to enter their username + password
  // I should keep track of these with state values, and then when the form is submitted,
  // send those state values to my server as a req.body
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // to use Redux, we need to "subscribe" (useSelector()) to the store
  const userId = useSelector((state) => state.userId);
  const admin = useSelector((state) => state.admin);
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
    if (res.data.admin) {
      dispatch({
        type: "ADMIN_AUTH",
        payload: {userId: res.data.userId, admin: admin }
      });
      // reset username and password fields
      setUsername("");
      setPassword("");
      //navigate to the user's dashboard
      navigate("/userDashboard");
    } else {
      setInvalidLogin(true);
    }
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        
        <label htmlFor="username">Username:</label>
        <input
          value={username}
          type="text"
          placeholder="Username"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          value={password}
          type="password"
          required
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-300 rounded-md w-24" type="submit">Login</button>
      </form>
      { invalidLogin && <p>Incorrect username or password. Please try again.</p> }
    </>
  );
};

export default AdminLoginForm;

