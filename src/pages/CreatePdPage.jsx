import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const CreatePdPage = () => {
  const [pdName, setPdName] = useState("");
  const [pdProvider, setPdProvider] = useState("");
  const [pdDateCompleted, setPdDateCompleted] = useState(""); //Should this be a string or a date?
  const [pdHours, setPdHours] = useState(""); // Should this be a string or a number
  const [pdDescription, setPdDescription] = useState("");
  const [pdReflection, setPdReflection] = useState("");
  const [pdRecommend, setPdRecommend] = useState(false);

  const userId = useSelector((state) => state.userId);

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(-1);
  };

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
    const res = await axios.post("/api/addpd", formData);
    console.log(res.data);

    // send some form of alert to the user so they know if their attempt was successful
    alert(res.data.message);
    // send back to userDashboard (has a loader to get new info from DB)
    navigate("/userDashboard");
  };

  useEffect(() => {
    if (!userId) {
      navigate("/");
    }
  }, []);

  return (
    <div
      id="main-div"
      className="bg-greenGray flex h-[90vh] w-full justify-center"
    >
      <div
        id="content-div"
        className="flex w-[90%] flex-col md:w-[80%] lg:w-[70%]"
      >
        <form
          onSubmit={handleNewPd}
          className="mt-5 flex flex-col text-sm md:mt-12 lg:mt-12"
        >
          <label className="mb-1" htmlFor="pdName">
            Name of PD
          </label>
          <input
            value={pdName}
            type="text"
            required
            onChange={(e) => setPdName(e.target.value)}
            className="mb-6 h-10 rounded-lg px-2"
          />
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
            Description
          </label>
          <textarea
            value={pdDescription}
            onChange={(e) => setPdDescription(e.target.value)}
            className="mb-6 h-20 rounded-lg border border-black p-2"
          />
          <label className="mb-1" htmlFor="pdReflection">
            Reflection
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
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePdPage;
