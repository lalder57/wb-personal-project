import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate, Link, useLoaderData, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
import UpdateDegreeForm from "../components/UpdateDegreeForm";
import Chart from "react-apexcharts";
import { PiUserCircleThin } from "react-icons/pi";

const UserDashboard = () => {
  const admin = useSelector((state) => state.admin);
  console.log(`DASHBOARD ADMIN: ${admin}`);

  // redux value for admin, if true, conditionally render the adminDashboard
  const dispatch = useDispatch();
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
  // const userId = useSelector((state) => state.userId); // from redux
  console.log(userId);
  // console.log(userDegree);
  console.log(`LOADER ADMIN: ${userAdmin}`);

  console.log(userPds);
  console.log(userCourses);

  // dispatch the Redux store to update the value of admin
  // if (userAdmin) {
  //   console.log("FOUND ADMIN")
  //   dispatch({
  //     type: "ADMIN_AUTH",
  //     payload: {userId: userId, admin: userAdmin}
  //   })
  // }

  console.log(userPds.map((pd) => pd.pdTrackerId));
  const pdTrackerIds = userPds.map((pd) => pd.pdTrackerId);

  // pd donut chart stuff
  console.log(userPds.map((pd) => pd.pdHours));
  // totalPdHours to be displayed in the chart title
  const totalPdHours = userPds.reduce((acc, pd) => {
    return acc + pd.pdHours;
  }, 0);

  const chartOptions = {
    chart: {
      type: "donut",
      events: {
        dataPointSelection: function (event, chartContext, config) {
          const clickedIndex = config.dataPointIndex;
          const clickedLabel = config.w.config.labels[clickedIndex];
          const clickedValue = config.w.config.series[clickedIndex];

          const extraInfo = pdTrackerIds[clickedIndex];

          alert(
            `You clicked on ${clickedLabel} with value ${clickedValue}. Extra Info: ${extraInfo}`,
          );
          navigate(`/pdTrackers/${extraInfo}`);
        },
      },
    },
    series: userPds.map((pd) => pd.pdHours),
    labels: userPds.map((pd) => pd.pd.pdName),
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
            },
            value: {
              show: true,
            },
            total: {
              show: true,
              showAlways: true,
              label: "Total PD Hours:",
              formatter: function () {
                return totalPdHours;
              },
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: "bottom",
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
          size: "65%", // Size of the hollow area in the center
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
            color: "#888",
            fontSize: "17px",
          },
          value: {
            formatter: function () {
              return `${userCurrentProgress}/${userLane.needed}`;
            },
            color: "#111",
            fontSize: "36px",
            show: true,
            offsetY: 16,
          },
        },
      },
    },
    fill: {
      colors: ["#00E396"], // Color for the radial bar
    },
    // stroke: {
    //   lineCap: 'round', // Rounded end cap for the stroke
    // },
    labels: ["Lane Progress"], // Label in the center
  };

  // totalCourseCredits for gauge
  const totalCourseCredits = userCourses.reduce((acc, course) => {
    return acc + course.courseCredits;
  }, 0);
  // Chart data (Progress percentage)
  const chartData = [percentage];
  // const chartData = [((userCurrentProgress / + userLane.needed) * 100).toFixed(2)];
  // console.log(totalCourseCredits);

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
      className="bg-greenGray flex w-full flex-col items-center"
    >
      <div id="content-div" className="flex w-[90%] flex-col justify-between">
        <div id="name-div" className="my-5 ml-1 flex w-full justify-start">
          <h1 className="text-3xl font-semibold">
            {fname} {lname}
          </h1>
        </div>
        <div id="pd-title-div" className="mb-1 ml-1 flex w-full justify-start">
          <h2 className="text-xl">Professional Development:</h2>
        </div>
        <div
          id="pd-container"
          className="bg-greenGray mb-10 flex h-[40vh] w-full flex-col items-center justify-evenly rounded-lg opacity-90 shadow-[0_0px_20px_4px_rgba(0,0,0,0.1)]"
        >
          <div id="pd-chart-container" className="flex justify-center">
            {/* if total pd hours > 0, then show chart */}
            {totalPdHours > 0 && (
              <Chart
                options={chartOptions}
                series={chartOptions.series}
                type="donut"
                height={250}
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
          <div id="pd-btn-container" className="flex w-full justify-evenly">
            <Link to="/addPd">
              <button className="border-darkGreen bg-darkGreen flex h-8 w-28 items-center justify-center rounded-lg border text-white">
                Add New PD
              </button>
            </Link>
            <Link to="/myPds">
              <button className="border-darkGreen bg-darkGreen flex h-8 w-28 items-center justify-center rounded-lg border text-white">
                See All PDs
              </button>
            </Link>
          </div>
        </div>
        <div id="course-title-div" className="mb-1 ml-1 flex w-full">
          <h2 className="text-xl">Coursework:</h2>
        </div>
        <div
          id="course-container"
          className="bg-greenGray mb-10 flex h-[45vh] w-full flex-col items-center justify-around rounded-lg opacity-90 shadow-[0_0px_20px_4px_rgba(0,0,0,0.1)]"
        >
          <div
            id="gauge-container"
            className="flex items-center justify-center"
          >
            <Chart
              options={gaugeOptions}
              series={chartData}
              type="radialBar"
              height={350}
              className="-my-8"
            />
          </div>
          <div
            id="degree-div"
            className="flex w-[96%] flex-row items-center justify-between lg:flex-col"
          >
            {userLane.laneId <= 4 && (
              <>
                <div
                  id="gauge-title-div"
                  className="flex flex-col items-center"
                >
                  <h3 className="text-center text-sm md:text-base lg:text-lg">
                    Your current salary lane:
                  </h3>
                  <h2 className="text-darkGreen text-center text-sm font-semibold md:text-base lg:text-lg">
                    {userLane.laneName.toLowerCase()}
                  </h2>
                </div>
                <div id="user-degree" className="p-1">
                  <h2 className="text-center text-sm md:text-base lg:text-lg">
                    Your current degree:{" "}
                    <span className="text-darkGreen font-semibold">
                      {userDegree.degreeName}
                    </span>
                  </h2>
                </div>
                <div id="degree-needed" className="p-1">
                  <h2 className="text-center text-sm md:text-base lg:text-lg">
                    Degree needed to advance:{" "}
                    <span className="text-darkGreen font-semibold">
                      bachelor's
                    </span>
                  </h2>
                </div>
              </>
            )}
            {userLane.laneId === 5 ||
            userLane.laneId === 6 ||
            userLane.laneId === 7 ? (
              <>
                <div id="user-degree" className="p-1">
                  <h2 className="text-center text-sm md:text-lg">
                    Your current degree: {userDegree.degreeName}
                  </h2>
                </div>
                <div id="degree-needed" className="p-1">
                  <h2 className="text-center text-sm md:text-lg">
                    Degree needed for the next lane: master's
                  </h2>
                </div>
              </>
            ) : (
              <></>
            )}
            {userLane.laneId === 8 && (
              <>
                <div id="user-degree" className="p-1">
                  <h2 className="text-center text-sm md:text-lg">
                    Your current degree: {userDegree.degreeName}
                  </h2>
                </div>
                <div id="degree-needed" className="p-1">
                  <h2 className="text-center text-sm md:text-lg">
                    Degree needed for the next lane: Ph.D
                  </h2>
                </div>
              </>
            )}
            {userLane.laneId === 9 && (
              <>
                <div id="user-degree" className="p-1">
                  <h2 className="text-center text-sm md:text-lg">
                    Your current degree: {userDegree.degreeName}
                  </h2>
                </div>
                <div id="degree-needed" className="p-1">
                  <h2 className="text-center text-sm md:text-lg">
                    You're currently in the highest salary lane!
                  </h2>
                </div>
              </>
            )}
          </div>
          {/* <div
            id="gauge-div"
            className="flex h-[45%] w-full flex-col items-center justify-center lg:flex-row"
          > */}
          <div id="course-btn-container" className="flex w-full justify-evenly">
            <Link to="/addCourse">
              <button className="border-darkGreen bg-darkGreen flex h-8 w-36 items-center justify-center rounded-lg border text-white">
                Add New Course
              </button>
            </Link>
            <Link to="/myCourses">
              <button className="border-darkGreen bg-darkGreen flex h-8 w-36 items-center justify-center rounded-lg border text-white">
                See All Courses
              </button>
            </Link>

            {showUpdateDegree && (
              <Link to="/updateDegree">
                <button className="border-darkGreen bg-darkGreen flex h-8 w-36 items-center justify-center rounded-lg border text-white">
                  Update Degree
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default UserDashboard;
