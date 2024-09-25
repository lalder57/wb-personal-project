import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const UpdateDegreeForm = () => {
  const [degreeId, setDegreeId] = useState("");
  const navigate = useNavigate();
  const userId = useSelector((state) => state.userId);

  // create the handle UpdateDegree function
  const handleUpdateDegree = async (e) => {
    e.preventDefault();
    // create req.body object
    const degreeFormData = {
      degreeId,
    };

    // axios call to the update degree endpoint
    const res = await axios.post("/api/updateDegree", degreeFormData);

    console.log(res.data);

    if (res.data.success) {
      alert("Congratulations! Your degree has been updated.");
      navigate("/userDashboard");
    }
  };
  useEffect(() => {
    if(!userId) {
      navigate('/')
    }
  },[])

  return (
    <div>
      <form onSubmit={handleUpdateDegree}>
        Update Degree Form
        <label htmlFor="degreeId">degree:</label>
        <select
          value={degreeId}
          required
          onChange={(e) => setDegreeId(e.target.value)}
        >
          <option value="">Please choose a degree</option>
          <option value="1">bachelor's</option>
          <option value="2">master's</option>
          <option value="3">Ph.D.</option>
        </select>
        <button type="submit">Save Degree</button>
      </form>
      <Link to='/userDashboard'>
        <button>Cancel</button>
      </Link>
    </div>
  );
};

export default UpdateDegreeForm;
