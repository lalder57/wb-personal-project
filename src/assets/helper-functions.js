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

export default donutChartOptions