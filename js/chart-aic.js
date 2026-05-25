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
const ctx = document.getElementById('workforceChartAIC');
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
            text: 'AI Innovation Center Workforce 2026',
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
                datasetLabels: 'GraphAIC!A2:A7',
                indexLabels: 'GraphAIC!B1:P1',
                data: 'GraphAIC!B2:P7'
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

const ctxqtr = document.getElementById('workforceChartAICQTR');
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
            text: 'AIC Workforce 2026 per Quarter',
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
/* PAYROLL
*/
const ctxpr = document.getElementById('workforceChartAICPR');
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
            text: 'AIC Payroll',
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
                datasetLabels: 'GraphAIC!A12:A14',
                indexLabels: 'GraphAIC!B11:P11',
                data: 'GraphAIC!B12:P14'
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
const ctxct = document.getElementById('workforceChartAICCT');
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
            text: 'AIC Contractor',
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
                datasetLabels: 'GraphAIC!A22:A24',
                indexLabels: 'GraphAIC!B21:P21',
                data: 'GraphAIC!B22:P24'
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
const ctxos = document.getElementById('workforceChartAICOS');
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
            text: 'AIC Outsource',
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
                datasetLabels: 'GraphAIC!A32:A34',
                indexLabels: 'GraphAIC!B31:P31',
                data: 'GraphAIC!B32:P34'
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
/* 1 - AIC : AI Research & Alliance
*/
const ctxra = document.getElementById('workforceChartAICRA');
new Chart(ctxra, {
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
            text: 'AIC : AI Research & Alliance',
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
                datasetLabels: 'GraphAIC!A52:A53',
                indexLabels: 'GraphAIC!B51:P51',
                data: 'GraphAIC!B52:P53'
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
/* 2 - AIC : AIET AI Engineering
*/
const ctxaie = document.getElementById('workforceChartAICAIE');
new Chart(ctxaie, {
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
            text: 'AIC : AIET AI Engineering',
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
                datasetLabels: 'GraphAIC!A62:A63',
                indexLabels: 'GraphAIC!B61:P61',
                data: 'GraphAIC!B62:P63'
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
/* 3 - AIC : AIET IoT Engineering
*/
const ctxiot = document.getElementById('workforceChartAICIoT');
new Chart(ctxiot, {
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
            text: 'AIC : AIET IoT Engineering',
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
                datasetLabels: 'GraphAIC!A72:A73',
                indexLabels: 'GraphAIC!B71:P71',
                data: 'GraphAIC!B72:P73'
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
/* 4 - AIC : AIET Spatial AI Engineering
*/
const ctxsai = document.getElementById('workforceChartAICSAI');
new Chart(ctxsai, {
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
            text: 'AIC : AIET Spatial AI Engineering',
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
                datasetLabels: 'GraphAIC!A82:A83',
                indexLabels: 'GraphAIC!B81:P81',
                data: 'GraphAIC!B82:P83'
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
/* 5 - AIC : Product Innovation
*/
const ctxpi = document.getElementById('workforceChartAICPI');
new Chart(ctxpi, {
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
            text: 'AIC : Product Innovation',
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
                datasetLabels: 'GraphAIC!A92:A93',
                indexLabels: 'GraphAIC!B91:P91',
                data: 'GraphAIC!B92:P93'
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
const ctxavai = document.getElementById('workforceChartAICAvai');
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
            text: 'Available AIC per Month',
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
                datasetLabels: 'GraphAIC!A153:A153',
                indexLabels: 'GraphAIC!B151:P151',
                data: 'GraphAIC!B153:P153'
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
const ctxplanqtr = document.getElementById('workforceChartAICPlanQtr');
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
            text: '% AIC Plan per Quarter',
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
/* Available R&A - Month
*/
const ctxavaira = document.getElementById('workforceChartAICAvaiRA');
new Chart(ctxavaira, {
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
            text: 'Available R&A per Month',
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
                datasetLabels: 'GraphAIC!A54:A54',
                indexLabels: 'GraphAIC!B51:P51',
                data: 'GraphAIC!B54:P54'
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
/* % R&A PLAN - QTR
*/
const ctxplanqtrra = document.getElementById('workforceChartAICPlanQtrRA');
new Chart(ctxplanqtrra, {
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
            text: '% R&A Plan per Quarter',
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
                datasetLabels: 'GraphAIC!A56:A56',
                indexLabels: 'GraphAIC!B55:F55',
                data: 'GraphAIC!B56:F56'
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
/* Available AIE - Month
*/
const ctxavaiaie = document.getElementById('workforceChartAICAvaiAIE');
new Chart(ctxavaiaie, {
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
            text: 'Available AIE per Month',
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
                datasetLabels: 'GraphAIC!A64:A64',
                indexLabels: 'GraphAIC!B61:P61',
                data: 'GraphAIC!B64:P64'
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
/* % AIE PLAN - QTR
*/
const ctxplanqtraie = document.getElementById('workforceChartAICPlanQtrAIE');
new Chart(ctxplanqtraie, {
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
            text: '% AIE Plan per Quarter',
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
                datasetLabels: 'GraphAIC!A66:A66',
                indexLabels: 'GraphAIC!B65:F65',
                data: 'GraphAIC!B66:F66'
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
/* Available IoT - Month
*/
const ctxavaiiot = document.getElementById('workforceChartAICAvaiIoT');
new Chart(ctxavaiiot, {
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
            text: 'Available IoT per Month',
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
                datasetLabels: 'GraphAIC!A74:A74',
                indexLabels: 'GraphAIC!B71:P71',
                data: 'GraphAIC!B74:P74'
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
/* % IoT PLAN - QTR
*/
const ctxplanqtriot = document.getElementById('workforceChartAICPlanQtrIoT');
new Chart(ctxplanqtriot, {
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
            text: '% IoT Plan per Quarter',
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
                datasetLabels: 'GraphAIC!A76:A76',
                indexLabels: 'GraphAIC!B75:F75',
                data: 'GraphAIC!B76:F76'
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
/* Available SAI - Month
*/
const ctxavaisai = document.getElementById('workforceChartAICAvaiSAI');
new Chart(ctxavaisai, {
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
            text: 'Available SAI per Month',
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
                datasetLabels: 'GraphAIC!A84:A84',
                indexLabels: 'GraphAIC!B81:P81',
                data: 'GraphAIC!B84:P84'
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
/* % SAI PLAN - QTR
*/
const ctxplanqtrsai = document.getElementById('workforceChartAICPlanQtrSAI');
new Chart(ctxplanqtrsai, {
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
            text: '% SAI Plan per Quarter',
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
                datasetLabels: 'GraphAIC!A86:A86',
                indexLabels: 'GraphAIC!B85:F85',
                data: 'GraphAIC!B86:F86'
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
/* Available PI - Month
*/
const ctxavaipi = document.getElementById('workforceChartAICAvaiPI');
new Chart(ctxavaipi, {
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
            text: 'Available PI per Month',
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
                datasetLabels: 'GraphAIC!A94:A94',
                indexLabels: 'GraphAIC!B91:P91',
                data: 'GraphAIC!B94:P94'
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
/* % PI PLAN - QTR
*/
const ctxplanqtrpi = document.getElementById('workforceChartAICPlanQtrPI');
new Chart(ctxplanqtrpi, {
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
            text: '% PI Plan per Quarter',
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
                datasetLabels: 'GraphAIC!A96:A96',
                indexLabels: 'GraphAIC!B95:F95',
                data: 'GraphAIC!B96:F96'
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
