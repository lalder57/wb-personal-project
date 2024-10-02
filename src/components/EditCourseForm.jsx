import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditCourseForm = ({
  toggleEdit,
  newCourseDetails,
  setNewCourseDetails,
}) => {
  const [courseProvider, setCourseProvider] = useState(
    newCourseDetails.courseProvider,
  );
  const [courseDateCompleted, setCourseDateCompleted] = useState(
    newCourseDetails.courseDateCompleted,
  ); //Should this be a string or a date?
  const [courseCredits, setCourseCredits] = useState(
    newCourseDetails.courseCredits,
  ); // Should this be a string or a number
  const [courseDescription, setCourseDescription] = useState(
    newCourseDetails.courseDescription,
  );
  const [courseReflection, setCourseReflection] = useState(
    newCourseDetails.courseReflection,
  );
  const [courseRecommend, setCourseRecommend] = useState(
    newCourseDetails.courseRecommend,
  );

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
    };
    const res = await axios.put(
      `/api/editCourse/${newCourseDetails.courseTrackerId}`,
      updatedCourseInfo,
    );
    console.log(res.data.courseTracker);

    if (res.data.success) {
      alert(res.data.message);
      toggleEdit();
      setNewCourseDetails(res.data.courseTracker);
    }
  };

  return (
    <form className="my-10 flex flex-col text-sm" onSubmit={handleEditCourse}>
      <label className="mb-1" htmlFor="courseProvider">
        Name of Provider
      </label>
      <input
        value={courseProvider}
        type="text"
        required
        onChange={(e) => setCourseProvider(e.target.value)}
        className="mb-6 h-10 rounded-lg px-2"
      />
      <label className="mb-1" htmlFor="courseCredits">
        Number of Credits
      </label>
      <input
        value={courseCredits}
        type="number"
        required
        min={0}
        max={5}
        onChange={(e) => setCourseHours(e.target.value)}
        className="mb-6 h-10 rounded-lg px-2"
      />
      <label className="mb-1" htmlFor="courseDateCompleted">
        Date Completed
      </label>
      <input
        value={courseDateCompleted}
        type="date"
        required
        onChange={(e) => setCourseDateCompleted(e.target.value)}
        className="mb-6 h-10 rounded-lg px-2"
      />
      <label className="mb-1" htmlFor="courseDescription">
        Description
      </label>
      <textarea
        value={courseDescription}
        onChange={(e) => setCourseDescription(e.target.value)}
        className="mb-6 h-20 rounded-lg border border-black p-2"
      />
      <label className="mb-1" htmlFor="courseReflection">
        Reflection
      </label>
      <textarea
        value={courseReflection}
        onChange={(e) => setCourseReflection(e.target.value)}
        className="mb-6 h-20 rounded-lg border border-black p-2"
      />
      <div
        id="courseRecommend-div"
        className="mb-10 flex h-10 items-center gap-5"
      >
        <label className="mb-1" htmlFor="courseRecommend">
          Would you recommend this to other teachers?
        </label>
        <input
          value={courseRecommend}
          type="checkbox"
          checked={courseRecommend}
          onChange={(e) => setCourseRecommend(e.target.checked)}
          className="mb-1 h-5 w-5"
        />
      </div>
      <div id="btn-contianer" className="flex gap-6">
        <button
          className="bg-darkGreen border-darkGreen flex h-[34px] w-[25%] min-w-[110px] max-w-[175px] items-center justify-center rounded-lg text-sm font-semibold text-white md:text-base lg:text-base"
          type="submit"
        >
          Update Course
        </button>
        <button
          className="bg-darkGreen border-darkGreen flex h-[34px] w-[25%] min-w-[110px] max-w-[175px] items-center justify-center rounded-lg text-sm font-semibold text-white md:text-base lg:text-base"
          onClick={toggleEdit}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditCourseForm;
