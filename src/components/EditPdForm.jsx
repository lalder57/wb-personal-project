import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EditPdForm = ({ toggleEdit, newPdDetails, setNewPdDetails }) => {
  const [pdProvider, setPdProvider] = useState(newPdDetails.pdProvider);
  const [pdDateCompleted, setPdDateCompleted] = useState(
    newPdDetails.pdDateCompleted,
  ); //Should this be a string or a date?
  const [pdHours, setPdHours] = useState(newPdDetails.pdHours); // Should this be a string or a number
  const [pdDescription, setPdDescription] = useState(
    newPdDetails.pdDescription,
  );
  const [pdReflection, setPdReflection] = useState(newPdDetails.pdReflection);
  const [pdRecommend, setPdRecommend] = useState(newPdDetails.pdRecommend);

  const navigate = useNavigate();

  const handleEditPd = async (e) => {
    e.preventDefault();
    const updatedPdInfo = {
      pdProvider,
      pdDateCompleted,
      pdHours,
      pdDescription,
      pdReflection,
      pdRecommend,
    };
    const res = await axios.put(
      `/api/editPd/${newPdDetails.pdTrackerId}`,
      updatedPdInfo,
    );
    console.log(res.data.pdTracker);

    if (res.data.success) {
      alert(res.data.message);
      toggleEdit();
      setNewPdDetails(res.data.pdTracker);
    }
  };

  return (
    <form className="my-10 flex flex-col text-sm" onSubmit={handleEditPd}>
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
      <div id="pdRecommend-div" className="mb-10 flex h-10 items-center gap-5">
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
          Update PD
        </button>
        <button
          className="bg-darkGreen border-darkGreen flex h-[34px] w-[25%] min-w-[110px] max-w-[175px] items-center justify-center rounded-lg text-sm font-semibold text-white md:text-base lg:text-base"
          onClick={toggleEdit}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditPdForm;
