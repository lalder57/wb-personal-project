import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditCourseForm = ({toggleEdit, newCourseDetails, setNewCourseDetails}) => {

  const [courseProvider, setCourseProvider] = useState("");
  const [courseDateCompleted, setCourseDateCompleted] = useState(""); //Should this be a string or a date?
  const [courseCredits, setCourseCredits] = useState(''); // Should this be a string or a number
  const [courseDescription, setCourseDescription] = useState("");
  const [courseReflection, setCourseReflection] = useState("");
  const [courseRecommend, setCourseRecommend] = useState(false);
  

  const navigate = useNavigate();

  const handleEditCourse = async (e) => {
    e.preventDefault();
    const updatedCourseInfo = {
      courseProvider,
      courseDateCompleted,
      courseCredits,
      courseDescription,
      courseReflection,
      courseRecommend,
    }
    const res = await axios.put(`/api/editCourse/${newCourseDetails.courseTrackerId}`, updatedCourseInfo);
    console.log(res.data.courseTracker)

    if (res.data.success) {
      alert(res.data.message)
      toggleEdit();
      setNewCourseDetails(res.data.courseTracker)
    }

  }

  return (
    <form onSubmit={handleEditCourse}>
      <label htmlFor="courseProvider">Name of Provider:</label>
      <input
        value={courseProvider}
        type="text"
        required
        onChange={(e) => setCourseProvider(e.target.value)}
      />
      <label htmlFor="courseCredits">Number of Hours:</label>
      <input
        value={courseCredits}
        type="number"
        min={0}
        max={5}
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
      <button type="submit">Update course</button>
    </form>
  )
}

export default EditCourseForm
