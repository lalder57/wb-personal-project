import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const RegisterForm = ({ setShowRegister }) => {
  // To login, I need a user to enter their username + password
  // I should keep track of these with state values, and then when the form is submitted,
  // send those state values to my server as a req.body
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [district, setDistrict] = useState("");
  const [degree, setDegree] = useState("");

  const dispatch = useDispatch();

  // const navigate = useNavigate();

  // how to handle the submission of the form? Create a function that the form submission invokes
  const handleRegister = async (e) => {
    e.preventDefault();

    // Need to create my req.body object:
    const formData = {
      username,
      password,
      fname,
      lname,
      email,
      district,
      degree
    };

    // now send this data to our /login endpoint to validate:
    const res = await axios.post("/api/register", formData);

    console.log(res.data);
    // get response and save the userId to the redux store
    if (res.data.success) {
      dispatch({
        type: "USER_AUTH",
        payload: res.data.userId,
      });
      // reset username and password fields
      setUsername("");
      setPassword("");
      setEmail("");
      setFname("");
      setLname("");
      setDistrict("");
      setDegree("");
      setShowRegister(false);
      //navigate to the user's dashboard
      // navigate("/userDashboard"); Do I need this? Seems to be working without it
    }
    alert(res.data.message);
  };

  return (
    <>
      <form onSubmit={handleRegister}>
        Register Form
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
        <label htmlFor="email">Email:</label>
        <input
          value={email}
          type="text"
          required
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="fname">First Name:</label>
        <input
          value={fname}
          type="text"
          required
          placeholder="First name"
          onChange={(e) => setFname(e.target.value)}
        />
        <label htmlFor="lname">Last Name:</label>
        <input
          value={lname}
          type="text"
          required
          placeholder="Last name"
          onChange={(e) => setLname(e.target.value)}
        />
        <label htmlFor="district">district:</label>
        <input
          value={district}
          type="text"
          required
          placeholder="district"
          onChange={(e) => setDistrict(e.target.value)}
        />
        <label htmlFor="degree">degree:</label>
        <select value={degree} required onChange={(e) => setDegree(e.target.value)}>
          <option value="">Please choose a degree</option>
          <option value="1">Bachelors</option>
          <option value="2">Master</option>
          <option value="3">Ph.D.</option>          
        </select>
        <button className="bg-blue-300 rounded-md w-24" type="submit">Register</button>
      </form>

        {/* <button>Return to Landing Page</button> // find a way to "take user back" to landing page */}

      {/* { invalidLogin && <p>Incorrect username or password. Please try again.</p> } */}
    </>
  );
};

export default RegisterForm;
