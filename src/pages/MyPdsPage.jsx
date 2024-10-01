import { useLoaderData, NavLink, Link } from "react-router-dom";
import Header from "../components/Header";
import { CSVLink } from "react-csv";

const MyPdsPage = () => {
  const { userPds } = useLoaderData();

  // Make pd list that displays each pdName that the user has completed with a link to that pd's detail page.
  const pdItems = userPds.map((pd) => {
    return (
      <li
        className="flex h-8 items-center rounded-md bg-blueGray p-2 md:h-10 lg:h-10"
        key={pd.pdTrackerId}
      >
        <NavLink
          className="underline underline-offset-[3px]"
          to={`/pdTrackers/${pd.pdTrackerId}`}
        >
          {pd.pd.pdName}
        </NavLink>
      </li>
    );
  });

  // CSV File stuff
  const eachPd = userPds.map((pd) => {
    return {
      "PD Name": `${pd.pd.pdName}`,
      "Date Completed": `${pd.pdDateCompleted}`,
      "Number of Hours": `${pd.pdHours}`,
      "Provider of PD": `${pd.pdProvider}`,
      "Activity Type": "PD",
    };
  });

  const data = eachPd;
  return (
    <div className="bg-greenGray flex h-[90vh] w-full justify-center">
      <div
        id="content-div"
        className="my-4 flex w-[90%] flex-col md:w-[80%] lg:my-10 lg:w-[70%]"
      >
        <div
          id="my-pd-title"
          className="flex h-[10%] items-center justify-between"
        >
          <h2 className="text-xl">Completed Activities</h2>
          <CSVLink
            data={data}
            filename="myPds.csv"
            className="bg-darkGreen border-darkGreen flex h-[34px] w-[25%] min-w-[110px] max-w-[175px] items-center justify-center rounded-lg text-sm font-semibold text-white md:text-base lg:text-base"
          >
            Download CSV
          </CSVLink>
        </div>
        <div id="pd-list" className="my-10 w-full">
          <ul className="flex w-full flex-col justify-evenly gap-6">
            {pdItems}
          </ul>
        </div>
        <div
          id="add-pd-btn-div"
          className="flex h-[10%] items-center justify-end"
        >
          <Link to="/addPd">
            <button className="bg-darkGreen border-darkGreen flex h-[34px] w-[25%] min-w-[110px] max-w-[175px] items-center justify-center rounded-lg text-sm font-semibold text-white md:text-base lg:text-base">
              + PD
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyPdsPage;
