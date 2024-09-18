import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate, Link, useLoaderData, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import React from "react";
import UpdateDegreeForm from "../components/UpdateDegreeForm";
// import { Doughnut } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Chart from "react-apexcharts";

const UserDashboard = () => {
  const dispatch = useDispatch();
  const {
    userPds,
    userCourses,
    userId,
    userLane,
    userDegree,
    userCurrentProgress,
  } = useLoaderData();
  const [showUpdateDegree, setShowUpdateDegree] = useState(false);
  // const [userPds, setUserPds] = useState([])
  // const [userCourses, setUserCourses] = useState([])

  //check to see if userLane is 5 or 8, if so, setShowUpdateDegree(true)

  // something for the chart to work
  // ChartJS.register(ArcElement, Tooltip, Legend);

  const navigate = useNavigate();
  // const userId = useSelector((state) => state.userId); // from redux
  console.log(userId);

  // Make pd list that displays each pdName that the user has completed with a link to that pd's detail page.
  const pdItems = userPds.map((pd) => {
    return (
      <li key={pd.pdTrackerId}>
        <NavLink to={`/pdTrackers/${pd.pdTrackerId}`}>{pd.pd.pdName}</NavLink>
      </li>
    );
  });

  // Make course list that displays each courseName that the user has completed with a link to that course's detail page.
  const courseItems = userCourses.map((course) => {
    return (
      <li key={course.courseTrackerId}>
        <NavLink to={`/courseTrackers/${course.courseTrackerId}`}>
          {course.course.courseName}
        </NavLink>
      </li>
    );
  });

  //chart stuff

  // const data = {
  //   labels:userPds.map((pd) => pd.pd.pdName),
  //   datasets: [
  //     {
  //       label: '# of Votes',
  //       data: userPds.map((pd) => pd.pdHours),
  //       backgroundColor: [
  //         'rgba(255, 99, 132, 0.2)',
  //         'rgba(54, 162, 235, 0.2)',
  //         'rgba(255, 206, 86, 0.2)',
  //         'rgba(75, 192, 192, 0.2)',
  //         'rgba(153, 102, 255, 0.2)',
  //         'rgba(255, 159, 64, 0.2)',
  //       ],
  //       borderColor: [
  //         'rgba(255, 99, 132, 1)',
  //         'rgba(54, 162, 235, 1)',
  //         'rgba(255, 206, 86, 1)',
  //         'rgba(75, 192, 192, 1)',
  //         'rgba(153, 102, 255, 1)',
  //         'rgba(255, 159, 64, 1)',
  //       ],
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  // const options = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: 'top',
  //     },
  //     tooltip: {
  //       enabled: true,
  //     },
  //   },
  // };

  // const centerTextPlugin = {
  //   id: 'textCenter',
  //   beforeDatasetsDraw(chart, args, pluginOptions) {

  //     const { ctx } = chart;

  //     ctx.save();
  //     ctx.font = 'bold 20px Arial';  // Customize font style and size
  //     ctx.textAlign = 'center';
  //     ctx.textBaseline = 'middle';
  //     ctx.fillStyle = 'black'; // Customize text color
  //     ctx.fillText(`Total PD Hours: ${totalPdHours}`, chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y);
  //     ctx.restore();
  //   }
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
        return `${opts.w.globals.labels[opts.seriesIndex]}: ${opts.w.globals.series[opts.seriesIndex]} hours`;
      }
    }
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

  // const yaxis = {
  //   min: 0, // Minimum value of the gauge
  //   max: 20, // Maximum value of the gauge
  // };

  // totalCourseCredits for gauge
  const totalCourseCredits = userCourses.reduce((acc, course) => {
    return acc + course.courseCredits;
  }, 0);
  // Chart data (Progress percentage)
  const chartData = [percentage];
  // const chartData = [((userCurrentProgress / + userLane.needed) * 100).toFixed(2)];
  // console.log(totalCourseCredits);

  // useEffect(() => {
  //   if (userId) {
  //     axios.get('/api/userInfo')
  //     .then((res) => {
  //       setUserPds(res.data.userPds)
  //       setUserCourses(res.data.userCourses)
  //     })
  //   } else {
  //     navigate("/")
  //   }
  //   // return { userPds: res.data.userPds, userCourses: res.data.userCourses }
  // }, [userId])

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
      <Header />
      <h1 className="text-3xl font-semibold">User Dashboard</h1>
      <h2 className="text-xl font-semibold">My PD progress:</h2>
      show list of completed PDs here
      <ul>{pdItems}</ul>
      {/* <div style={{ width: '400px', height: '400px' }}>
        <Doughnut data={data} options={options} plugins={[centerTextPlugin]}/>
      </div> */}
      <Link to="/addPd">
        <button className="bg-blue-300 rounded-md w-32">Add New PD</button>{" "}
      </Link>
      <Chart
        options={chartOptions}
        series={chartOptions.series}
        type="donut"
        height={350}
      />
      <h2 className="text-xl font-semibold">Next Lane Change:</h2>
      <h2>Degree: {userDegree.degreeName}</h2>
      <h2>{userLane.laneName}</h2>
      <h3>All completed courses:</h3>
      <ul>{courseItems}</ul>
      <Chart
        options={gaugeOptions}
        series={chartData}
        type="radialBar"
        height={350}
      />
      <Link to="/addCourse">
        <button className="bg-blue-300 rounded-md w-40">Add New Course</button>{" "}
        {/* Route to AddCourse */}
      </Link>
      {showUpdateDegree && (
        <Link to="/updateDegree">
          <button>Update Degree</button>
        </Link>
      )}
    </div>
  );
};

export default UserDashboard;
