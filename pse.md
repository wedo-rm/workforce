<head>
  <link rel="stylesheet" href="css/style.css">
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
  <script src="https://cdn.jsdelivr.net/npm/xlsx@0.14.3/dist/xlsx.full.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datasource@0.1.0"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/chartjs-plugin-datalabels/0.7.0/chartjs-plugin-datalabels.min.js"></script>
  <script src="js/chart-pse.js" type="module"></script>
  <script src="js/sidenav.js" type="text/javascript"></script>
</head>

<body class="body-main">

  <div id="mainSidenav" class="sidenav">
    <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
    <a href="index">SCG Digital</a>
    <a href="cps">Commercial Products & Solutions</a>
    <a href="pse" id="selected">Platform & Software Engineering</a>
    <a href="sd">Solution Delivery</a>
    <a href="aic">AI Innovation Center</a>
    <a href="tde">Talent & Digital Enablement</a>
  </div>
  
  <div class="subtitle">
    <span class="submenu" onclick="openNav()"><span style="font-size:30px;">&#9776;</span> PSE Workforce </span>
    <span class="subbtn">
      <a class="suburl" href="https://scgo365.sharepoint.com/:x:/r/sites/DO-ResourceManagement781-2026/_layouts/15/Doc.aspx?sourcedoc=%7B4B6DF829-33EE-4F99-B98C-71595D5368C1%7D&file=DO%20Workforce%20-%203%20PSE.xlsx&action=default&mobileredirect=true" target="_blank">
        <img src="svg/menu-excel.svg" alt="background">
      </a>
    </span>
  </div>
  
  <div class="section">
    <div class="chart rounded-div">
      <canvas id="workforceChartPSE"></canvas>
    </div>
    <div class="chart rounded-div">
      <canvas id="workforceChartPSEQTR"></canvas>
    </div>
    <div class="secwrapper">
        <div class="secrow">
            <div class="secleft">
              <a href="cps"><div class="chart rounded-div"><canvas id="workforceChartPSEAvai"></canvas></div></a>
            </div>
            <div class="secright">
              <a href="pse"><div class="chart rounded-div"><canvas id="workforceChartPSEPlanQtr"></canvas></div></a>
            </div>
        </div>
    </div>
  </div>
    
  <div class="section">
    Per Resource Type
    <div class="chart rounded-div">
      <canvas id="workforceChartPSEPR"></canvas>
    </div>
    <div class="chart rounded-div">
      <canvas id="workforceChartPSECT"></canvas>
    </div>
    <div class="chart rounded-div">
      <canvas id="workforceChartPSEOS"></canvas>
    </div>
  </div>

  <div class="section">
    PSE Platform Engineering
    <div class="chart rounded-div">
      <canvas id="workforceChartPSEPE"></canvas>
    </div>
    <div class="secwrapper">
        <div class="secrow">
            <div class="secleft">
              <div class="chart rounded-div"><canvas id="workforceChartPSEAvaiPE"></canvas></div>
            </div>
            <div class="secright">
              <div class="chart rounded-div"><canvas id="workforceChartPSEPlanQtrPE"></canvas></div>
            </div>
        </div>
    </div>
  </div>

  <div class="section">
    PSE Software Engineering
    <div class="chart rounded-div">
      <canvas id="workforceChartPSESE"></canvas>
    </div>
    <div class="secwrapper">
        <div class="secrow">
            <div class="secleft">
              <div class="chart rounded-div"><canvas id="workforceChartPSEAvaiSE"></canvas></div>
            </div>
            <div class="secright">
              <div class="chart rounded-div"><canvas id="workforceChartPSEPlanQtrSE"></canvas></div>
            </div>
        </div>
    </div>
  </div>

</body>
