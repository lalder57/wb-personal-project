import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const CreateCoursePage = () => {
  const [courseName, setCourseName] = useState("");
  const [courseProvider, setCourseProvider] = useState("");
  const [courseDateCompleted, setCourseDateCompleted] = useState(""); //Should this be a string or a date?
  const [courseCredits, setCourseCredits] = useState(""); // Should this be a string or a number
  const [courseDescription, setCourseDescription] = useState("");
  const [courseReflection, setCourseReflection] = useState("");
  const [courseRecommend, setCourseRecommend] = useState(false);

  const userId = useSelector((state) => state.userId);
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate(-1);
  };

  const handleNewCourse = async (e) => {
    e.preventDefault();
    const formData = {
      courseName,
      courseProvider,
      courseCredits,
      courseDateCompleted,
      courseDescription,
      courseReflection,
      courseRecommend,
    };
    const res = await axios.post("/api/addCourse", formData);
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
          onSubmit={handleNewCourse}
          className="mt-5 flex flex-col text-sm md:mt-12 lg:mt-12"
        >
          <label className="mb-1" htmlFor="courseName">
            Name of Course
          </label>
          <input
            value={courseName}
            type="text"
            required
            onChange={(e) => setCourseName(e.target.value)}
            className="mb-6 h-10 rounded-lg px-2"
          />
          <label className="mb-1" htmlFor="courseProvider">
            Name of Provider
          </label>
          <input
            value={courseProvider}
            type="text"
            required
            onChange={(e) => setCourseProvider(e.target.value)}
            className="mb-6 h-10 rounded-lg px-2"
          />
          <label className="mb-1" htmlFor="courseCredits">
            Number of Credits
          </label>
          <input
            value={courseCredits}
            type="number"
            required
            min={0}
            max={5}
            onChange={(e) => setCourseCredits(e.target.value)}
            className="mb-6 h-10 rounded-lg px-2"
          />
          <label className="mb-1" htmlFor="courseDateCompleted">
            Date Completed
          </label>
          <input
            value={courseDateCompleted}
            type="date"
            required
            onChange={(e) => setCourseDateCompleted(e.target.value)}
            className="mb-6 h-10 rounded-lg px-2"
          />
          <label className="mb-1" htmlFor="courseDescription">
            Description
          </label>
          <textarea
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
            className="mb-6 h-20 rounded-lg border border-black p-2"
          />
          <label className="mb-1" htmlFor="courseReflection">
            Reflection
          </label>
          <textarea
            value={courseReflection}
            onChange={(e) => setCourseReflection(e.target.value)}
            className="mb-6 h-20 rounded-lg border border-black p-2"
          />
          <div
            id="courseRecommend-div"
            className="mb-10 flex h-10 items-center gap-5"
          >
            <label className="mb-1" htmlFor="courseRecommend">
              Would you recommend this to other teachers?
            </label>
            <input
              value={courseRecommend}
              type="checkbox"
              checked={courseRecommend}
              onChange={(e) => setCourseRecommend(e.target.checked)}
              className="mb-1 h-5 w-5"
            />
          </div>
          <div id="btn-contianer" className="flex gap-6">
            <button
              className="bg-darkGreen border-darkGreen flex h-[34px] w-[25%] min-w-[110px] max-w-[175px] items-center justify-center rounded-lg text-sm font-semibold text-white md:text-base lg:text-base"
              type="submit"
            >
              Save Course
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

export default CreateCoursePage;
