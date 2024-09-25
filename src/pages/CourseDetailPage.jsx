import { useLoaderData, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import EditCourseForm from "../components/EditCourseForm";
import axios from "axios";

const CourseDetailPage = () => {
  const { courseDetails } = useLoaderData();
  const [editMode, setEditMode] = useState(false);
  const [newCourseDetails, setNewCourseDetails] = useState(courseDetails);
  const [courseName, setCourseName] = useState(courseDetails.course.courseName)

  console.log(courseDetails)

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
  const toggleEdit = () => setEditMode(!editMode)

  const deleteFunc = async () => {
    // confirm message
    if (
      window.confirm(
        "You are about to delete a course. This will subtract from your total amount of course credits. Do you want to continue?"
      )
    ) {
      // axios call to the backend
      const res = await axios.delete(
        `/api/deleteCourse/${newCourseDetails.courseTrackerId}`
      );
      console.log(res.data);

      if (res.data.success) {
        alert(res.data.message);
        navigate("/userDashboard");
      }
    }
  };

  console.log(newCourseDetails)

  return editMode ? (
    <div>
      <EditCourseForm
        toggleEdit={toggleEdit} 
        newCourseDetails={newCourseDetails}
        setNewCourseDetails={setNewCourseDetails}
      />
      <button onClick={toggleEdit}>Cancel</button>
    </div>
  ) :(
    <div>
      <h1>{courseName}</h1>
      <h2>Provider of course: {courseProvider}</h2>
      <h2>Number of Hours: {courseCredits}</h2>
      <h2>Date Completed: {courseDateCompleted}</h2>
      <h2>Description: {courseDescription}</h2>
      <h2>Reflection: {courseReflection}</h2>
      {courseRecommend && <h2>Would you recommend: yes</h2>}
      {!courseRecommend && <h2>Would you recommend: no</h2>}
      
      <button onClick={toggleEdit}>Edit Course Information</button>
      <button onClick={deleteFunc}>Delete Course</button>

      <Link to="/myCourses">
        <button>Return to Course List</button>
      </Link>
      <Link to="/userDashboard">
        <button>Return to Dashboard</button>
      </Link>

    </div>
  );
};

export default CourseDetailPage;
