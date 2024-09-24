import Header from "../components/Header";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useLoaderData, Link } from "react-router-dom";

const AddCourse = () => {
  // set state values for the input fields
  const [courseName, setCourseName] = useState("");
  const [courseProvider, setCourseProvider] = useState("");
  const [courseDateCompleted, setCourseDateCompleted] = useState(""); //Should this be a string or a date?
  const [courseCredits, setCourseCredits] = useState(''); // Should this be a string or a number
  const [courseDescription, setCourseDescription] = useState("");
  const [courseReflection, setCourseReflection] = useState("");
  const [courseRecommend, setCourseRecommend] = useState(false);
  const [showAddCourseForm, setShowAddCourseForm] = useState(false);
  // const [showCreateCourseForm, setShowCreateCourseForm] = useState(false);

  
  const navigate = useNavigate();
  // grab value from loader function in main.jsx to get display allCourses
  const { allCourses } = useLoaderData();

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
      courseRecommend
    }
    const res = await axios.post("/api/addCourse", formData);
    console.log(res.data);
    
    // send some form of alert to the user so they know if their attempt was successful
    alert(res.data.message);
    // send back to userDashboard (has a loader to get new info from DB)
    navigate('/userDashboard')
  };

  return (
    <> 
      <h1>Search for an existing course -</h1>

      {/* 
      -users can search the DB for an existing course. If it exists, 
      -selecting it will open a new page/modal/something with the courseTracker form that will have provider, hours, 
      dateCompleted, description, reflection, recommend input fields.
      -this courseTracker form will have a save course button that will add it to the DB */}

      <form>
        <label>
          Course Name:
          <select value={courseName} required onChange={(e) => setCourseName(e.target.value)}>
          <option value="" disabled>Select an option</option> 
            {/* do a map of the database courseNames to populate the options of this select */}
            {allCourses.map((course) => <option key={course.courseId} value={course.courseName}>{course.courseName}</option>)}
          </select>

          <button 
          type="submit" 
          disabled={!courseName}
            onClick={(e) => {
              e.preventDefault();
              setShowAddCourseForm(true)
            // setShowCreateCourseForm(false)
          }
        }>
            Add course
          </button>
        </label>
      </form>

        {/* If user clicks the Add course button */}

        {showAddCourseForm && (
          <>
            <h1>AddcourseForm</h1>
            <form onSubmit={handleNewCourse}>
            <label htmlFor="courseProvider">Name of Provider:</label>
              <input
                value={courseProvider}
                type="text"
                required
                onChange={(e) => setCourseProvider(e.target.value)}
              />
              <label htmlFor="courseCredits">Number of Credits:</label>
              <input
                value={courseCredits}
                type="number"
                // min={0}
                // max={5}
                required
                onChange={(e) => setCourseCredits(e.target.value)}
              />
              <label htmlFor="courseDateCompleted">Date Completed:</label>
              <input
                value={courseDateCompleted}
                type="date"
                required
                onChange={(e) => setCourseDateCompleted(e.target.value)}
              />
              <label htmlFor="courseDescription">Description:</label>
              <input
                value={courseDescription}
                type="text"
                onChange={(e) => setCourseDescription(e.target.value)}
              />
              <label htmlFor="courseReflection">Reflection:</label>
              <input
                value={courseReflection}
                type="text"
                onChange={(e) => setCourseReflection(e.target.value)}
              />
              <label htmlFor="courseRecommend">Would you recommend this to other teachers?</label>
              <input
                value={courseRecommend}
                type="checkbox"
                checked = {courseRecommend}
                onChange={(e) => setCourseRecommend(e.target.checked)}
              />
              <button type="submit">
                Save course
              </button>
            </form>
            
        
          </>
        )}
        
      <h2>Don't see it?</h2>
      <Link to={'/CreateCoursePage'}>
        <button>Create New course</button>
        </Link>
    </>
  );
};

export default AddCourse;

