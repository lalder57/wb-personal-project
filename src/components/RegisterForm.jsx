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
        <h2 className="text-4xl font-light text-mint">Start Tracking Today</h2>
      </div>
      <div
        id="content-container"
        className="lg:bg-greenGray flex h-[90%] w-[85%] flex-col items-center justify-between lg:h-[80%] lg:w-[40%]"
      >
        <div className="flex justify-center">
          <h1 className="text-2xl">Create an Account</h1>
        </div>
        <form
          onSubmit={handleRegister}
          className="flex max-w-[380px] flex-col text-sm"
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
            className="mb-6 h-10 rounded-lg px-2"
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
            className="mb-6 h-10 rounded-lg px-2"
          />
          <div
            id="name-container"
            className="flex w-full flex-row flex-wrap justify-between"
          >
            <div id="fname-container" className="flex w-[48%] flex-col">
              <label className="mb-1" htmlFor="fname">
                First Name
              </label>
              <input
                value={fname}
                type="text"
                required
                placeholder="Your first name"
                onChange={(e) => setFname(e.target.value)}
                className="mb-6 h-10 w-full rounded-lg px-2"
              />
            </div>
            <div id="lname-container" className="flex w-[48%] flex-col">
              <label className="mb-1" htmlFor="lname">
                Last Name
              </label>
              <input
                value={lname}
                type="text"
                required
                placeholder="Your last name"
                onChange={(e) => setLname(e.target.value)}
                className="mb-6 h-10 w-full rounded-lg px-2"
              />
            </div>
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
            className="mb-6 h-10 rounded-lg px-2"
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
            className="mb-6 h-10 rounded-lg px-2"
          />
          <div
            id="deegree-lane-container"
            className="flex w-full flex-row justify-between"
          >
            <div id="degree-container" className="flex w-[48%] flex-col">
              <label className="mb-1" htmlFor="degreeId">
                Degree
              </label>
              <select
                value={degreeId}
                required
                onChange={(e) => setDegreeId(e.target.value)}
                className="mb-6 h-10 w-full rounded-lg border border-black px-2"
              >
                <option value="" disabled hidden>
                  Choose a degree
                </option>
                <option value="1">bachelor's</option>
                <option value="2">master's</option>
                <option value="3">Ph.D.</option>
              </select>
            </div>
            <div id="lane-container" className="flex w-[48%] flex-col">
              <label className="mb-1" htmlFor="laneId">
                Lane
              </label>
              <select
                value={laneId}
                required
                onChange={(e) => setLaneId(e.target.value)}
                className="mb-10 h-10 w-full rounded-lg border border-black px-2"
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
          </div>
          <button
            className="bg-lightGreen border-lightGreen h-10 rounded-lg font-semibold text-white"
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
            className="text-darkGreen cursor-pointer underline"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
