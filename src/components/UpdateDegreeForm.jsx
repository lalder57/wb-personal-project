import { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateDegreeForm = () => {

  const [degreeId, setDegreeId] = useState("");
  const navigate = useNavigate();

  // create the handle UpdateDegree function
  const handleUpdateDegree = async (e) => {
    e.preventDefault();
    // create req.body object
    const degreeFormData = {
      degreeId,
    }
    
    // axios call to the update degree endpoint
    const res = await axios.post('/api/updateDegree', degreeFormData)

    if (res.data.success) {
      alert('Congratulations! Your degree has been updated.')
      navigate('/userDashboard');
    }
  }


  
  return (
    <form onSubmit={handleUpdateDegree}>
      Update Degree Form
      <label htmlFor="degreeId">degree:</label>
        <select value={degreeId} required onChange={(e) => setDegreeId(e.target.value)}>
          <option value="">Please choose a degree</option>
          <option value="1">bachelor's</option>
          <option value="2">master's</option>
          <option value="3">Ph.D.</option>          
        </select>
        <button type="submit">Save Degree</button>
    </form>
  )
}

export default UpdateDegreeForm
