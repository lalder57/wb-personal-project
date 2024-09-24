import { useLoaderData, NavLink } from "react-router-dom";
import Header from "../components/Header";
import { CSVLink } from "react-csv";


const MyCoursesPage = () => {
  const { userCourses } = useLoaderData();
  
  // Make course list that displays each courseName that the user has completed with a link to that course's detail page.
  const courseItems = userCourses.map((course) => {
    return (
      <li key={course.courseTrackerId}>
        <NavLink to={`/courseTrackers/${course.courseTrackerId}`}>
          {course.course.courseName}
        </NavLink>
      </li>
    );
  });

  // CSV File stuff
  const eachCourse = userCourses.map((course) => {
    return (
      {
        "Course Name": `${course.course.courseName}`,
        "Date Completed": `${course.courseDateCompleted}`,
        "Number of Credits": `${course.courseCredits}`,
        "Provider of Course": `${course.courseProvider}`,
        "Activity Type": "course"
      }
    )
  });

  const data = eachCourse;

  return (
    <div>
      List of my completed courses: 
      <ul>{courseItems}</ul>

      <CSVLink data={data} filename="myCourses.csv">Download CSV</CSVLink>

      <button>Export to Excel</button>

    </div>
  )
}

export default MyCoursesPage
