
import { useLoaderData, NavLink } from "react-router-dom";
import Header from "../components/Header";
import { CSVLink } from "react-csv";

const MyPdsPage = () => {
  const { userPds } = useLoaderData();

  // Make pd list that displays each pdName that the user has completed with a link to that pd's detail page.
  const pdItems = userPds.map((pd) => {
    return (
      <li key={pd.pdTrackerId}>
        <NavLink to={`/pdTrackers/${pd.pdTrackerId}`}>{pd.pd.pdName}</NavLink>
      </li>
    );
  });

  // CSV File stuff
  const eachPd = userPds.map((pd) => {
    return (
      {
        "PD Name": `${pd.pd.pdName}`,
        "Date Completed": `${pd.pdDateCompleted}`,
        "Number of Hours": `${pd.pdHours}`,
        "Provider of PD": `${pd.pdProvider}`,
        "Activity Type": "PD"
      }
    )
  });

  const data = eachPd;
  return (
    <div>
      List of my completed pds: 
      <ul>{pdItems}</ul>

      <CSVLink data={data} filename="myPds.csv">Download CSV</CSVLink>
      
    </div>
  )
}

export default MyPdsPage
