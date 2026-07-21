export function renderDemandScenarioCharts({
  createChart,
  chartDataSource,
  units
}) {
  units.forEach(({ id, label, startRow }) => {
    const monthlyCanvas = document.getElementById(
      `workforceChart${id}DemandScenario`
    );
    const quarterCanvas = document.getElementById(
      `workforceChart${id}DemandPlanQtr`
    );
    const monthlyDataStartRow = startRow + 1;
    const monthlyDataEndRow = startRow + 3;
    const quarterDataStartRow = startRow + 2;
    const quarterDataEndRow = startRow + 3;

    createChart(monthlyCanvas, {
      type: 'line',
      displayColors: true,
      interaction: {
        mode: 'index',
        intersect: false
      },
      data: {
        datasets: [{
          borderWidth: 2,
          borderColor: 'rgba(68, 114, 196)',
          backgroundColor: 'rgba(68, 114, 196)',
          fill: false,
          pointRadius: 3,
          datalabels: {
            display: false
          }
        }, {
          borderWidth: 2,
          borderColor: 'rgba(237, 125, 50)',
          backgroundColor: 'rgba(237, 125, 50)',
          fill: false,
          pointRadius: 3,
          datalabels: {
            display: false
          }
        }, {
          borderWidth: 2,
          borderColor: 'rgba(237, 125, 50)',
          backgroundColor: 'rgba(237, 125, 50)',
          borderDash: [6, 4],
          fill: false,
          pointRadius: 2,
          pointStyle: 'rectRot',
          datalabels: {
            display: false
          }
        }]
      },
      plugins: [chartDataSource],
      options: {
        title: {
          display: true,
          fontSize: 14,
          text: `${label} Demand Scenario per Month`,
          padding: 20,
          fontColor: '#616161'
        },
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true
          }
        },
        tooltips: {
          mode: 'index',
          intersect: false,
          titleFontSize: 10,
          position: 'nearest'
        },
        responsive: true,
        scales: {
          x: {
            stacked: false,
            offset: true,
            grid: {
              offset: true
            }
          },
          y: {
            stacked: false,
            beginAtZero: false
          }
        },
        plugins: {
          datasource: {
            url: 'workforceresult.xlsx',
            type: 'sheet',
            datasetLabels: `Graph-Demand!A${monthlyDataStartRow}:A${monthlyDataEndRow}`,
            indexLabels: `Graph-Demand!B${startRow}:P${startRow}`,
            data: `Graph-Demand!B${monthlyDataStartRow}:P${monthlyDataEndRow}`
          },
          datalabels: {
            display: false
          }
        }
      }
    });

    createChart(quarterCanvas, {
      type: 'line',
      displayColors: true,
      interaction: {
        mode: 'index',
        intersect: false
      },
      data: {
        datasets: [{
          borderWidth: 2,
          borderColor: 'rgba(237, 125, 50)',
          backgroundColor: 'rgba(237, 125, 50)',
          fill: false,
          pointRadius: 3,
          datalabels: {
            align: 'bottom',
            anchor: 'end',
            offset: 3,
            padding: 2
          }
        }, {
          borderWidth: 2,
          borderColor: 'rgba(237, 125, 50)',
          backgroundColor: 'rgba(237, 125, 50)',
          borderDash: [6, 4],
          fill: false,
          pointRadius: 2,
          pointStyle: 'rectRot',
          datalabels: {
            display: (context) => {
              const weightedValue = context.chart.data.datasets[0]
                ?.data?.[context.dataIndex];
              const unweightedValue = context.dataset.data?.[context.dataIndex];
              return Number(weightedValue) !== Number(unweightedValue);
            },
            align: 'top',
            anchor: 'end',
            offset: 3,
            padding: 2
          }
        }]
      },
      plugins: [chartDataSource],
      options: {
        title: {
          display: true,
          fontSize: 14,
          text: `% ${label} Plan Scenario per Quarter`,
          padding: 20,
          fontColor: '#616161'
        },
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true
          }
        },
        tooltips: {
          mode: 'index',
          intersect: false,
          titleFontSize: 10,
          position: 'nearest'
        },
        responsive: true,
        scales: {
          x: {
            stacked: false,
            offset: true,
            grid: {
              offset: true
            }
          },
          y: {
            stacked: false,
            beginAtZero: true
          }
        },
        plugins: {
          datasource: {
            url: 'workforceresult.xlsx',
            type: 'sheet',
            datasetLabels: `Graph-Demand!AA${quarterDataStartRow}:AA${quarterDataEndRow}`,
            indexLabels: `Graph-Demand!AB${startRow}:AF${startRow}`,
            data: `Graph-Demand!AB${quarterDataStartRow}:AF${quarterDataEndRow}`
          },
          datalabels: {
            formatter: Math.round,
            color: 'rgba(197, 90, 17)',
            padding: 0
          }
        }
      }
    });
  });
}
