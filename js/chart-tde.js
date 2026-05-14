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
const ctx = document.getElementById('workforceChartTDE');
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
            text: 'Talent & Digital Enablement Workforce 2026',
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
                datasetLabels: 'GraphTDE!A2:A7',
                indexLabels: 'GraphTDE!B1:P1',
                data: 'GraphTDE!B2:P7'
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

const ctxqtr = document.getElementById('workforceChartTDEQTR');
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
            text: 'TDE Workforce 2026 per Quarter',
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
/* PAYROLL
*/
const ctxpr = document.getElementById('workforceChartTDEPR');
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
            text: 'TDE Payroll',
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
                datasetLabels: 'GraphTDE!A12:A14',
                indexLabels: 'GraphTDE!B11:P11',
                data: 'GraphTDE!B12:P14'
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
const ctxct = document.getElementById('workforceChartTDECT');
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
            text: 'TDE Contractor',
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
                datasetLabels: 'GraphTDE!A22:A24',
                indexLabels: 'GraphTDE!B21:P21',
                data: 'GraphTDE!B22:P24'
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
const ctxos = document.getElementById('workforceChartTDEOS');
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
            text: 'TDE Outsource',
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
                datasetLabels: 'GraphTDE!A32:A34',
                indexLabels: 'GraphTDE!B31:P31',
                data: 'GraphTDE!B32:P34'
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
/* 1 - TDE : Financial Management
*/
const ctxfi = document.getElementById('workforceChartTDEFI');
new Chart(ctxfi, {
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
            text: 'TDE : Financial Management',
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
                datasetLabels: 'GraphTDE!A52:A53',
                indexLabels: 'GraphTDE!B51:P51',
                data: 'GraphTDE!B52:P53'
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
/* 2 - TDE : Resource Management
*/
const ctxrm = document.getElementById('workforceChartTDERM');
new Chart(ctxrm, {
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
            text: 'TDE : Resource Management',
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
                datasetLabels: 'GraphTDE!A62:A63',
                indexLabels: 'GraphTDE!B61:P61',
                data: 'GraphTDE!B62:P63'
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
/* 3 - TDE : Talent Experience & Development
*/
const ctxted = document.getElementById('workforceChartTDETED');
new Chart(ctxted, {
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
            text: 'TDE : Talent Experience & Development',
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
                datasetLabels: 'GraphTDE!A72:A73',
                indexLabels: 'GraphTDE!B71:P71',
                data: 'GraphTDE!B72:P73'
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
/* 4 - TDE : Center of Excellences
*/
const ctxcoe = document.getElementById('workforceChartTDECoE');
new Chart(ctxcoe, {
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
            text: 'TDE : Center of Excellences',
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
                datasetLabels: 'GraphTDE!A82:A83',
                indexLabels: 'GraphTDE!B81:P81',
                data: 'GraphTDE!B82:P83'
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
/* Available TDE - Month
*/
const ctxavai = document.getElementById('workforceChartTDEAvai');
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
            text: 'Available TDE per Month',
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
                datasetLabels: 'GraphTDE!A153:A153',
                indexLabels: 'GraphTDE!B151:P151',
                data: 'GraphTDE!B153:P153'
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
const ctxplanqtr = document.getElementById('workforceChartTDEPlanQtr');
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
            text: '% TDE Plan per Quarter',
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
/* Available FI - Month
*/
const ctxavaifi = document.getElementById('workforceChartTDEAvaiFI');
new Chart(ctxavaifi, {
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
            text: 'Available FI per Month',
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
                datasetLabels: 'GraphTDE!A54:A54',
                indexLabels: 'GraphTDE!B51:P51',
                data: 'GraphTDE!B54:P54'
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
/* % FI PLAN - QTR
*/
const ctxplanqtrfi = document.getElementById('workforceChartTDEPlanQtrFI');
new Chart(ctxplanqtrfi, {
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
            text: '% FI Plan per Quarter',
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
                datasetLabels: 'GraphTDE!A56:A56',
                indexLabels: 'GraphTDE!B55:F55',
                data: 'GraphTDE!B56:F56'
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
/* Available RM - Month
*/
const ctxavairm = document.getElementById('workforceChartTDEAvaiRM');
new Chart(ctxavairm, {
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
            text: 'Available RM per Month',
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
                datasetLabels: 'GraphTDE!A64:A64',
                indexLabels: 'GraphTDE!B61:P61',
                data: 'GraphTDE!B64:P64'
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
/* % RM PLAN - QTR
*/
const ctxplanqtrrm = document.getElementById('workforceChartTDEPlanQtrRM');
new Chart(ctxplanqtrrm, {
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
            text: '% RM Plan per Quarter',
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
                datasetLabels: 'GraphTDE!A66:A66',
                indexLabels: 'GraphTDE!B65:F65',
                data: 'GraphTDE!B66:F66'
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
/* Available TED - Month
*/
const ctxavaited = document.getElementById('workforceChartTDEAvaiTED');
new Chart(ctxavaited, {
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
            text: 'Available TED per Month',
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
                datasetLabels: 'GraphTDE!A74:A74',
                indexLabels: 'GraphTDE!B71:P71',
                data: 'GraphTDE!B74:P74'
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
/* % TED PLAN - QTR
*/
const ctxplanqtrted = document.getElementById('workforceChartTDEPlanQtrTED');
new Chart(ctxplanqtrted, {
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
            text: '% TED Plan per Quarter',
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
                datasetLabels: 'GraphTDE!A76:A76',
                indexLabels: 'GraphTDE!B75:F75',
                data: 'GraphTDE!B76:F76'
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
/* Available CoE - Month
*/
const ctxavaicoe = document.getElementById('workforceChartTDEAvaiCoE');
new Chart(ctxavaicoe, {
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
            text: 'Available CoE per Month',
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
                datasetLabels: 'GraphTDE!A84:A84',
                indexLabels: 'GraphTDE!B81:P81',
                data: 'GraphTDE!B84:P84'
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
/* % CoE PLAN - QTR
*/
const ctxplanqtrcoe = document.getElementById('workforceChartTDEPlanQtrCoE');
new Chart(ctxplanqtrcoe, {
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
            text: '% CoE Plan per Quarter',
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
                datasetLabels: 'GraphTDE!A86:A86',
                indexLabels: 'GraphTDE!B85:F85',
                data: 'GraphTDE!B86:F86'
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
