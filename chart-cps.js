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
const ctx = document.getElementById('workforceChartCPS');
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
            text: 'Commercial Products & Solutions Workforce 2026',
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
                datasetLabels: 'GraphCPS!A2:A7',
                indexLabels: 'GraphCPS!B1:P1',
                data: 'GraphCPS!B2:P7'
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

const ctxqtr = document.getElementById('workforceChartCPSQTR');
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
            text: 'CPS Workforce 2026 per Quarter',
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
/* PAYROLL
*/
const ctxpr = document.getElementById('workforceChartCPSPR');
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
            text: 'CPS Payroll',
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
                datasetLabels: 'GraphCPS!A12:A14',
                indexLabels: 'GraphCPS!B11:P11',
                data: 'GraphCPS!B12:P14'
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
const ctxct = document.getElementById('workforceChartCPSCT');
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
            text: 'CPS Contractor',
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
                datasetLabels: 'GraphCPS!A22:A24',
                indexLabels: 'GraphCPS!B21:P21',
                data: 'GraphCPS!B22:P24'
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
const ctxos = document.getElementById('workforceChartCPSOS');
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
            text: 'CPS Outsource',
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
                datasetLabels: 'GraphCPS!A32:A34',
                indexLabels: 'GraphCPS!B31:P31',
                data: 'GraphCPS!B32:P34'
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
/* CPS : Sales & BD
*/
const ctxbd = document.getElementById('workforceChartCPSBD');
new Chart(ctxbd, {
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
            text: 'CPS : Business Development & Partnerships',
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
                datasetLabels: 'GraphCPS!A52:A53',
                indexLabels: 'GraphCPS!B51:P51',
                data: 'GraphCPS!B52:P53'
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
/* CPS : PO
*/
const ctxpo = document.getElementById('workforceChartCPSPO');
new Chart(ctxpo, {
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
            text: 'CPS : Product Commercialization',
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
                datasetLabels: 'GraphCPS!A62:A63',
                indexLabels: 'GraphCPS!B61:P61',
                data: 'GraphCPS!B62:P63'
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
/* Available CPS - Month
*/
const ctxavai = document.getElementById('workforceChartCPSAvai');
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
            text: 'Available CPS per Month',
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
                datasetLabels: 'GraphCPS!A153:A153',
                indexLabels: 'GraphCPS!B151:P151',
                data: 'GraphCPS!B153:P153'
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
const ctxplanqtr = document.getElementById('workforceChartCPSPlanQtr');
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
            text: '% CPS Plan per Quarter',
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
/* Available BD - Month
*/
const ctxavaibd = document.getElementById('workforceChartCPSAvaiBD');
new Chart(ctxavaibd, {
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
            text: 'Available BD per Month',
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
                datasetLabels: 'GraphCPS!A54:A54',
                indexLabels: 'GraphCPS!B51:P51',
                data: 'GraphCPS!B54:P54'
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
/* % PLAN BD - QTR
*/
const ctxplanqtrbd = document.getElementById('workforceChartCPSPlanQtrBD');
new Chart(ctxplanqtrbd, {
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
            text: '% BD Plan per Quarter',
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
                datasetLabels: 'GraphCPS!A56:A56',
                indexLabels: 'GraphCPS!B55:F55',
                data: 'GraphCPS!B56:F56'
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
/* Available PO - Month
*/
const ctxavaipo = document.getElementById('workforceChartCPSAvaiPO');
new Chart(ctxavaipo, {
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
            text: 'Available PO per Month',
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
                datasetLabels: 'GraphCPS!A64:A64',
                indexLabels: 'GraphCPS!B61:P61',
                data: 'GraphCPS!B64:P64'
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
/* % PLAN PO - QTR
*/
const ctxplanqtrpo = document.getElementById('workforceChartCPSPlanQtrPO');
new Chart(ctxplanqtrpo, {
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
            text: '% PO Plan per Quarter',
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
                datasetLabels: 'GraphCPS!A66:A66',
                indexLabels: 'GraphCPS!B65:F65',
                data: 'GraphCPS!B66:F66'
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
