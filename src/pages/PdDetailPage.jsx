import { useLoaderData, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import EditPdForm from "../components/EditPdForm";

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

  const toggleEdit = () => setEditMode(!editMode);

  const deleteFunc = async () => {
    // confirm message
    if (
      window.confirm(
        "You are about to delete a PD. This will subtract from your total amount of PD hours. Do you want to continue?",
      )
    ) {
      // axios call to the backend
      const res = await axios.delete(
        `/api/deletePd/${newPdDetails.pdTrackerId}`,
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
    <div
      id="main-div"
      className="bg-greenGray flex h-[90vh] w-full justify-center"
    >
      <div
        id="content-div"
        className="my-4 flex w-[90%] flex-col md:w-[80%] lg:my-10 lg:w-[70%]"
      >
        <div id="pd-title" className="flex items-center justify-between">
          <h1 className="text-xl">{pdName}</h1>
        </div>
        <div
          id="pd-details"
          className="my-10 flex flex-col justify-evenly gap-6"
        >
          <h2 className="flex items-center rounded-md bg-blueGray p-2">
            Provider of PD: {pdProvider}
          </h2>
          <h2 className="flex items-center rounded-md bg-blueGray p-2">
            Number of Hours: {pdHours}
          </h2>
          <h2 className="flex items-center rounded-md bg-blueGray p-2">
            Date Completed: {pdDateCompleted}
          </h2>
          <h2 className="mflex items-center rounded-md bg-blueGray p-2">
            Description: {pdDescription}
          </h2>
          <h2 className="flex items-center rounded-md bg-blueGray p-2">
            Reflection: {pdReflection}
          </h2>
          {pdRecommend && (
            <h2 className="flex items-center rounded-md bg-blueGray p-2">
              Would you recommend: yes
            </h2>
          )}
          {!pdRecommend && (
            <h2 className="flexitems-center rounded-md bg-blueGray p-2">
              Would you recommend: no
            </h2>
          )}
        </div>

        <div id="first-btns" className="flex justify-between">
          <button
            className="bg-darkGreen border-darkGreen flex h-[34px] w-[25%] min-w-[110px] max-w-[175px] items-center justify-center rounded-lg text-sm font-semibold text-white md:text-base lg:text-base"
            onClick={toggleEdit}
          >
            Edit PD
          </button>
          <button
            className="bg-darkGreen border-darkGreen flex h-[34px] w-[25%] min-w-[110px] max-w-[175px] items-center justify-center rounded-lg text-sm font-semibold text-white md:text-base lg:text-base"
            onClick={deleteFunc}
          >
            Delete PD
          </button>
        </div>

        <div id="second-btns" className="absolute bottom-5">
          <Link to="/myPds">
            <button className="text-darkGreen text-sm underline underline-offset-2 md:text-base lg:text-base">
              Return to PD List
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PdDetailPage;
