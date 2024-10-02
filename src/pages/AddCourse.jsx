import Header from "../components/Header";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useLoaderData, Link } from "react-router-dom";

const AddCourse = () => {
  // set state values for the input fields
  const [courseName, setCourseName] = useState("");
  const [courseProvider, setCourseProvider] = useState("");
  const [courseDateCompleted, setCourseDateCompleted] = useState(""); //Should this be a string or a date?
  const [courseCredits, setCourseCredits] = useState(""); // Should this be a string or a number
  const [courseDescription, setCourseDescription] = useState("");
  const [courseReflection, setCourseReflection] = useState("");
  const [courseRecommend, setCourseRecommend] = useState(false);
  const [showAddCourseForm, setShowAddCourseForm] = useState(false);
  // const [showCreateCourseForm, setShowCreateCourseForm] = useState(false);

  const navigate = useNavigate();
  // grab value from loader function in main.jsx to get display allCourses
  const { allCourses } = useLoaderData();

  const handleCancel = () => {
    navigate(-1);
  };

  // These functions are inline on the buttons -
  // function to know when to display the addcourseForm:
  // if addExistingcourseButton is clicked, then display the addcourseForm

  // function to know when to display the createcourseForm:
  // if createNewcourseButton is clicked, then display the createNewcourseForm

  // create functions for the two buttons in the two forms to send the axios calls when they are clicked
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
        {!showAddCourseForm && (
          <>
            <div id="add-course-title" className="flex items-center lg:mt-6">
              <h1 className="text-xl">Choose from existing courses</h1>
            </div>

            <form className="mb-10 mt-4 flex flex-col gap-4">
              <select
                value={courseName}
                required
                onChange={(e) => setCourseName(e.target.value)}
                className="h-[34px] w-[45%] min-w-[156px] max-w-[263px] cursor-pointer rounded-lg bg-blueGray px-2"
              >
                <option value="" disabled>
                  Select a Course
                </option>
                {/* do a map of the database courseNames to populate the options of this select */}
                {allCourses.map((course) => (
                  <option key={course.courseId} value={course.courseName}>
                    {course.courseName}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                disabled={!courseName}
                onClick={(e) => {
                  e.preventDefault();
                  setShowAddCourseForm(true);
                }}
                className="bg-darkGreen border-darkGreen flex h-[34px] w-[25%] min-w-[110px] max-w-[175px] items-center justify-center rounded-lg text-sm font-semibold text-white md:text-base lg:text-base"
              >
                Submit
              </button>
            </form>
          </>
        )}

        {/* If user clicks the Add course button */}

        {showAddCourseForm && (
          <>
            <h1 className="text-xl lg:mt-6">{courseName}</h1>
            <form
              onSubmit={handleNewCourse}
              className="my-10 flex flex-col text-sm"
            >
              <label className="mb-1" htmlFor="courseProvider">
                Name of Provider:
              </label>
              <input
                value={courseProvider}
                type="text"
                required
                onChange={(e) => setCourseProvider(e.target.value)}
                className="mb-6 h-10 rounded-lg px-2"
              />
              <label className="mb-1" htmlFor="courseCredits">
                Number of Credits:
              </label>
              <input
                value={courseCredits}
                type="number"
                // min={0}
                // max={5}
                required
                onChange={(e) => setCourseCredits(e.target.value)}
                className="mb-6 h-10 rounded-lg px-2"
              />
              <label className="mb-1" htmlFor="courseDateCompleted">
                Date Completed:
              </label>
              <input
                value={courseDateCompleted}
                type="date"
                required
                onChange={(e) => setCourseDateCompleted(e.target.value)}
                className="mb-6 h-10 rounded-lg px-2"
              />
              <label className="mb-1" htmlFor="courseDescription">
                Description:
              </label>
              <textarea
                value={courseDescription}
                onChange={(e) => setCourseDescription(e.target.value)}
                className="mb-6 h-20 rounded-lg border border-black p-2"
              />
              <label className="mb-1" htmlFor="courseReflection">
                Reflection:
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
                  onClick={() => setShowAddCourseForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        )}

        {!showAddCourseForm && (
          <div id="create-course-option-div">
            <h2 className="mb-2 text-xl">Don't see it?</h2>
            <div id="btn-container" className="flex flex-col">
              <Link
                to={"/CreateCoursePage"}
                className="h-[34px] w-[25%] min-w-[140px] max-w-[175px]"
              >
                <button className="bg-darkGreen border-darkGreen flex h-full w-full items-center justify-center rounded-lg text-sm font-semibold text-white md:text-base lg:text-base">
                  Create New Course
                </button>
              </Link>
            </div>
            <div id="second-btn" className="absolute bottom-5">
              <Link to="/myCourses">
                <button className="text-darkGreen text-sm underline underline-offset-2 md:text-base lg:text-base">
                  Return Course List
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddCourse;
