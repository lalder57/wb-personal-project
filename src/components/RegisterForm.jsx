import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const RegisterForm = ({ setShowLogin, setShowRegister }) => {
  // To login, I need a user to enter their username + password
  // I should keep track of these with state values, and then when the form is submitted,
  // send those state values to my server as a req.body
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [school, setSchool] = useState("");
  const [degreeId, setDegreeId] = useState("");
  const [laneId, setLaneId] = useState("");

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
      school,
      degreeId,
      laneId,
      admin: false,
      currentProgress: 0
    };

    // now send this data to our /login endpoint to validate:
    const res = await axios.post("/api/register", formData);

    console.log(res.data);
    // get response and save the userId to the redux store
    if (res.data.success) {
      dispatch({
        type: "USER_AUTH",
        payload: {userId: res.data.userId, admin: res.data.admin}
      });
      // reset username and password fields
      setUsername("");
      setPassword("");
      setEmail("");
      setFname("");
      setLname("");
      setSchool("");
      setDegreeId("");
      setLaneId("");
      setShowLogin(true);
      //navigate to the user's dashboard
      // navigate("/userDashboard"); Do I need this? Seems to be working without it
    }
    alert(res.data.message);
  };

  return (
    <>
      <h1>Register Form</h1>
      <form onSubmit={handleRegister}>
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
        <label htmlFor="school">school:</label>
        <input
          value={school}
          type="text"
          required
          placeholder="school"
          onChange={(e) => setSchool(e.target.value)}
        />
        <label htmlFor="degreeId">degree:</label>
        <select value={degreeId} required onChange={(e) => setDegreeId(e.target.value)}>
          <option value="">Please choose a degree</option>
          <option value="1">bachelor's</option>
          <option value="2">master's</option>
          <option value="3">Ph.D.</option>          
        </select>
        <label htmlFor="laneId">lane:</label>
        <select value={laneId} required onChange={(e) => setLaneId(e.target.value)}>
          <option value="">Please choose a lane</option>
          <option value="1">Lane 1</option>
          <option value="2">Lane 2</option>
          <option value="3">Lane 3</option>
          <option value="4">Lane 4</option>          
          <option value="5">Lane 5</option>          
          <option value="6">Lane 6</option>          
          <option value="7">Lane 7</option>         
          <option value="8">Lane 8</option>         
          <option value="9">Lane 9</option>         
        </select>
        <button className="bg-blue-300 rounded-md w-24" type="submit">Register</button>
      </form>

      <h3>Already have an account?</h3>

       <button 
        onClick={() => {
          setShowLogin(true);
          setShowRegister(false);
          }}>
        Login
      </button>
    </>
  );
};

export default RegisterForm;
