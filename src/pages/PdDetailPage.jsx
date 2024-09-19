import { useLoaderData, Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import EditPdForm from "../components/EditPdForm";

const PdDetailPage = () => {
  const { pdDetails } = useLoaderData();
  const [editMode, setEditMode] = useState(false);
  const [newPdDetails, setNewPdDetails] = useState(pdDetails);
  const [pdName, setPdName] = useState(pdDetails.pd.pdName)
  
  console.log("newPdDetails: ", newPdDetails)
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

  console.log(pdRecommend);

  const toggleEdit = () => setEditMode(!editMode)

  return editMode ? (
    <div>
      <EditPdForm
        toggleEdit={toggleEdit} 
        newPdDetails={newPdDetails}
        setNewPdDetails={setNewPdDetails}
      />
    </div>
  ) : (
    <div>
      <h1>{pdName}</h1>
      <h2>Provider of PD: {pdProvider}</h2>
      <h2>Number of Hours: {pdHours}</h2>
      <h2>Date Completed: {pdDateCompleted}</h2>
      <h2>Description: {pdDescription}</h2>
      <h2>Reflection: {pdReflection}</h2>
      {pdRecommend && <h2>Would you recommend: yes</h2>}
      {!pdRecommend && <h2>Would you recommend: no</h2>}

      <button onClick={toggleEdit}>Edit PD Information</button>
      <button>Delete PD</button>

      <Link to="/userDashboard">
        <button>Return to Dashboard</button>
      </Link>
    </div>
  );
};

export default PdDetailPage;

