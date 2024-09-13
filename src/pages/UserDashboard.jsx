import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate, Link, useLoaderData, NavLink } from "react-router-dom";
import { useEffect } from "react";
import Header from "../components/Header";

const UserDashboard = () => {
  // const dispatch = useDispatch();
  const { userPds, userCourses } = useLoaderData();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.userId);
  console.log(userId);

  // Make pd list that displays each pdName that the user has completed with a link to that pd's detail page.
  const pdItems = userPds.map((pd) => {
    return <li key={pd.pdTrackerId}>
      <NavLink to={`/pdTrackers/${pd.pdTrackerId}`}>{pd.pd.pdName}</NavLink>
    </li>
  })

  // Make course list that displays each courseName that the user has completed with a link to that course's detail page.
  const courseItems = userCourses.map((course) => {
    return <li key={course.courseTrackerId}>
      <NavLink to={`/courseTrackers/${course.courseTrackerId}`}>{course.course.courseName}</NavLink>
    </li>
  })

  
  
  //can't view userDashboard if you aren't logged in
  useEffect(() => {
    if (!userId) {
      alert("You can't visit this page without being logged in");
      navigate("/");
    }
  }, [userId]);

  return (
    <div>
      <Header />
      <h1 className="text-3xl font-semibold">User Dashboard</h1>
      <h2 className="text-xl font-semibold">My PD progress:</h2>
      show list of completed PDs here 
      <ul>
        {pdItems}
      </ul>
      <Link to='/addPd'>
        <button className="bg-blue-300 rounded-md w-32">Add New PD</button> {/* Route to AddPd */}
      </Link>
      <h2 className="text-xl font-semibold">Next Lane Change</h2>
      show list of completed Courses here 
      <ul>
        {courseItems}
      </ul>
      <Link to='/addCourse'>
        <button className="bg-blue-300 rounded-md w-40">Add New Course</button> {/* Route to AddCourse */}
      </Link>
    </div>
  );
};

export default UserDashboard;
