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
  const handleNewPd = async (e) => {
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

    // send some form of alert to the user so they know if their attempt was successful
    alert(res.data.message);
    // send back to userDashboard (has a loader to get new info from DB)
    navigate(-1);
  };

  return (
    <div
      id="main-div"
      className="bg-greenGray flex h-[90vh] w-full justify-center"
    >
      <div
        id="content-div"
        className="mt-6 flex w-[90%] flex-col md:w-[80%] lg:w-[70%]"
      >
        {/* 
      -users can search the DB for an existing course. If it exists, 
      -selecting it will open a new page/modal/something with the courseTracker form that will have provider, hours, 
      dateCompleted, description, reflection, recommend input fields.
      -this courseTracker form will have a save course button that will add it to the DB */}
        {!showAddPdForm && (
          <>
            <div id="add-pd-title" className="flex items-center lg:mt-6">
              <h1 className="text-xl">Choose from existing PDs</h1>
            </div>

            <form className="mb-10 mt-4 flex flex-col gap-4">
              <select
                value={pdName}
                required
                onChange={(e) => setPdName(e.target.value)}
                className="h-[34px] w-[40%] max-w-[263px] cursor-pointer rounded-lg bg-blueGray px-2"
              >
                <option value="" disabled>
                  Select a PD
                </option>
                {/* do a map of the database courseNames to populate the options of this select */}
                {allPds.map((pd) => (
                  <option key={pd.pdId} value={pd.pdName}>
                    {pd.pdName}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                disabled={!pdName}
                onClick={(e) => {
                  e.preventDefault();
                  setShowAddPdForm(true);
                }}
                className="bg-darkGreen border-darkGreen flex h-[34px] w-[25%] min-w-[110px] max-w-[175px] items-center justify-center rounded-lg text-sm font-semibold text-white md:text-base lg:text-base"
              >
                Submit
              </button>
            </form>
          </>
        )}

        {/* If user clicks the Add course button */}

        {showAddPdForm && (
          <>
            <h1 className="text-xl lg:mt-6">{pdName}</h1>
            <form
              onSubmit={handleNewPd}
              className="my-10 flex flex-col text-sm"
            >
              <label className="mb-1" htmlFor="pdProvider">
                Name of Provider
              </label>
              <input
                value={pdProvider}
                type="text"
                required
                onChange={(e) => setPdProvider(e.target.value)}
                className="mb-6 h-10 rounded-lg px-2"
              />
              <label className="mb-1" htmlFor="pdHours">
                Number of Hours
              </label>
              <input
                value={pdHours}
                type="number"
                required
                onChange={(e) => setPdHours(e.target.value)}
                className="mb-6 h-10 rounded-lg px-2"
              />
              <label className="mb-1" htmlFor="pdDateCompleted">
                Date Completed
              </label>
              <input
                value={pdDateCompleted}
                type="date"
                required
                onChange={(e) => setPdDateCompleted(e.target.value)}
                className="mb-6 h-10 rounded-lg px-2"
              />
              <label className="mb-1" htmlFor="pdDescription">
                Description (optional)
              </label>
              <textarea
                value={pdDescription}
                onChange={(e) => setPdDescription(e.target.value)}
                className="mb-6 h-20 rounded-lg border border-black p-2"
              />
              <label className="mb-1" htmlFor="pdReflection">
                Reflection (optional)
              </label>
              <textarea
                value={pdReflection}
                onChange={(e) => setPdReflection(e.target.value)}
                className="mb-6 h-20 rounded-lg border border-black p-2"
              />
              <div
                id="pdRecommend-div"
                className="mb-10 flex h-10 items-center gap-5"
              >
                <label className="mb-1" htmlFor="pdRecommend">
                  Would you recommend this to other teachers?
                </label>
                <input
                  value={pdRecommend}
                  type="checkbox"
                  checked={pdRecommend}
                  onChange={(e) => setPdRecommend(e.target.checked)}
                  className="mb-1 h-5 w-5"
                />
              </div>
              <div id="btn-contianer" className="flex gap-6">
                <button
                  className="bg-darkGreen border-darkGreen flex h-[34px] w-[25%] min-w-[110px] max-w-[175px] items-center justify-center rounded-lg text-sm font-semibold text-white md:text-base lg:text-base"
                  type="submit"
                >
                  Save PD
                </button>
                <button
                  className="bg-darkGreen border-darkGreen flex h-[34px] w-[25%] min-w-[110px] max-w-[175px] items-center justify-center rounded-lg text-sm font-semibold text-white md:text-base lg:text-base"
                  onClick={() => setShowAddPdForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        )}

        {!showAddPdForm && (
          <div id="create-pd-option-div">
            <h2 className="mb-2 text-xl">Don't see it?</h2>
            <div id="btn-container" className="flex flex-col">
              <Link
                to={"/CreatePdPage"}
                className="h-[34px] w-[25%] min-w-[140px] max-w-[175px]"
              >
                <button className="bg-darkGreen border-darkGreen flex h-full w-full items-center justify-center rounded-lg text-sm font-semibold text-white md:text-base lg:text-base">
                  Create New PD
                </button>
              </Link>
            </div>
            <div id="second-btn" className="absolute bottom-5">
              <Link to="/myPds">
                <button className="text-darkGreen text-sm underline underline-offset-2 md:text-base lg:text-base">
                  Return to PD List
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddPd;
