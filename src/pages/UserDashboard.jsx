import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate, Link, useLoaderData, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import React from "react";
import UpdateDegreeForm from "../components/UpdateDegreeForm";
import Chart from "react-apexcharts";

const UserDashboard = () => {
  const admin = useSelector((state) => state.admin);
  console.log(`DASHBOARD ADMIN: ${admin}`)

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
    userAdmin
  } = useLoaderData();
  const [showUpdateDegree, setShowUpdateDegree] = useState(false);

  const navigate = useNavigate();
  // const userId = useSelector((state) => state.userId); // from redux
  console.log(userId);
  // console.log(userDegree);
  console.log(`LOADER ADMIN: ${userAdmin}`)

  console.log(userPds)
  console.log(userCourses)

  // dispatch the Redux store to update the value of admin
  // if (userAdmin) {
  //   console.log("FOUND ADMIN")
  //   dispatch({
  //     type: "ADMIN_AUTH",
  //     payload: {userId: userId, admin: userAdmin}
  //   })
  // }


  // pd donut chart stuff
  console.log(userPds.map((pd) => pd.pdHours));
  // totalPdHours to be displayed in the chart title
  const totalPdHours = userPds.reduce((acc, pd) => {
    return acc + pd.pdHours;
  }, 0);

  const chartOptions = {
    chart: {
      type: "donut",
    },
    series: userPds.map((pd) => pd.pdHours),
    labels: userPds.map((pd) => pd.pd.pdName),
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val;
      },
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
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
      enabled: true,
      formatter: function (val, opts) {
        return `${opts.w.globals.labels[opts.seriesIndex]}: ${
          opts.w.globals.series[opts.seriesIndex]
        } hours`;
      },
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
    <div>
      <h1 className="text-3xl font-semibold">Welcome back, {fname}</h1>
      <h2 className="text-xl font-semibold">Professional Development:</h2>
      
      {/* if total pd hours > 0, then show chart */}
      {totalPdHours > 0 && (
        <Chart
          options={chartOptions}
          series={chartOptions.series}
          type="donut"
          height={350}
        />
      )}
      {/* if user hasn't added any pd hours, show message */}
      {totalPdHours <= 0 &&
      <h2>You haven't recorded any professional development hours yet. <br /> Click the button below to get started!</h2>
      }
      <Link to="/addPd">
        <button className="bg-blue-300 rounded-md w-32">Add New PD</button>{" "}
      </Link>
      <h2 className="text-xl font-semibold">Coursework:</h2>
      <h3>Current Salary Lane Progress:</h3>
      <h2>{userLane.laneName}</h2>
      <Chart
        options={gaugeOptions}
        series={chartData}
        type="radialBar"
        height={350}
      />
      <Link to="/addCourse">
        <button className="bg-blue-300 rounded-md w-40">Add New Course</button>{" "}
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
          <button>Update Degree</button>
        </Link>
      )}
    </div>
  );
};

export default UserDashboard;
