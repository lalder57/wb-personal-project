import Chart from "react-apexcharts";

import donutChartOptions from "../assets/helper-functions.js";

const UserCard = ({user}) => {
  const { totalPdHours, chartOptions } = donutChartOptions(user.pd_trackers);
  // to display all users' names (maybe for titles of cards/charts?)
  
  return (
    <div>
      <h1>{user.fname} {user.lname}</h1>
      <Chart
        options={chartOptions}
        series={chartOptions.series}
        type="donut"
        height={150}
      />
    </div>
  );
};

export default UserCard;
