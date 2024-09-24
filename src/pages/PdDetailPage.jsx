import { useLoaderData, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import EditPdForm from "../components/EditPdForm";
import { displayDate } from "../assets/helper-functions.js"

const PdDetailPage = () => {
  const { pdDetails } = useLoaderData();
  const [editMode, setEditMode] = useState(false);
  const [newPdDetails, setNewPdDetails] = useState(pdDetails);
  const [pdName, setPdName] = useState(pdDetails.pd.pdName);

  const navigate = useNavigate();

  console.log("newPdDetails: ", newPdDetails);
  const {
    pd,
    pdTrackerId,
    pdDateCompleted,
    pdDescription,
    pdHours,
    pdProvider,
    pdRecommend,
    pdReflection,
  } = newPdDetails;

  // console.log(pdRecommend);

  const toggleEdit = () => setEditMode(!editMode);

  const deleteFunc = async () => {
    // confirm message
    if (
      window.confirm(
        "You are about to delete a PD. This will subtract from your total amount of PD hours. Do you want to continue?"
      )
    ) {
      // axios call to the backend
      const res = await axios.delete(
        `/api/deletePd/${newPdDetails.pdTrackerId}`
      );
      console.log(res.data);

      if (res.data.success) {
        alert(res.data.message);
        navigate("/userDashboard");
      }
    }
  };

  return editMode ? (
    <div>
      <EditPdForm
        toggleEdit={toggleEdit}
        newPdDetails={newPdDetails}
        setNewPdDetails={setNewPdDetails}
      />
      <button onClick={toggleEdit}>Cancel</button>
    </div>
  ) : (
    <div>
      <h1>{pdName}</h1>
      <h2>Provider of PD: {pdProvider}</h2>
      <h2>Number of Hours: {pdHours}</h2>
      <h2>Date Completed: {displayDate(pdDateCompleted)}</h2>
      <h2>Description: {pdDescription}</h2>
      <h2>Reflection: {pdReflection}</h2>
      {pdRecommend && <h2>Would you recommend: yes</h2>}
      {!pdRecommend && <h2>Would you recommend: no</h2>}

      <button onClick={toggleEdit}>Edit PD Information</button>
      <button onClick={deleteFunc}>Delete PD</button>

      <Link to="/myPds">
        <button>Return to PD List</button>
      </Link>

      <Link to="/userDashboard">
        <button>Return to Dashboard</button>
      </Link>
    </div>
  );
};

export default PdDetailPage;
