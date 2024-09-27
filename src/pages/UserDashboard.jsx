import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate, Link, useLoaderData, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
import UpdateDegreeForm from "../components/UpdateDegreeForm";
import Chart from "react-apexcharts";
import { FaRegUserCircle } from "react-icons/fa";

const UserDashboard = () => {
  const admin = useSelector((state) => state.admin);
  console.log(`DASHBOARD ADMIN: ${admin}`);

  // redux value for admin, if true, conditionally render the adminDashboard
  const dispatch = useDispatch();
  const {
    fname,
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
    labels: ["Current Progress"], // Label in the center
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
    <div className="flex h-[100vh] w-[100vw] flex-col justify-around">
      <div className="flex flex-row">
        <FaRegUserCircle className="h-10 w-10" />
        <h1 className="text-3xl font-semibold">Welcome back, {fname}</h1>
      </div>
      <h2 className="text-xl">Professional Development:</h2>
      <div
        id="pd-container"
        className="flex h-[30vh] w-[100vw] flex-row border border-black"
      >
        <div
          id="pd-chart-container"
          className="border-mint flex w-1/2 items-center border"
        >
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
        <div
          id="add-pd-btn-container"
          className="flex h-full w-1/2 flex-col items-center justify-evenly border border-black"
        >
          <Link to="/addPd">
            <button className="border-ashGray bg-ashGray flex h-8 w-28 items-center justify-center rounded-md border text-white">
              Add New PD
            </button>
          </Link>
          <Link to="/myPds">
            <button className="border-ashGray bg-ashGray flex h-8 w-28 items-center justify-center rounded-md border text-white">
              See All PDs
            </button>
          </Link>
        </div>
      </div>
      <h2 className="text-xl">Coursework:</h2>
      <div id="course-container" className="border-darkGray border">
        <h3>Current Salary Lane Progress:</h3>
        <h2>{userLane.laneName}</h2>
        <Chart
          options={gaugeOptions}
          series={chartData}
          type="radialBar"
          height={350}
        />
        <Link to="/addCourse">
          <button className="border-ashGray bg-ashGray flex h-8 w-36 items-center justify-center rounded-md border text-white">
            Add New Course
          </button>
        </Link>

        {userLane.laneId <= 4 && (
          <div>
            <h2>Degree needed for the next lane: bachelor's</h2>
            <h2>Your current degree: {userDegree.degreeName}</h2>
          </div>
        )}
        {userLane.laneId === 5 ||
        userLane.laneId === 6 ||
        userLane.laneId === 7 ? (
          <div>
            <h2>Degree needed for the next lane: master's</h2>
            <h2>Your current degree: {userDegree.degreeName}</h2>
          </div>
        ) : (
          <></>
        )}
        {userLane.laneId === 8 && (
          <div>
            <h2>Degree needed for the next lane: Ph.D</h2>
            <h2>Your current degree: {userDegree.degreeName}</h2>
          </div>
        )}
        {userLane.laneId === 9 && (
          <div>
            <h2>You are currently in the highest lane!</h2>
            <h2>Your current degree:{userDegree.degreeName}</h2>
          </div>
        )}
        {showUpdateDegree && (
          <Link to="/updateDegree">
            <button className="border-ashGray bg-ashGray flex h-8 w-36 items-center justify-center rounded-md border text-white">
              Update Degree
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
