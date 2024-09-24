import Header from "../components/Header";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useLoaderData, Link } from "react-router-dom";

const AddPd = () => {
  // set state values for the input fields
  const [pdName, setPdName] = useState("");
  const [pdProvider, setPdProvider] = useState("");
  const [pdDateCompleted, setPdDateCompleted] = useState(""); //Should this be a string or a date?
  const [pdHours, setPdHours] = useState(""); // Should this be a string or a number
  const [pdDescription, setPdDescription] = useState("");
  const [pdReflection, setPdReflection] = useState("");
  const [pdRecommend, setPdRecommend] = useState(false);
  const [showAddPdForm, setShowAddPdForm] = useState(false);
  // const [showCreatePdForm, setShowCreatePdForm] = useState(false);

  const navigate = useNavigate();
  // grab value from the loader function in main.jsx to get all of the existing pds
  const { allPds } = useLoaderData();

  // These functions are inline on the buttons -
  // function to know when to display the addPdForm:
  // if addExistingPdButton is clicked, then display the addPdForm

  // function to know when to display the createPdForm:
  // if createNewPdButton is clicked, then display the createNewPdForm

  // create functions for the two buttons in the two forms to send the axios calls when they are clicked
  const handleNewPD = async (e) => {
    e.preventDefault();
    const formData = {
      pdName,
      pdProvider,
      pdHours,
      pdDateCompleted,
      pdDescription,
      pdReflection,
      pdRecommend,
    };
    const res = await axios.post("/api/addPd", formData);
    console.log(res.data);

    // send some form of alert to the user so they know if their attempt was successful
    alert(res.data.message);
    // send back to userDashboard (has a loader to get new info from DB)
    navigate("/userDashboard");
  };

  return (
    <>
      <h1>Search for an existing PD -</h1>

      {/* 
      -users can search the DB for an existing PD. If it exists, 
      -selecting it will open a new page/modal/something with the PdTracker form that will have provider, hours, 
      dateCompleted, description, reflection, recommend input fields.
      -this PdTracker form will have a save PD button that will add it to the DB */}

      <form>
        <label>
          PD Name:
          <select
            value={pdName}
            required
            onChange={(e) => setPdName(e.target.value)}
          >
            <option value="" disabled>
              Select an option
            </option>
            {/* do a map to populate the options as the existing pds */}
            {allPds.map((pd) => {
              return (
                <option key={pd.pdId} value={pd.pdName}>
                  {pd.pdName}
                </option>
              );
            })}
          </select>
          <button
            type="submit"
            disabled={!pdName}
            onClick={(e) => {
              e.preventDefault();
              setShowAddPdForm(true);
            }}
          >
            Add PD
          </button>
        </label>
      </form>

      {/* If user clicks the Add PD button */}

      {showAddPdForm && (
        <>
          <h1>AddPdForm</h1>
          <form onSubmit={handleNewPD}>
            <label htmlFor="pdProvider">Name of Provider:</label>
            <input
              value={pdProvider}
              type="text"
              required
              onChange={(e) => setPdProvider(e.target.value)}
            />
            <label htmlFor="pdHours">Number of Hours:</label>
            <input
              value={pdHours}
              type="number"
              required
              onChange={(e) => setPdHours(e.target.value)}
            />
            <label htmlFor="pdDateCompleted">Date Completed:</label>
            <input
              value={pdDateCompleted}
              type="date"
              required
              onChange={(e) => setPdDateCompleted(e.target.value)}
            />
            <label htmlFor="pdDescription">Description:</label>
            <input
              value={pdDescription}
              type="text"
              onChange={(e) => setPdDescription(e.target.value)}
            />
            <label htmlFor="pdReflection">Reflection:</label>
            <input
              value={pdReflection}
              type="text"
              onChange={(e) => setPdReflection(e.target.value)}
            />
            <label htmlFor="pdRecommend">
              Would you recommend this to other teachers?
            </label>
            <input
              value={pdRecommend}
              type="checkbox"
              checked={pdRecommend}
              onChange={(e) => setPdRecommend(e.target.checked)}
            />
            <button type="submit">Save PD</button>
          </form>
        </>
      )}

      <h2>Don't see it?</h2>
      <Link to={'/CreatePdPage'}>
        <button>Create New PD</button>
      </Link>
    </>
  );
};

export default AddPd;
