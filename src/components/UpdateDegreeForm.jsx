import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const UpdateDegreeForm = () => {
  const [degreeId, setDegreeId] = useState("");
  const navigate = useNavigate();
  const userId = useSelector((state) => state.userId);

  const handleCancel = () => {
    navigate(-1);
  };

  // create the handle UpdateDegree function
  const handleUpdateDegree = async (e) => {
    e.preventDefault();
    // create req.body object
    const degreeFormData = {
      degreeId,
    };

    // axios call to the update degree endpoint
    const res = await axios.post("/api/updateDegree", degreeFormData);

    console.log(res.data);

    if (res.data.success) {
      alert("Congratulations! Your degree has been updated.");
      navigate("/userDashboard");
    }
  };
  useEffect(() => {
    if (!userId) {
      navigate("/");
    }
  }, []);

  return (
    <div
      id="main-div"
      className="flex h-[90vh] w-full justify-center border border-black"
    >
      <div
        id="content-div"
        className="mt-6 flex w-[90%] flex-col md:w-[80%] lg:w-[70%]"
      >
        <form
          onSubmit={handleUpdateDegree}
          className="mb-10 mt-4 flex flex-col gap-4"
        >
          <h2 className="pl-1 text-xl">Update Degree Form</h2>
          <select
            value={degreeId}
            required
            onChange={(e) => setDegreeId(e.target.value)}
            className="my-6 h-[34px] w-[62%] max-w-[263px] cursor-pointer rounded-lg bg-blueGray px-2"
          >
            <option value="" disabled>
              Please choose a degree
            </option>
            <option value="1">bachelor's</option>
            <option value="2">master's</option>
            <option value="3">Ph.D.</option>
          </select>
          <div id="form-btn-container" className="flex gap-6">
            <button
              type="submit"
              className="bg-darkGreen border-darkGreen flex h-[34px] w-[25%] min-w-[110px] max-w-[175px] items-center justify-center rounded-lg text-sm font-semibold text-white md:text-base lg:text-base"
            >
              Save Degree
            </button>
            <button
              onClick={handleCancel}
              className="bg-darkGreen border-darkGreen flex h-[34px] w-[25%] min-w-[110px] max-w-[175px] items-center justify-center rounded-lg text-sm font-semibold text-white md:text-base lg:text-base"
            >
              Cancel
            </button>
          </div>
        </form>
        <div id="second-btn" className="absolute bottom-5">
          <Link to="/userDashboard">
            <button className="text-darkGreen text-sm underline underline-offset-2 md:text-base lg:text-base">
              Return to Dashboard
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UpdateDegreeForm;
