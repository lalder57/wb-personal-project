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
    return {
      "Course Name": `${course.course.courseName}`,
      "Date Completed": `${course.courseDateCompleted}`,
      "Number of Credits": `${course.courseCredits}`,
      "Provider of Course": `${course.courseProvider}`,
      "Activity Type": "course",
    };
  });

  const data = eachCourse;

  return (
    <div className="flex h-[90vh] w-full justify-center border border-black">
      <div
        id="content-div"
        className="border-darkGreen my-10 flex w-[90%] flex-col justify-between border"
      >
        <div id="my-courses-title" className="h-[10%] border border-black">
          <h2 className="text-xl">Completed Courses:</h2>
        </div>
        <div id="course-list" className="h-[30%] border border-black">
          <ul>{courseItems}</ul>
        </div>

        <CSVLink
          data={data}
          filename="myCourses.csv"
          className="h-[10%] border border-black"
        >
          Download CSV
        </CSVLink>
      </div>
    </div>
  );
};

export default MyCoursesPage;
