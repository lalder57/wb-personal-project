import Chart from "react-apexcharts";

import {
  donutChartOptions,
  gaugeChartOptions,
} from "../assets/helper-functions.js";

const UserCard = ({ user }) => {
  const { chartOptions } = donutChartOptions(user.pd_trackers);
  // to display all users' names (maybe for titles of cards/charts?)

  const { gaugeOptions } = gaugeChartOptions(user);
  const { totalPdHours } = donutChartOptions(user.pd_trackers);

  return (
    <div className="mb-10 flex h-[55vh] flex-col items-center rounded-lg shadow-[0_0px_20px_4px_rgba(0,0,0,0.1)] md:h-[50vh] lg:mb-0 lg:h-[50vh]">
      <div id="content-div" className="flex h-full w-[90%] flex-col">
        <h1 className="my-2 text-xl font-semibold md:my-4 lg:mt-4">
          {user.fname} {user.lname}
        </h1>
        <div id="pd-div" className="mb-2 flex w-full lg:w-[90%]">
          <h2 className="text-lg">Professional Development:</h2>
        </div>
        <div id="chart-title-div" className="flex justify-center">
          <h3 className="text-darkGreen text-sm font-bold md:text-base">
            Total PD Hours:
          </h3>
        </div>
        <div
          id="pd-chart-container"
          className="mb-2 flex h-[42%] scale-[.8] items-center justify-center lg:-mt-4 lg:mb-0"
        >
          {/* if total pd hours > 0, then show chart */}
          {totalPdHours > 0 && (
            <Chart
              options={chartOptions}
              series={chartOptions.series}
              type="donut"
            />
          )}
          {/* if user hasn't added any pd hours, show message */}
          {totalPdHours <= 0 && (
            <h2>
              You haven't recorded any professional development hours yet.{" "}
              <br /> Click the button below to get started!
            </h2>
          )}
        </div>
        <div id="course-title-div" className="-mb-2 flex w-full lg:w-[90%]">
          <h2 className="text-lg">Coursework:</h2>
        </div>
        <div
          id="gauge-container"
          className="flex items-center justify-center md:scale-[1.2]"
        >
          <Chart
            options={gaugeOptions}
            series={gaugeOptions.series}
            type="radialBar"
            className="-mb-20 lg:-mb-20"
          />
        </div>
      </div>
    </div>
  );
};

export default UserCard;
