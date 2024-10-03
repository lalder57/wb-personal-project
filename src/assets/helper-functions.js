import { format } from "date-fns";

const donutChartOptions = (userPds) => {
  const totalPdHours = userPds.reduce((acc, pd) => {
    return acc + pd.pdHours;
  }, 0);

  const chartOptions = {
    chart: {
      type: "donut",
      offsety: -10,
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
      show: false,
    },
  };
  return { chartOptions, totalPdHours };
};

const gaugeChartOptions = (user) => {
  const percentage = (user.currentProgress / user.lane.needed) * 100;

  const gaugeOptions = {
    chart: {
      type: "radialBar",
    },
    series: [percentage],
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
              return `${user.currentProgress}/${user.lane.needed}`;
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
    // stroke: {
    //   lineCap: 'round', // Rounded end cap for the stroke
    // },
    labels: ["Lane Credits"], // Label in the center
  };

  return { gaugeOptions };
};

const displayDate = (date) => {
  const newDate = new Date(date);
  return format(newDate, "MMM-dd-yyyy");
};

const formatNames = (name) => {
  let newName = "";
  for (let i = 0; i < name.length; i++) {
    if (i === 0) {
      newName += name[i].toUpperCase();
    } else {
      newName += name[i];
    }
  }
  return newName;
};
const toTitleCase = (str) => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
};

export {
  donutChartOptions,
  gaugeChartOptions,
  displayDate,
  formatNames,
  toTitleCase,
};
