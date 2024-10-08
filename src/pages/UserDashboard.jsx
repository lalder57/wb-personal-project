import { useSelector } from "react-redux";
import { useNavigate, Link, useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
import Chart from "react-apexcharts";

const UserDashboard = () => {
  const admin = useSelector((state) => state.admin);

  // redux value for admin, if true, conditionally render the adminDashboard
  const {
    fname,
    lname,
    userPds,
    userCourses,
    userId,
    userLane,
    userDegree,
    userCurrentProgress,
    userAdmin,
  } = useLoaderData();
  const [showUpdateDegree, setShowUpdateDegree] = useState(false);

  const navigate = useNavigate();

  const pdTrackerIds = userPds.map((pd) => pd.pdTrackerId);

  // pd donut chart stuff
  // totalPdHours to be displayed in the chart title
  const totalPdHours = userPds.reduce((acc, pd) => {
    return acc + pd.pdHours;
  }, 0);

  const chartOptions = {
    chart: {
      type: "donut",
      offsety: -10,
      events: {
        dataPointSelection: function (event, chartContext, config) {
          const clickedIndex = config.dataPointIndex;
          const clickedLabel = config.w.config.labels[clickedIndex];
          const clickedValue = config.w.config.series[clickedIndex];

          const extraInfo = pdTrackerIds[clickedIndex];

          navigate(`/pdTrackers/${extraInfo}`);
        },
        dataPointMouseEnter: function (event) {
          event.target.style.cursor = "pointer";
        },
      },
    },
    series: userPds.map((pd) => pd.pdHours),
    labels: userPds.map((pd) => pd.pd.pdName),
    colors: ["#CCE3DE", "#6B9080", "#A4C3B2"],
    states: {
      hover: {
        filter: {
          type: "none",
        },
      },
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
            },
            total: {
              show: true,
              showAlways: true,
              label: undefined,
            },
            value: {
              show: true,
              showAlways: true,
              offsetY: -7,
              fontWeight: "bold",
              color: "#6B9080",
              formatter: function () {
                return totalPdHours;
              },
            },
          },
          size: "65%",
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: "bottom",
      fontSize: "10px",
      offsetY: 10,
    },
  };

  // course gauge stuff
  //calculate percentage for gauge (to keep it working visually)
  const percentage = (userCurrentProgress / userLane.needed) * 100;

  const gaugeOptions = {
    chart: {
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        startAngle: -90, // Start angle of the radial bar
        endAngle: 90, // End angle of the radial bar
        hollow: {
          size: "55%", // Size of the hollow area in the center
        },
        track: {
          background: "#e7e7e7", // Track background color
          strokeWidth: "100%", // Full width
          margin: 5, // Margin in pixels
        },
        dataLabels: {
          show: true,
          name: {
            offsetY: -10,
            show: true,
            color: "#6B9080",
            fontSize: "14px",
          },
          value: {
            formatter: function () {
              return `${userCurrentProgress}/${userLane.needed}`;
            },
            color: "#111",
            fontSize: "20px",
            show: true,
            offsetY: 0,
          },
        },
      },
    },
    fill: {
      colors: ["#6B9080"], // Color for the radial bar
    },

    labels: ["Lane Credits"], // Label in the center
  };

  // totalCourseCredits for gauge
  const totalCourseCredits = userCourses.reduce((acc, course) => {
    return acc + course.courseCredits;
  }, 0);
  // Chart data (Progress percentage)
  const chartData = [percentage];

  // can't view userDashboard if you aren't logged in
  useEffect(() => {
    if (!userId) {
      alert("You can't visit this page without being logged in");
      navigate("/");
    }
  }, [userId]);

  useEffect(() => {
    if (userLane.laneId === 5 || userLane.laneId === 8) {
      setShowUpdateDegree(true);
    }
  }, []);

  return (
    <div
      id="main-div"
      className="bg-greenGray flex w-full flex-col items-center lg:h-[90vh] lg:justify-start"
    >
      <div
        id="content-div"
        className="flex w-[90%] flex-col justify-between lg:h-full lg:items-center lg:justify-start lg:pt-4"
      >
        <div
          id="name-div"
          className="my-5 ml-1 flex w-full justify-start lg:w-[95%]"
        >
          <h1 className="text-3xl font-semibold">
            {fname} {lname}
          </h1>
        </div>
        <div
          id="big-screen-container"
          className="lg:flex lg:h-full lg:w-full lg:flex-row"
        >
          <div
            id="big-screen-pd"
            className="items-center lg:flex lg:w-full lg:flex-col"
          >
            <div
              id="pd-title-div"
              className="mb-1 ml-1 flex w-full justify-start lg:w-[90%]"
            >
              <h2 className="text-xl">Professional Development:</h2>
            </div>

            <div
              id="pd-container"
              className="bg-greenGray mb-10 flex h-[45vh] w-full flex-col items-center justify-center rounded-lg shadow-[0_0px_20px_4px_rgba(0,0,0,0.1)] lg:h-[75%] lg:w-[90%]"
            >
              {totalPdHours > 0 && (
                <div id="chart-title-div">
                  <h3 className="text-darkGreen text-sm font-bold md:text-base lg:text-lg">
                    Total PD Hours:
                  </h3>
                </div>
              )}
              <div
                id="pd-chart-container"
                className="my-2 flex h-[65%] items-center justify-center lg:-mt-6 lg:scale-110"
              >
                {/* if total pd hours > 0, then show chart */}
                {totalPdHours > 0 && (
                  <Chart
                    options={chartOptions}
                    series={chartOptions.series}
                    type="donut"
                    className=""
                  />
                )}
                {/* if user hasn't added any pd hours, show message */}
                {totalPdHours <= 0 && (
                  <div id="no-pd-hours-div" className="-mt-10 w-[70%] lg:-mt-0">
                    <h2 className="mb-5 text-center text-lg">
                      You haven't recorded any professional development hours
                      yet.
                    </h2>
                    <h2 className="text-center text-lg">
                      Add a PD to get started!
                    </h2>
                  </div>
                )}
              </div>
              <div
                id="pd-btn-container"
                className="flex h-[13.5%] min-h-12 w-full items-center justify-around"
              >
                <Link
                  to="/addPd"
                  className="flex h-[70%] min-h-[34px] w-[30%] max-w-[175px] items-center justify-center"
                >
                  <button className="border-darkGreen bg-darkGreen flex h-full w-full items-center justify-center rounded-lg border text-sm text-white md:text-base lg:text-lg">
                    + New PD
                  </button>
                </Link>
                <Link
                  to="/myPds"
                  className="flex h-[70%] min-h-[34px] w-[30%] max-w-[175px] items-center justify-center"
                >
                  <button className="border-darkGreen bg-darkGreen flex h-full w-full items-center justify-center rounded-lg border text-sm text-white md:text-base lg:text-lg">
                    See All PDs
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div
            id="big-screen-course"
            className="items-center lg:flex lg:w-full lg:flex-col"
          >
            <div
              id="course-title-div"
              className="mb-1 ml-1 flex w-full lg:w-[90%]"
            >
              <h2 className="text-xl">Coursework:</h2>
            </div>
            <div
              id="course-container"
              className="bg-greenGray mb-10 flex h-[45vh] w-full flex-col items-center justify-around rounded-lg shadow-[0_0px_20px_4px_rgba(0,0,0,0.1)] lg:h-[75%] lg:w-[90%] lg:justify-center"
            >
              <div
                id="gauge-container"
                className="flex scale-125 items-center justify-center lg:scale-[1.4]"
              >
                <Chart
                  options={gaugeOptions}
                  series={chartData}
                  type="radialBar"
                  className="-mb-20 lg:-mb-20"
                />
              </div>
              <div
                id="degree-div"
                className="flex w-[96%] flex-row items-center justify-around lg:my-16"
              >
                {userLane.laneId <= 4 && (
                  <>
                    <div
                      id="salary-lane-div"
                      className="flex w-[30%] max-w-[140px] flex-col items-center"
                    >
                      <h3 className="text-center text-sm md:text-base lg:text-lg">
                        Your current salary lane:
                      </h3>
                      <h2 className="text-darkGreen text-center text-sm font-semibold md:text-base lg:text-lg">
                        {userLane.laneName.toLowerCase()}
                      </h2>
                    </div>
                    <div id="user-degree" className="w-[30%] max-w-[140px]">
                      <h2 className="text-center text-sm md:text-base lg:text-lg">
                        Your current degree:
                      </h2>
                      <h2 className="text-darkGreen text-center text-sm font-semibold md:text-base lg:text-lg">
                        {userDegree.degreeName}
                      </h2>
                    </div>
                    <div id="degree-needed" className="w-[30%] max-w-[140px]">
                      <h2 className="text-center text-sm md:text-base lg:text-lg">
                        Degree needed to advance:
                      </h2>

                      <h2 className="text-darkGreen text-center text-sm font-semibold md:text-base lg:text-lg">
                        bachelor's
                      </h2>
                    </div>
                  </>
                )}
                {userLane.laneId === 5 ||
                userLane.laneId === 6 ||
                userLane.laneId === 7 ? (
                  <>
                    <div
                      id="gauge-title-div"
                      className="flex w-[30%] max-w-[140px] flex-col items-center"
                    >
                      <h3 className="text-center text-sm md:text-base lg:text-lg">
                        Your current salary lane:
                      </h3>
                      <h2 className="text-darkGreen text-center text-sm font-semibold md:text-base lg:text-lg">
                        {userLane.laneName.toLowerCase()}
                      </h2>
                    </div>
                    <div id="user-degree" className="w-[30%] max-w-[140px]">
                      <h2 className="text-center text-sm md:text-base lg:text-lg">
                        Your current degree:
                      </h2>
                      <h2 className="text-darkGreen text-center text-sm font-semibold md:text-base lg:text-lg">
                        {userDegree.degreeName}
                      </h2>
                    </div>
                    <div id="degree-needed" className="w-[30%] max-w-[140px]">
                      <h2 className="text-center text-sm md:text-base lg:text-lg">
                        Degree needed to advance:
                      </h2>

                      <h2 className="text-darkGreen text-center text-sm font-semibold md:text-base lg:text-lg">
                        master's
                      </h2>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {userLane.laneId === 8 && (
                  <>
                    <div
                      id="gauge-title-div"
                      className="flex w-[30%] max-w-[140px] flex-col items-center"
                    >
                      <h3 className="text-center text-sm md:text-base lg:text-lg">
                        Your current salary lane:
                      </h3>
                      <h2 className="text-darkGreen text-center text-sm font-semibold md:text-base lg:text-lg">
                        {userLane.laneName.toLowerCase()}
                      </h2>
                    </div>
                    <div id="user-degree" className="w-[30%] max-w-[140px]">
                      <h2 className="text-center text-sm md:text-base lg:text-lg">
                        Your current degree:
                      </h2>
                      <h2 className="text-darkGreen text-center text-sm font-semibold md:text-base lg:text-lg">
                        {userDegree.degreeName}
                      </h2>
                    </div>
                    <div id="degree-needed" className="w-[30%] max-w-[140px]">
                      <h2 className="text-center text-sm md:text-base lg:text-lg">
                        Degree needed to advance:
                      </h2>

                      <h2 className="text-darkGreen text-center text-sm font-semibold md:text-base lg:text-lg">
                        Ph.D.
                      </h2>
                    </div>
                  </>
                )}
                {userLane.laneId === 9 && (
                  <>
                    <div
                      id="gauge-title-div"
                      className="flex w-[30%] max-w-[140px] flex-col items-center"
                    >
                      <h3 className="text-center text-sm md:text-base lg:text-lg">
                        Your current salary lane:
                      </h3>
                      <h2 className="text-darkGreen text-center text-sm font-semibold md:text-base lg:text-lg">
                        {userLane.laneName.toLowerCase()}
                      </h2>
                    </div>
                    <div id="user-degree" className="w-[30%] max-w-[140px]">
                      <h2 className="text-center text-sm md:text-base lg:text-lg">
                        Your current degree:
                      </h2>
                      <h2 className="text-darkGreen text-center text-sm font-semibold md:text-base lg:text-lg">
                        {userDegree.degreeName}
                      </h2>
                    </div>
                  </>
                )}
              </div>
              {/* <div
            id="gauge-div"
            className="flex h-[45%] w-full flex-col items-center justify-center lg:flex-row"
          > */}
              <div
                id="course-btn-container"
                className="flex h-[13.5%] min-h-12 w-full items-center justify-around"
              >
                <Link
                  to="/addCourse"
                  className="flex h-[70%] min-h-[34px] w-[30%] max-w-[175px] items-center justify-center"
                >
                  <button className="border-darkGreen bg-darkGreen flex h-full w-full items-center justify-center rounded-lg border text-sm text-white md:text-base lg:text-lg">
                    + New Course
                  </button>
                </Link>
                <Link
                  to="/myCourses"
                  className="flex h-[70%] min-h-[34px] w-[30%] max-w-[175px] items-center justify-center"
                >
                  <button className="border-darkGreen bg-darkGreen flex h-full w-full items-center justify-center rounded-lg border text-sm text-white md:text-base lg:text-lg">
                    See All Courses
                  </button>
                </Link>

                {showUpdateDegree && (
                  <Link
                    to="/updateDegree"
                    className="flex h-[70%] min-h-[34px] w-[30%] max-w-[175px] items-center justify-center"
                  >
                    <button className="border-darkGreen bg-darkGreen flex h-full w-full items-center justify-center rounded-lg border text-sm text-white md:text-base lg:text-lg">
                      Update Degree
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default UserDashboard;
