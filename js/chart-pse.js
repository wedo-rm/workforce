Chart.defaults.global.defaultFontColor = '#0000008A';
Chart.defaults.global.defaultFontFamily = "'MindSans', sans-serif";
Chart.defaults.global.defaultFontSize = 10;

const actions = [{
    name: 'Mode: index',
    handler(chart) {
        chart.options.interaction.axis = 'xy';
        chart.options.interaction.mode = 'index';
        chart.update();
    }
}];

/*
/* MONTH
*/
const ctx = document.getElementById('workforceChartPSE');
new Chart(ctx, {
    type: 'bar',
    displayColors: true,
    interaction: {
        mode: 'index',
        intersect: false
    },
    data: {
        datasets: [{
            type: 'line',
            borderWidth: 2,
            borderColor: 'rgba(68, 114, 196)',
            backgroundColor: 'rgba(68, 114, 196)',
            fill: false,
            order: 1,
            datalabels: {
                align: 'end',
                anchor: 'end',
                padding: 4
            }
        }, {
            type: 'line',
            borderWidth: 1,
            borderColor: 'rgba(68, 114, 196)',
            borderDash: [5, 5],
            fill: false,
            order: 2,
            pointRadius: 0,
            datalabels: {
                display: false
            }
        }, {
            type: 'line',
            borderWidth: 2,
            borderColor: 'rgba(237, 125, 50)',
            backgroundColor: 'rgba(237, 125, 50)',
            fill: false,
            order: 3,
            datalabels: {
                align: 'end',
                anchor: 'end',
                padding: 4
            }
        }, {
            borderColor: 'rgba(165, 165, 165)',
            borderWidth: 2,
            borderRadius: 10,
            //borderSkipped: false,
            backgroundColor: 'rgba(165, 165, 165)',
            order: 4,
            stack: 'groupplan'
        }, {
            backgroundColor: 'rgba(255, 191, 0)',
            order: 4,
            stack: 'groupplan'
        }, {
            backgroundColor: 'rgba(91, 155, 213)',
            order: 4,
            stack: 'groupplan'
        }]
    },
    plugins: [ChartDataSource],
    options: {
        title: {
            display: true,
            fontSize: 20,
            text: 'Platform & Software Engineering Workforce 2026',
            padding: 20,
            fontColor: '#616161',
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
            titleFontSize: 12,
            position: 'nearest'
        },
        responsive: true,
        scales: {
            x: {
                stacked: true
            },
            y: {
                stacked: true,
                beginAtZero: true
            }
        },
        plugins: {
            datasource: {
                url: 'workforceresult.xlsx',
                type: 'sheet',
                //rowMapping: 'dataset',
                datasetLabels: 'GraphPSE!A2:A7',
                indexLabels: 'GraphPSE!B1:P1',
                data: 'GraphPSE!B2:P7'
            },
            datalabels: {
                formatter: (value, ctx) => {
                    return;
                },
                backgroundColor: function(context) {
                    return context.dataset.backgroundColor;
                },
                borderRadius: 4,
                //formatter: Math.round,
                color: 'white',
                padding: 0
            }
        }
    }
});

/*
/* QUARTER
*/

const ctxqtr = document.getElementById('workforceChartPSEQTR');
new Chart(ctxqtr, {
    type: 'bar',
    displayColors: true,
    interaction: {
        mode: 'index',
        intersect: false
    },
    data: {
        datasets: [{
            type: 'line',
            borderWidth: 2,
            borderColor: 'rgba(68, 114, 196)',
            backgroundColor: 'rgba(68, 114, 196)',
            fill: false,
            order: 1,
            datalabels: {
                align: 'end',
                anchor: 'end',
                padding: 4
            }
        }, {
            type: 'line',
            borderWidth: 1,
            borderColor: 'rgba(68, 114, 196)',
            borderDash: [5, 5],
            fill: false,
            order: 2,
            pointRadius: 0,
            datalabels: {
                display: false
            }
        }, {
            type: 'line',
            borderWidth: 2,
            borderColor: 'rgba(237, 125, 50)',
            backgroundColor: 'rgba(237, 125, 50)',
            fill: false,
            order: 3,
            datalabels: {
                align: 'end',
                anchor: 'end',
                padding: 4
            }
        }, {
            borderColor: 'rgba(165, 165, 165)',
            borderWidth: 2,
            borderRadius: 10,
            //borderSkipped: false,
            backgroundColor: 'rgba(165, 165, 165)',
            order: 4,
            stack: 'groupplan'
        }, {
            backgroundColor: 'rgba(255, 191, 0)',
            order: 4,
            stack: 'groupplan'
        }, {
            backgroundColor: 'rgba(91, 155, 213)',
            order: 4,
            stack: 'groupplan'
        }]
    },
    plugins: [ChartDataSource],
    options: {
        title: {
            display: true,
            fontSize: 20,
            text: 'PSE Workforce 2026 per Quarter',
            padding: 20,
            fontColor: '#616161',
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
            titleFontSize: 12,
            position: 'nearest'
        },
        responsive: true,
        scales: {
            x: {
                stacked: true
            },
            y: {
                stacked: true,
                beginAtZero: true
            }
        },
        plugins: {
            datasource: {
                url: 'workforceresult.xlsx',
                type: 'sheet',
                //rowMapping: 'dataset',
                datasetLabels: 'GraphPSE!A42:A47',
                indexLabels: 'GraphPSE!B41:F41',
                data: 'GraphPSE!B42:F47'
            },
            datalabels: {
                formatter: (value, ctx) => {
                    return;
                },
                backgroundColor: function(context) {
                    return context.dataset.backgroundColor;
                },
                borderRadius: 4,
                //formatter: Math.round,
                color: 'white',
                padding: 0
            }
        }
    }
});

/*
/* PAYROLL
*/
const ctxpr = document.getElementById('workforceChartPSEPR');
new Chart(ctxpr, {
    type: 'bar',
    displayColors: true,
    interaction: {
        mode: 'index',
        intersect: false
    },
    data: {
        datasets: [{
            type: 'line',
            borderWidth: 2,
            borderColor: 'rgba(68, 114, 196)',
            backgroundColor: 'rgba(68, 114, 196)',
            fill: false,
            order: 1,
            datalabels: {
                align: 'end',
                anchor: 'end',
                padding: 4
            }
        }, {
            type: 'line',
            borderWidth: 1,
            borderColor: 'rgba(68, 114, 196)',
            borderDash: [5, 5],
            fill: false,
            order: 2,
            pointRadius: 0,
            datalabels: {
                display: false
            }
        }, {
            type: 'line',
            borderWidth: 2,
            borderColor: 'rgba(237, 125, 50)',
            backgroundColor: 'rgba(237, 125, 50)',
            fill: false,
            order: 3,
            datalabels: {
                align: 'end',
                anchor: 'end',
                padding: 4
            }
        }]
    },
    plugins: [ChartDataSource],
    options: {
        title: {
            display: true,
            fontSize: 20,
            text: 'PSE Payroll',
            padding: 20,
            fontColor: '#616161',
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
            titleFontSize: 12,
            position: 'nearest'
        },
        responsive: true,
        scales: {
            x: {
                stacked: true
            },
            y: {
                stacked: true,
                beginAtZero: true
            },
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        plugins: {
            datasource: {
                url: 'workforceresult.xlsx',
                type: 'sheet',
                //rowMapping: 'dataset',
                datasetLabels: 'GraphPSE!A12:A14',
                indexLabels: 'GraphPSE!B11:P11',
                data: 'GraphPSE!B12:P14'
            },
            datalabels: {
                formatter: (value, ctx) => {
                    return;
                },
                backgroundColor: function(context) {
                    return context.dataset.backgroundColor;
                },
                borderRadius: 4,
                //formatter: Math.round,
                color: 'white',
                padding: 0
            }
        }
    }
});

/*
/* CONTRACTOR
*/
const ctxct = document.getElementById('workforceChartPSECT');
new Chart(ctxct, {
    type: 'bar',
    displayColors: true,
    interaction: {
        mode: 'index',
        intersect: false
    },
    data: {
        datasets: [{
            type: 'line',
            borderWidth: 2,
            borderColor: 'rgba(68, 114, 196)',
            backgroundColor: 'rgba(68, 114, 196)',
            fill: false,
            order: 1,
            datalabels: {
                align: 'end',
                anchor: 'end',
                padding: 4
            }
        }, {
            type: 'line',
            borderWidth: 1,
            borderColor: 'rgba(68, 114, 196)',
            borderDash: [5, 5],
            fill: false,
            order: 2,
            pointRadius: 0,
            datalabels: {
                display: false
            }
        }, {
            type: 'line',
            borderWidth: 2,
            borderColor: 'rgba(237, 125, 50)',
            backgroundColor: 'rgba(237, 125, 50)',
            fill: false,
            order: 3,
            datalabels: {
                align: 'end',
                anchor: 'end',
                padding: 4
            }
        }]
    },
    plugins: [ChartDataSource],
    options: {
        title: {
            display: true,
            fontSize: 20,
            text: 'PSE Contractor',
            padding: 20,
            fontColor: '#616161',
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
            titleFontSize: 12,
            position: 'nearest'
        },
        responsive: true,
        scales: {
            x: {
                stacked: true
            },
            y: {
                stacked: true,
                beginAtZero: true
            },
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        plugins: {
            datasource: {
                url: 'workforceresult.xlsx',
                type: 'sheet',
                //rowMapping: 'dataset',
                datasetLabels: 'GraphPSE!A22:A24',
                indexLabels: 'GraphPSE!B21:P21',
                data: 'GraphPSE!B22:P24'
            },
            datalabels: {
                formatter: (value, ctx) => {
                    return;
                },
                backgroundColor: function(context) {
                    return context.dataset.backgroundColor;
                },
                borderRadius: 4,
                //formatter: Math.round,
                color: 'white',
                padding: 0
            }
        }
    }
});

/*
/* OUTSOURCE
*/
const ctxos = document.getElementById('workforceChartPSEOS');
new Chart(ctxos, {
    type: 'bar',
    displayColors: true,
    interaction: {
        mode: 'index',
        intersect: false
    },
    data: {
        datasets: [{
            type: 'line',
            borderWidth: 2,
            borderColor: 'rgba(68, 114, 196)',
            backgroundColor: 'rgba(68, 114, 196)',
            fill: false,
            order: 1,
            datalabels: {
                align: 'end',
                anchor: 'end',
                padding: 4
            }
        }, {
            type: 'line',
            borderWidth: 1,
            borderColor: 'rgba(68, 114, 196)',
            borderDash: [5, 5],
            fill: false,
            order: 2,
            pointRadius: 0,
            datalabels: {
                display: false
            }
        }, {
            type: 'line',
            borderWidth: 2,
            borderColor: 'rgba(237, 125, 50)',
            backgroundColor: 'rgba(237, 125, 50)',
            fill: false,
            order: 3,
            datalabels: {
                align: 'end',
                anchor: 'end',
                padding: 4
            }
        }]
    },
    plugins: [ChartDataSource],
    options: {
        title: {
            display: true,
            fontSize: 20,
            text: 'PSE Outsource',
            padding: 20,
            fontColor: '#616161',
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
            titleFontSize: 12,
            position: 'nearest'
        },
        responsive: true,
        scales: {
            x: {
                stacked: true
            },
            y: {
                stacked: true,
                beginAtZero: true
            },
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        plugins: {
            datasource: {
                url: 'workforceresult.xlsx',
                type: 'sheet',
                //rowMapping: 'dataset',
                datasetLabels: 'GraphPSE!A32:A34',
                indexLabels: 'GraphPSE!B31:P31',
                data: 'GraphPSE!B32:P34'
            },
            datalabels: {
                formatter: (value, ctx) => {
                    return;
                },
                backgroundColor: function(context) {
                    return context.dataset.backgroundColor;
                },
                borderRadius: 4,
                //formatter: Math.round,
                color: 'white',
                padding: 0
            }
        }
    }
});

/*
/* PSE : Platform Engineering
*/
const ctxpe = document.getElementById('workforceChartPSEPE');
new Chart(ctxpe, {
    type: 'bar',
    displayColors: true,
    interaction: {
        mode: 'index',
        intersect: false
    },
    data: {
        datasets: [{
            type: 'line',
            borderWidth: 2,
            borderColor: 'rgba(68, 114, 196)',
            backgroundColor: 'rgba(68, 114, 196)',
            fill: false,
            order: 1,
            datalabels: {
                align: 'end',
                anchor: 'end',
                padding: 4
            }
        }, {
            type: 'line',
            borderWidth: 2,
            borderColor: 'rgba(237, 125, 50)',
            backgroundColor: 'rgba(237, 125, 50)',
            fill: false,
            order: 2,
            datalabels: {
                align: 'end',
                anchor: 'end',
                padding: 4
            }
        }]
    },
    plugins: [ChartDataSource],
    options: {
        title: {
            display: true,
            fontSize: 20,
            text: 'PSE : Platform Engineering',
            padding: 20,
            fontColor: '#616161',
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
            titleFontSize: 12,
            position: 'nearest'
        },
        responsive: true,
        scales: {
            x: {
                stacked: true
            },
            y: {
                stacked: true,
                beginAtZero: true
            },
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        plugins: {
            datasource: {
                url: 'workforceresult.xlsx',
                type: 'sheet',
                //rowMapping: 'dataset',
                datasetLabels: 'GraphPSE!A52:A53',
                indexLabels: 'GraphPSE!B51:P51',
                data: 'GraphPSE!B52:P53'
            },
            datalabels: {
                formatter: (value, ctx) => {
                    return;
                },
                backgroundColor: function(context) {
                    return context.dataset.backgroundColor;
                },
                borderRadius: 4,
                //formatter: Math.round,
                color: 'white',
                padding: 0
            }
        }
    }
});

/*
/* PSE : Software Engineering
*/
const ctxse = document.getElementById('workforceChartPSESE');
new Chart(ctxse, {
    type: 'bar',
    displayColors: true,
    interaction: {
        mode: 'index',
        intersect: false
    },
    data: {
        datasets: [{
            type: 'line',
            borderWidth: 2,
            borderColor: 'rgba(68, 114, 196)',
            backgroundColor: 'rgba(68, 114, 196)',
            fill: false,
            order: 2,
            datalabels: {
                align: 'end',
                anchor: 'end',
                padding: 4
            }
        }, {
            type: 'line',
            borderWidth: 2,
            borderColor: 'rgba(237, 125, 50)',
            backgroundColor: 'rgba(237, 125, 50)',
            fill: false,
            order: 1,
            datalabels: {
                align: 'end',
                anchor: 'end',
                padding: 4
            }
        }]
    },
    plugins: [ChartDataSource],
    options: {
        title: {
            display: true,
            fontSize: 20,
            text: 'PSE : Software Engineering',
            padding: 20,
            fontColor: '#616161',
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
            titleFontSize: 12,
            position: 'nearest'
        },
        responsive: true,
        scales: {
            x: {
                stacked: true
            },
            y: {
                stacked: true,
                beginAtZero: true
            },
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        plugins: {
            datasource: {
                url: 'workforceresult.xlsx',
                type: 'sheet',
                //rowMapping: 'dataset',
                datasetLabels: 'GraphPSE!A62:A63',
                indexLabels: 'GraphPSE!B61:P61',
                data: 'GraphPSE!B62:P63'
            },
            datalabels: {
                formatter: (value, ctx) => {
                    return;
                },
                backgroundColor: function(context) {
                    return context.dataset.backgroundColor;
                },
                borderRadius: 4,
                //formatter: Math.round,
                color: 'white',
                padding: 0
            }
        }
    }
});

/*
/* Available - Month
*/
const ctxavai = document.getElementById('workforceChartPSEAvai');
new Chart(ctxavai, {
    type: 'bar',
    displayColors: true,
    interaction: {
        mode: 'index',
        intersect: false
    },
    data: {
        datasets: [{
            type: 'line',
            borderWidth: 2,
            borderColor: 'rgba(112, 173, 71)',
            fill: false,
            order: 1,
            datalabels: {
                align: 'end',
                anchor: 'end',
                padding: 4
            }
        }]
    },
    plugins: [ChartDataSource],
    options: {
        title: {
            display: true,
            fontSize: 14,
            text: 'Available PSE per Month',
            padding: 20,
            fontColor: '#616161',
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
                stacked: true
            },
            y: {
                stacked: true,
                beginAtZero: true
            },
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        plugins: {
            datasource: {
                url: 'workforceresult.xlsx',
                type: 'sheet',
                //rowMapping: 'dataset',
                datasetLabels: 'GraphPSE!A153:A153',
                indexLabels: 'GraphPSE!B151:P151',
                data: 'GraphPSE!B153:P153'
            },
            datalabels: {
                formatter: (value, ctx) => {
                    return;
                },
                backgroundColor: function(context) {
                    return context.dataset.backgroundColor;
                },
                borderRadius: 4,
                formatter: Math.round,
                color: 'rgba(112, 173, 71)',
                padding: 0
            }
        }
    }
});

/*
/* % PLAN - QTR
*/
const ctxplanqtr = document.getElementById('workforceChartPSEPlanQtr');
new Chart(ctxplanqtr, {
    type: 'bar',
    displayColors: true,
    interaction: {
        mode: 'index',
        intersect: false
    },
    data: {
        datasets: [{
            type: 'line',
            borderWidth: 2,
            borderColor: 'rgba(197, 90, 17)',
            fill: false,
            order: 1,
            datalabels: {
                align: 'end',
                anchor: 'end',
                padding: 4
            }
        }]
    },
    plugins: [ChartDataSource],
    options: {
        title: {
            display: true,
            fontSize: 14,
            text: '% PSE Plan per Quarter',
            padding: 20,
            fontColor: '#616161',
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
                stacked: true
            },
            y: {
                stacked: true,
                beginAtZero: true
            },
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        plugins: {
            datasource: {
                url: 'workforceresult.xlsx',
                type: 'sheet',
                //rowMapping: 'dataset',
                datasetLabels: 'GraphPSE!A156:A156',
                indexLabels: 'GraphPSE!B155:F155',
                data: 'GraphPSE!B156:F156'
            },
            datalabels: {
                formatter: (value, ctx) => {
                    return;
                },
                backgroundColor: function(context) {
                    return context.dataset.backgroundColor;
                },
                borderRadius: 4,
                formatter: Math.round,
                color: 'rgba(197, 90, 17)',
                padding: 0
            }
        }
    }
});



/*
/* Available PE - Month
*/
const ctxavaipe = document.getElementById('workforceChartPSEAvaiPE');
new Chart(ctxavaipe, {
    type: 'bar',
    displayColors: true,
    interaction: {
        mode: 'index',
        intersect: false
    },
    data: {
        datasets: [{
            type: 'line',
            borderWidth: 2,
            borderColor: 'rgba(112, 173, 71)',
            fill: false,
            order: 1,
            datalabels: {
                align: 'end',
                anchor: 'end',
                padding: 4
            }
        }]
    },
    plugins: [ChartDataSource],
    options: {
        title: {
            display: true,
            fontSize: 14,
            text: 'Available PE per Month',
            padding: 20,
            fontColor: '#616161',
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
                stacked: true
            },
            y: {
                stacked: true,
                beginAtZero: true
            },
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        plugins: {
            datasource: {
                url: 'workforceresult.xlsx',
                type: 'sheet',
                //rowMapping: 'dataset',
                datasetLabels: 'GraphPSE!A54:A54',
                indexLabels: 'GraphPSE!B51:P51',
                data: 'GraphPSE!B54:P54'
            },
            datalabels: {
                formatter: (value, ctx) => {
                    return;
                },
                backgroundColor: function(context) {
                    return context.dataset.backgroundColor;
                },
                borderRadius: 4,
                formatter: Math.round,
                color: 'rgba(112, 173, 71)',
                padding: 0
            }
        }
    }
});

/*
/* % PLAN PSE - QTR
*/
const ctxplanqtrpe = document.getElementById('workforceChartPSEPlanQtrPE');
new Chart(ctxplanqtrpe, {
    type: 'bar',
    displayColors: true,
    interaction: {
        mode: 'index',
        intersect: false
    },
    data: {
        datasets: [{
            type: 'line',
            borderWidth: 2,
            borderColor: 'rgba(197, 90, 17)',
            fill: false,
            order: 1,
            datalabels: {
                align: 'end',
                anchor: 'end',
                padding: 4
            }
        }]
    },
    plugins: [ChartDataSource],
    options: {
        title: {
            display: true,
            fontSize: 14,
            text: '% PE Plan per Quarter',
            padding: 20,
            fontColor: '#616161',
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
                stacked: true
            },
            y: {
                stacked: true,
                beginAtZero: true
            },
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        plugins: {
            datasource: {
                url: 'workforceresult.xlsx',
                type: 'sheet',
                //rowMapping: 'dataset',
                datasetLabels: 'GraphPSE!A56:A56',
                indexLabels: 'GraphPSE!B55:F55',
                data: 'GraphPSE!B56:F56'
            },
            datalabels: {
                formatter: (value, ctx) => {
                    return;
                },
                backgroundColor: function(context) {
                    return context.dataset.backgroundColor;
                },
                borderRadius: 4,
                formatter: Math.round,
                color: 'rgba(197, 90, 17)',
                padding: 0
            }
        }
    }
});



/*
/* Available SE - Month
*/
const ctxavaise = document.getElementById('workforceChartPSEAvaiSE');
new Chart(ctxavaise, {
    type: 'bar',
    displayColors: true,
    interaction: {
        mode: 'index',
        intersect: false
    },
    data: {
        datasets: [{
            type: 'line',
            borderWidth: 2,
            borderColor: 'rgba(112, 173, 71)',
            fill: false,
            order: 1,
            datalabels: {
                align: 'end',
                anchor: 'end',
                padding: 4
            }
        }]
    },
    plugins: [ChartDataSource],
    options: {
        title: {
            display: true,
            fontSize: 14,
            text: 'Available SE per Month',
            padding: 20,
            fontColor: '#616161',
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
                stacked: true
            },
            y: {
                stacked: true,
                beginAtZero: true
            },
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        plugins: {
            datasource: {
                url: 'workforceresult.xlsx',
                type: 'sheet',
                //rowMapping: 'dataset',
                datasetLabels: 'GraphPSE!A64:A64',
                indexLabels: 'GraphPSE!B61:P61',
                data: 'GraphPSE!B64:P64'
            },
            datalabels: {
                formatter: (value, ctx) => {
                    return;
                },
                backgroundColor: function(context) {
                    return context.dataset.backgroundColor;
                },
                borderRadius: 4,
                formatter: Math.round,
                color: 'rgba(112, 173, 71)',
                padding: 0
            }
        }
    }
});

/*
/* % PLAN SE - QTR
*/
const ctxplanqtrse = document.getElementById('workforceChartPSEPlanQtrSE');
new Chart(ctxplanqtrse, {
    type: 'bar',
    displayColors: true,
    interaction: {
        mode: 'index',
        intersect: false
    },
    data: {
        datasets: [{
            type: 'line',
            borderWidth: 2,
            borderColor: 'rgba(197, 90, 17)',
            fill: false,
            order: 1,
            datalabels: {
                align: 'end',
                anchor: 'end',
                padding: 4
            }
        }]
    },
    plugins: [ChartDataSource],
    options: {
        title: {
            display: true,
            fontSize: 14,
            text: '% SE Plan per Quarter',
            padding: 20,
            fontColor: '#616161',
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
                stacked: true
            },
            y: {
                stacked: true,
                beginAtZero: true
            },
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        plugins: {
            datasource: {
                url: 'workforceresult.xlsx',
                type: 'sheet',
                //rowMapping: 'dataset',
                datasetLabels: 'GraphPSE!A66:A66',
                indexLabels: 'GraphPSE!B65:F65',
                data: 'GraphPSE!B66:F66'
            },
            datalabels: {
                formatter: (value, ctx) => {
                    return;
                },
                backgroundColor: function(context) {
                    return context.dataset.backgroundColor;
                },
                borderRadius: 4,
                formatter: Math.round,
                color: 'rgba(197, 90, 17)',
                padding: 0
            }
        }
    }
});
