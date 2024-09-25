import Chart from "react-apexcharts";

import {
  donutChartOptions,
  gaugeChartOptions,
} from "../assets/helper-functions.js";

const UserCard = ({ user }) => {
  const { chartOptions } = donutChartOptions(user.pd_trackers);
  // to display all users' names (maybe for titles of cards/charts?)

  const { gaugeOptions } = gaugeChartOptions(user);

  return (
    <div className="h-full w-full flex flex-row flex-wrap justify-center">
      <div className="h-96 w-72 bg-blue-100 border-2 border-black">
        <h1>
          {user.fname} {user.lname}
        </h1>
        <div>
          <h2>Professional Development:</h2>
          <Chart
            options={chartOptions}
            series={chartOptions.series}
            type="donut"
            height={150}
          />
        </div>
        <div>
          <h2>Coursework:</h2>
          <Chart
            options={gaugeOptions}
            series={gaugeOptions.series}
            type="radialBar"
            height={150}
          />
        </div>
      </div>
    </div>
  );
};

export default UserCard;
