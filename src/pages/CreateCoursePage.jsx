import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const CreateCoursePage = () => {
  const [courseName, setCourseName] = useState("");
  const [courseProvider, setCourseProvider] = useState("");
  const [courseDateCompleted, setCourseDateCompleted] = useState(""); //Should this be a string or a date?
  const [courseCredits, setCourseCredits] = useState(''); // Should this be a string or a number
  const [courseDescription, setCourseDescription] = useState("");
  const [courseReflection, setCourseReflection] = useState("");
  const [courseRecommend, setCourseRecommend] = useState(false);
  
  const userId = useSelector((state) => state.userId);
  const navigate = useNavigate();

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
  useEffect(() => {
    if(!userId) {
      navigate('/')
    }
  },[])

  return (
    <>
      <form onSubmit={handleNewCourse}>
        Create New course Form
        <label htmlFor="courseName">Name of course:</label>
        <input
          value={courseName}
          type="text"
          required
          onChange={(e) => setCourseName(e.target.value)}
        />
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
        <label htmlFor="courseRecommend">
          Would you recommend this to other teachers?
        </label>
        <input
          value={courseRecommend}
          type="checkbox"
          checked={courseRecommend}
          onChange={(e) => setCourseRecommend(e.target.checked)}
        />
        <button type="submit">Create & Save course</button>
      </form>
      <Link to='/addCourse'>
        <button>Cancel</button>
      </Link>
    </>
  );
};

export default CreateCoursePage;
