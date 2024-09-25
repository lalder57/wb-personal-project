import { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";



const EditPdForm = ({toggleEdit, newPdDetails, setNewPdDetails}) => {
  const [pdProvider, setPdProvider] = useState(newPdDetails.pdProvider);
  const [pdDateCompleted, setPdDateCompleted] = useState(newPdDetails.pdDateCompleted); //Should this be a string or a date?
  const [pdHours, setPdHours] = useState(newPdDetails.pdHours); // Should this be a string or a number
  const [pdDescription, setPdDescription] = useState(newPdDetails.pdDescription);
  const [pdReflection, setPdReflection] = useState(newPdDetails.pdReflection);
  const [pdRecommend, setPdRecommend] = useState(newPdDetails.pdRecommend);
  

  const navigate = useNavigate();

  const handleEditPd = async (e) => {
    e.preventDefault();
    const updatedPdInfo = {
      pdProvider,
      pdDateCompleted,
      pdHours,
      pdDescription,
      pdReflection,
      pdRecommend,
    }
    const res = await axios.put(`/api/editPd/${newPdDetails.pdTrackerId}`, updatedPdInfo);
    console.log(res.data.pdTracker)

    if (res.data.success) {
      alert(res.data.message)
      toggleEdit();
      setNewPdDetails(res.data.pdTracker)
    }



  }


  return (
    <form onSubmit={handleEditPd}>
      <label htmlFor="pdProvider">Name of Provider:</label>
      <input
        value={pdProvider}
        type="text"
        required
        onChange={(e) => setPdProvider(e.target.value)}
      />
      <label htmlFor="pdHours">Number of Hours:</label>
      <input
        value={pdHours}
        type="number"
        required
        onChange={(e) => setPdHours(e.target.value)}
      />
      <label htmlFor="pdDateCompleted">Date Completed:</label>
      <input
        value={pdDateCompleted}
        type="date"
        required
        onChange={(e) => setPdDateCompleted(e.target.value)}
      />
      <label htmlFor="pdDescription">Description:</label>
      <input
        value={pdDescription}
        type="text"
        onChange={(e) => setPdDescription(e.target.value)}
      />
      <label htmlFor="pdReflection">Reflection:</label>
      <input
        value={pdReflection}
        type="text"
        onChange={(e) => setPdReflection(e.target.value)}
      />
      <label htmlFor="pdRecommend">
        Would you recommend this to other teachers?
      </label>
      <input
        value={pdRecommend}
        type="checkbox"
        checked={pdRecommend}
        onChange={(e) => setPdRecommend(e.target.checked)}
      />
      <button type="submit">Update PD</button>
    </form>
  )
}

export default EditPdForm
