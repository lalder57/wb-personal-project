import { format } from 'date-fns';

const donutChartOptions = (userPds) => {
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

  return { totalPdHours, chartOptions }
}


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
              return `${user.currentProgress}/${user.lane.needed}`;
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

  return { gaugeOptions }

}

const formatDate = (date) => {

  return format(date, 'yyyy-MM-dd');
}

const displayDate = (date) => {
  return format(date, 'MMM-dd-yyyy');
}


export {donutChartOptions, gaugeChartOptions, formatDate, displayDate}