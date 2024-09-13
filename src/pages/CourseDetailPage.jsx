import { useLoaderData, Link } from "react-router-dom";

const CourseDetailPage = () => {
  const { courseDetails } = useLoaderData();

  const {
    course,
    courseDateCompleted,
    courseDescription,
    courseCredits,
    courseProvider,
    courseRecommend,
    courseReflection,
  } = courseDetails;

  console.log(courseRecommend);

  return (
    <div>
      <h1>{course.courseName}</h1>
      <h2>Provider of course: {courseProvider}</h2>
      <h2>Number of Hours: {courseCredits}</h2>
      <h2>Date Completed: {courseDateCompleted}</h2>
      <h2>Description: {courseDescription}</h2>
      <h2>Reflection: {courseReflection}</h2>
      {courseRecommend && <h2>Would you recommend: yes</h2>}
      {!courseRecommend && <h2>Would you recommend: no</h2>}
      
      <Link to="/userDashboard">
        <button>Return to Dashboard</button>
      </Link>
    </div>
  );
};

export default CourseDetailPage;
