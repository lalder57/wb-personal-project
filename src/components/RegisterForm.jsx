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
      currentProgress: 0,
    };

    // now send this data to our /login endpoint to validate:
    const res = await axios.post("/api/register", formData);

    console.log(res.data);
    // get response and save the userId to the redux store
    if (res.data.success) {
      dispatch({
        type: "USER_AUTH",
        payload: { userId: res.data.userId, admin: res.data.admin },
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
    <div className="lg:bg-ashGray lg:grid lg:h-screen lg:place-items-center">
      <div className="h[100vh] m-10 flex flex-col justify-around lg:rounded-lg lg:bg-white lg:px-60">
        <div>
          <h1 className="text-2xl">
            Register for <br /> Free trial account
          </h1>
          <h2 className="text-sm">
            Try Educator Excellence free for 14 days and start tracking your
            professional progress! It takes less than 5 minutes to set up.
          </h2>
        </div>
        <form
          onSubmit={handleRegister}
          className="mb-5 mt-10 flex flex-col text-sm"
        >
          <label className="mb-1" htmlFor="username">
            Username
          </label>
          <input
            value={username}
            type="text"
            placeholder="Create a username"
            required
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
            placeholder="Create a password"
            onChange={(e) => setPassword(e.target.value)}
            className="mb-10 h-10 rounded-md px-2"
          />
          <div className="lg:flex lg:flex-row">
            <label className="mb-1" htmlFor="fname">
              First Name
            </label>
            <input
              value={fname}
              type="text"
              required
              placeholder="Your first name"
              onChange={(e) => setFname(e.target.value)}
              className="mb-10 h-10 rounded-md px-2"
            />
            <label className="mb-1" htmlFor="lname">
              Last Name
            </label>
            <input
              value={lname}
              type="text"
              required
              placeholder="Your last name"
              onChange={(e) => setLname(e.target.value)}
              className="mb-10 h-10 rounded-md px-2"
            />
          </div>
          <label className="mb-1" htmlFor="email">
            Email
          </label>
          <input
            value={email}
            type="email"
            required
            placeholder="Your email"
            onChange={(e) => setEmail(e.target.value)}
            className="mb-10 h-10 rounded-md px-2"
          />
          <label className="mb-1" htmlFor="school">
            School
          </label>
          <input
            value={school}
            type="text"
            required
            placeholder="Your school"
            onChange={(e) => setSchool(e.target.value)}
            className="mb-10 h-10 rounded-md px-2"
          />
          <div>
            <label className="mb-1" htmlFor="degreeId">
              Degree
            </label>
            <select
              value={degreeId}
              required
              onChange={(e) => setDegreeId(e.target.value)}
              className="mb-10 h-10 rounded-md border border-black px-2"
            >
              <option value="" disabled hidden>
                Choose a degree
              </option>
              <option value="1">bachelor's</option>
              <option value="2">master's</option>
              <option value="3">Ph.D.</option>
            </select>
            <label className="mb-1" htmlFor="laneId">
              Lane
            </label>
            <select
              value={laneId}
              required
              onChange={(e) => setLaneId(e.target.value)}
              className="mb-12 h-10 rounded-md border border-black px-2"
            >
              <option value="" disabled hidden>
                Choose a lane
              </option>
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
          </div>
          <button
            className="border-mint bg-mint h-10 rounded-md border"
            type="submit"
          >
            Register
          </button>
        </form>
        <div className="flex flex-row justify-evenly">
          <h3>Already have an account?</h3>

          <button
            onClick={() => {
              setShowLogin(true);
              setShowRegister(false);
            }}
            className="text-mint cursor-pointer underline"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
