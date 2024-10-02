import { useLoaderData, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import EditCourseForm from "../components/EditCourseForm";
import axios from "axios";

const CourseDetailPage = () => {
  const { courseDetails } = useLoaderData();
  const [editMode, setEditMode] = useState(false);
  const [newCourseDetails, setNewCourseDetails] = useState(courseDetails);
  const [courseName, setCourseName] = useState(courseDetails.course.courseName);

  console.log(courseDetails);

  const navigate = useNavigate();
  const {
    course,
    courseTrackerId,
    courseDateCompleted,
    courseDescription,
    courseCredits,
    courseProvider,
    courseRecommend,
    courseReflection,
  } = newCourseDetails;

  // console.log(courseRecommend);
  const toggleEdit = () => setEditMode(!editMode);

  const deleteFunc = async () => {
    // confirm message
    if (
      window.confirm(
        "You are about to delete a course. This will subtract from your total amount of course credits. Do you want to continue?",
      )
    ) {
      // axios call to the backend
      const res = await axios.delete(
        `/api/deleteCourse/${newCourseDetails.courseTrackerId}`,
      );
      console.log(res.data);

      if (res.data.success) {
        alert(res.data.message);
        navigate("/userDashboard");
      }
    }
  };

  console.log(newCourseDetails);

  return editMode ? (
    <div
      id="main-div"
      className="bg-greenGray flex h-[90vh] w-full justify-center"
    >
      <div
        id="content-div"
        className="mt-4 flex w-[90%] flex-col md:w-[80%] lg:my-10 lg:w-[70%]"
      >
        <div id="course-title" className="flex items-center">
          <h1 className="text-xl">{courseName}</h1>
        </div>

        <EditCourseForm
          toggleEdit={toggleEdit}
          newCourseDetails={newCourseDetails}
          setNewCourseDetails={setNewCourseDetails}
        />
      </div>
    </div>
  ) : (
    <div
      id="main-div"
      className="bg-greenGray flex h-[90vh] w-full justify-center"
    >
      <div
        id="content-div"
        className="mt-4 flex w-[90%] flex-col md:w-[80%] lg:my-10 lg:w-[70%]"
      >
        <div id="course-title" className="flex items-center">
          <h1 className="text-xl">{courseName}</h1>
        </div>
        <div
          id="course-details"
          className="my-10 flex flex-col justify-evenly gap-6"
        >
          <h2 className="flex items-center rounded-md bg-blueGray p-2">
            Provider of Course: {courseProvider}
          </h2>
          <h2 className="flex items-center rounded-md bg-blueGray p-2">
            Number of Credits: {courseCredits}
          </h2>
          <h2 className="flex items-center rounded-md bg-blueGray p-2">
            Date Completed: {courseDateCompleted}
          </h2>
          <h2 className="mflex items-center rounded-md bg-blueGray p-2">
            Description: {courseDescription}
          </h2>
          <h2 className="flex items-center rounded-md bg-blueGray p-2">
            Reflection: {courseReflection}
          </h2>
          {courseRecommend && (
            <h2 className="flex items-center rounded-md bg-blueGray p-2">
              Would you recommend: yes
            </h2>
          )}
          {!courseRecommend && (
            <h2 className="flexitems-center rounded-md bg-blueGray p-2">
              Would you recommend: no
            </h2>
          )}
        </div>

        <div id="first-btns" className="flex gap-6">
          <button
            className="bg-darkGreen border-darkGreen flex h-[34px] w-[25%] min-w-[110px] max-w-[175px] items-center justify-center rounded-lg text-sm font-semibold text-white md:text-base lg:text-base"
            onClick={toggleEdit}
          >
            Edit Course
          </button>
          <button
            className="bg-darkGreen border-darkGreen flex h-[34px] w-[25%] min-w-[110px] max-w-[175px] items-center justify-center rounded-lg text-sm font-semibold text-white md:text-base lg:text-base"
            onClick={deleteFunc}
          >
            Delete Course
          </button>
        </div>

        <div id="second-btns" className="absolute bottom-5">
          <Link to="/myCourses">
            <button className="text-darkGreen text-sm underline underline-offset-2 md:text-base lg:text-base">
              Return to Course List
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
