import { useLoaderData, NavLink, Link } from "react-router-dom";
import Header from "../components/Header";
import { CSVLink } from "react-csv";

const MyCoursesPage = () => {
  const { userCourses } = useLoaderData();

  // Make course list that displays each courseName that the user has completed with a link to that course's detail page.
  const courseItems = userCourses.map((course) => {
    return (
      <li
        className="flex items-center rounded-md bg-blueGray p-2"
        key={course.courseTrackerId}
      >
        <NavLink
          className="underline underline-offset-[3px]"
          to={`/courseTrackers/${course.courseTrackerId}`}
        >
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
    <div className="bg-greenGray flex h-[90vh] w-full justify-center">
      <div
        id="content-div"
        className="mt-4 flex w-[90%] flex-col md:w-[80%] lg:my-10 lg:w-[70%]"
      >
        <div
          id="my-courses-title"
          className="flex items-center justify-between"
        >
          <h2 className="text-xl">Completed Courses</h2>
          <CSVLink
            data={data}
            filename="myCourses.csv"
            className="bg-darkGreen border-darkGreen flex h-[34px] w-[25%] min-w-[110px] max-w-[175px] items-center justify-center rounded-lg text-sm font-semibold text-white md:text-base lg:text-base"
          >
            Download CSV
          </CSVLink>
        </div>
        <div id="course-list" className="my-10 w-full">
          <ul className="flex w-full flex-col justify-evenly gap-6">
            {courseItems}
          </ul>
        </div>
        <div
          id="add-course-btn-div"
          className="flex h-[10%] items-center justify-end"
        >
          <Link to="/addCourse">
            <button className="bg-darkGreen border-darkGreen flex h-[34px] w-[25%] min-w-[110px] max-w-[175px] items-center justify-center rounded-lg text-sm font-semibold text-white md:text-base lg:text-base">
              + Course
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyCoursesPage;
