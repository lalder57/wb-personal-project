import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const CreatePdPage = () => {
  const [pdName, setPdName] = useState("");
  const [pdProvider, setPdProvider] = useState("");
  const [pdDateCompleted, setPdDateCompleted] = useState(""); //Should this be a string or a date?
  const [pdHours, setPdHours] = useState(''); // Should this be a string or a number
  const [pdDescription, setPdDescription] = useState("");
  const [pdReflection, setPdReflection] = useState("");
  const [pdRecommend, setPdRecommend] = useState(false);
  
  const navigate = useNavigate();

  const handleNewPd = async (e) => {
    e.preventDefault();
    const formData = {
      pdName, 
      pdProvider,
      pdHours,
      pdDateCompleted,
      pdDescription,
      pdReflection,
      pdRecommend
    }
    const res = await axios.post("/api/addpd", formData);
    console.log(res.data);
    
    // send some form of alert to the user so they know if their attempt was successful
    alert(res.data.message);
    // send back to userDashboard (has a loader to get new info from DB)
    navigate('/userDashboard')
  };

  return (
    <>
      <form onSubmit={handleNewPd}>
        Create New pd Form
        <label htmlFor="pdName">Name of pd:</label>
        <input
          value={pdName}
          type="text"
          required
          onChange={(e) => setPdName(e.target.value)}
        />
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
        <button type="submit">Create & Save PD</button>
      </form>
    </>
  );
};

export default CreatePdPage;
