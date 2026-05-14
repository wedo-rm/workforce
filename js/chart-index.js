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

const ctx = document.getElementById('workforceChartDO');
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
            text: 'SCG Digital Workforce 2026',
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
                datasetLabels: 'GraphAll!A2:A7',
                indexLabels: 'GraphAll!B1:P1',
                data: 'GraphAll!B2:P7'
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

const ctxqtr = document.getElementById('workforceChartDOQTR');
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
            text: 'Workforce 2026 per Quarter',
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
                datasetLabels: 'GraphAll!A42:A47',
                indexLabels: 'GraphAll!B41:F41',
                data: 'GraphAll!B42:F47'
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

const ctxpr = document.getElementById('workforceChartDOPR');
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
            text: 'Payroll',
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
                datasetLabels: 'GraphAll!A12:A14',
                indexLabels: 'GraphAll!B11:P11',
                data: 'GraphAll!B12:P14'
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

const ctxct = document.getElementById('workforceChartDOCT');
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
            text: 'Contractor',
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
                datasetLabels: 'GraphAll!A22:A24',
                indexLabels: 'GraphAll!B21:P21',
                data: 'GraphAll!B22:P24'
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

const ctxos = document.getElementById('workforceChartDOOS');
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
            text: 'Outsource',
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
                datasetLabels: 'GraphAll!A32:A34',
                indexLabels: 'GraphAll!B31:P31',
                data: 'GraphAll!B32:P34'
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
/* QUARTER : CPS
*/
const ctxqtrcps = document.getElementById('workforceChartCPSQTR');
new Chart(ctxqtrcps, {
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
            fontSize: 14,
            text: 'CPS',
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
            }
        },
        plugins: {
            datasource: {
                url: 'workforceresult.xlsx',
                type: 'sheet',
                //rowMapping: 'dataset',
                datasetLabels: 'GraphCPS!A42:A47',
                indexLabels: 'GraphCPS!B41:F41',
                data: 'GraphCPS!B42:F47'
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
/* QUARTER : PSE
*/
const ctxqtrpse = document.getElementById('workforceChartPSEQTR');
new Chart(ctxqtrpse, {
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
            fontSize: 14,
            text: 'PSE',
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
/* QUARTER : SD
*/
const ctxqtrsd = document.getElementById('workforceChartSDQTR');
new Chart(ctxqtrsd, {
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
            fontSize: 14,
            text: 'SD',
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
            }
        },
        plugins: {
            datasource: {
                url: 'workforceresult.xlsx',
                type: 'sheet',
                //rowMapping: 'dataset',
                datasetLabels: 'GraphSD!A42:A47',
                indexLabels: 'GraphSD!B41:F41',
                data: 'GraphSD!B42:F47'
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
/* QUARTER : AIC
*/
const ctxqtraic = document.getElementById('workforceChartAICQTR');
new Chart(ctxqtraic, {
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
            fontSize: 14,
            text: 'AIC',
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
            }
        },
        plugins: {
            datasource: {
                url: 'workforceresult.xlsx',
                type: 'sheet',
                //rowMapping: 'dataset',
                datasetLabels: 'GraphAIC!A42:A47',
                indexLabels: 'GraphAIC!B41:F41',
                data: 'GraphAIC!B42:F47'
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
/* QUARTER : TDE
*/
const ctxqtrtde = document.getElementById('workforceChartTDEQTR');
new Chart(ctxqtrtde, {
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
            fontSize: 14,
            text: 'TDE',
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
            }
        },
        plugins: {
            datasource: {
                url: 'workforceresult.xlsx',
                type: 'sheet',
                //rowMapping: 'dataset',
                datasetLabels: 'GraphTDE!A42:A47',
                indexLabels: 'GraphTDE!B41:F41',
                data: 'GraphTDE!B42:F47'
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
const ctxavai = document.getElementById('workforceChartDOAvai');
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
            text: 'Available per Month',
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
                datasetLabels: 'GraphAll!A153:A153',
                indexLabels: 'GraphAll!B151:P151',
                data: 'GraphAll!B153:P153'
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
const ctxplanqtr = document.getElementById('workforceChartDOPlanQtr');
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
            text: '% Plan per Quarter',
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
                datasetLabels: 'GraphAll!A156:A156',
                indexLabels: 'GraphAll!B155:F155',
                data: 'GraphAll!B156:F156'
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
/* % PLAN - QTR : CPS
*/
const ctxplanqtrcps = document.getElementById('workforceChartCPSPlanQtr');
new Chart(ctxplanqtrcps, {
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
            text: '% CPS Plan',
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
                datasetLabels: 'GraphCPS!A156:A156',
                indexLabels: 'GraphCPS!B155:F155',
                data: 'GraphCPS!B156:F156'
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
/* % PLAN - QTR : PSE
*/
const ctxplanqtrpse = document.getElementById('workforceChartPSEPlanQtr');
new Chart(ctxplanqtrpse, {
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
            text: '% PSE Plan',
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
/* % PLAN - QTR : SD
*/
const ctxplanqtrsd = document.getElementById('workforceChartSDPlanQtr');
new Chart(ctxplanqtrsd, {
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
            text: '% SD Plan',
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
                datasetLabels: 'GraphSD!A156:A156',
                indexLabels: 'GraphSD!B155:F155',
                data: 'GraphSD!B156:F156'
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
/* % PLAN - QTR : AIC
*/
const ctxplanqtraic = document.getElementById('workforceChartAICPlanQtr');
new Chart(ctxplanqtraic, {
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
            text: '% AIC Plan',
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
                datasetLabels: 'GraphAIC!A156:A156',
                indexLabels: 'GraphAIC!B155:F155',
                data: 'GraphAIC!B156:F156'
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
/* % PLAN - QTR : TDE
*/
const ctxplanqtrtde = document.getElementById('workforceChartTDEPlanQtr');
new Chart(ctxplanqtrtde, {
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
            text: '% TDE Plan',
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
                datasetLabels: 'GraphTDE!A156:A156',
                indexLabels: 'GraphTDE!B155:F155',
                data: 'GraphTDE!B156:F156'
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
/* Product
*/
const ctxproduct = document.getElementById('workforceChartProduct');
new Chart(ctxproduct, {
    type: 'line',
    displayColors: true,
    interaction: {
        mode: 'index',
        intersect: false
    },
    data: {
        datasets: [{
            borderWidth: 2,
            borderColor: 'rgba(68, 115, 196)',
            backgroundColor: 'rgba(68, 115, 196)',
            fill: false,
            order: 1,
            datalabels: {
                align: 'end',
                anchor: 'end',
                padding: 4
            }
        },{
            borderWidth: 2,
            borderColor: 'rgba(237, 126, 49)',
            backgroundColor: 'rgba(237, 126, 49)',
            fill: false,
            order: 2,
            datalabels: {
                align: 'end',
                anchor: 'end',
                padding: 4
            }
        },{
            borderWidth: 2,
            borderColor: 'rgba(165, 165, 165)',
            backgroundColor: 'rgba(165, 165, 165)',
            fill: false,
            order: 3,
            datalabels: {
                align: 'end',
                anchor: 'end',
                padding: 4
            }
        },{
            borderWidth: 2,
            borderColor: 'rgba(254, 192, 2)',
            backgroundColor: 'rgba(254, 192, 2)',
            fill: false,
            order: 4,
            datalabels: {
                align: 'end',
                anchor: 'end',
                padding: 4
            }
        },{
            borderWidth: 2,
            borderColor: 'rgba(91, 155, 213)',
            backgroundColor: 'rgba(91, 155, 213)',
            fill: false,
            order: 4,
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
            text: 'DO Product',
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
                datasetLabels: 'GraphPJ!A2:A6',
                indexLabels: 'GraphPJ!B1:P1',
                data: 'GraphPJ!B2:P6'
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
/* Project Per Type
*/
const ctxpjt = document.getElementById('workforceChartProjectPerTeam');
new Chart(ctxpjt, {
    type: 'bar',
    displayColors: true,
    interaction: {
        mode: 'index',
        intersect: false
    },
    data: {
        datasets: [
        {
            borderColor: 'rgba(68, 115, 196)',
            borderWidth: 2,
            borderRadius: 10,
            backgroundColor: 'rgba(68, 115, 196)',
            order: 2,
            stack: 'grouppj'
        }, {
            backgroundColor: 'rgba(237, 126, 49)',
            order: 2,
            stack: 'grouppj'
        }, {
            backgroundColor: 'rgba(165, 165, 165)',
            order: 2,
            stack: 'grouppj'
        }, {
            backgroundColor: 'rgba(254, 192, 2)',
            order: 2,
            stack: 'grouppj'
        }, {
            backgroundColor: 'rgba(91, 155, 213)',
            order: 2,
            stack: 'grouppj'
        }, {
            backgroundColor: 'rgba(112, 174, 71)',
            order: 2,
            stack: 'grouppj'
        },{
            type: 'line',
            borderWidth: 0,
            //borderColor: 'rgba(91, 91, 91)',
            backgroundColor: 'rgba(91, 91, 91)',
            fill: false,
            order: 1,
            datalabels: {
                align: 'end',
                anchor: 'end',
                padding: 4
            },
            pointRadius: 0
        }]
    },
    plugins: [ChartDataSource],
    options: {
        title: {
            display: true,
            fontSize: 20,
            text: "Top 5 FTE Planning [Q2'26:Q1'27]",
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
                datasetLabels: 'GraphPJ!A22:A28',
                indexLabels: 'GraphPJ!B21:F21',
                data: 'GraphPJ!B22:F28'
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
