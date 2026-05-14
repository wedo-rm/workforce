<head>
  <link rel="stylesheet" href="css/style.css">
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
  <script src="https://cdn.jsdelivr.net/npm/xlsx@0.14.3/dist/xlsx.full.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datasource@0.1.0"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/chartjs-plugin-datalabels/0.7.0/chartjs-plugin-datalabels.min.js"></script>
  <script src="js/chart-cps.js" type="module"></script>
  <script src="js/sidenav.js" type="text/javascript"></script>
</head>

<body class="body-main">

  <div id="mainSidenav" class="sidenav">
    <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
    <a href="index">SCG Digital</a>
    <a href="cps" id="selected">Commercial Products & Solutions</a>
    <a href="pse">Platform & Software Engineering</a>
    <a href="sd">Solution Delivery</a>
    <a href="aic">AI Innovation Center</a>
    <a href="tde">Talent & Digital Enablement</a>
  </div>
  
  <div class="subtitle">
    <span class="submenu" onclick="openNav()"><span style="font-size:30px;">&#9776;</span> CPS Workforce </span>
    <span class="subbtn">
      <a class="suburl" href="https://scgo365.sharepoint.com/:x:/r/sites/DO-ResourceManagement781-2026/_layouts/15/Doc.aspx?sourcedoc=%7B9BBF68FA-8ED4-4047-B96B-FBAB880F6546%7D&file=DO%20Workforce%20-%202%20CPS.xlsx&action=default&mobileredirect=true" target="_blank">
        <img src="svg/menu-excel.svg" alt="background">
      </a>
    </span>
  </div>
  
  <div class="section">
    <div class="chart rounded-div">
      <canvas id="workforceChartCPS"></canvas>
    </div>
    <div class="chart rounded-div">
      <canvas id="workforceChartCPSQTR"></canvas>
    </div>
    <div class="secwrapper">
        <div class="secrow">
            <div class="secleft">
              <div class="chart rounded-div"><canvas id="workforceChartCPSAvai"></canvas></div>
            </div>
            <div class="secright">
              <div class="chart rounded-div"><canvas id="workforceChartCPSPlanQtr"></canvas></div>
            </div>
        </div>
    </div>
  </div>
    
  <div class="section">
    Per Resource Type
    <div class="chart rounded-div">
      <canvas id="workforceChartCPSPR"></canvas>
    </div>
    <div class="chart rounded-div">
      <canvas id="workforceChartCPSCT"></canvas>
    </div>
    <div class="chart rounded-div">
      <canvas id="workforceChartCPSOS"></canvas>
    </div>
  </div>

  <div class="section">
    CPS Business Development & Partnerships
    <div class="chart rounded-div">
      <canvas id="workforceChartCPSBD"></canvas>
    </div>
    <div class="secwrapper">
        <div class="secrow">
            <div class="secleft">
              <div class="chart rounded-div"><canvas id="workforceChartCPSAvaiBD"></canvas></div>
            </div>
            <div class="secright">
              <div class="chart rounded-div"><canvas id="workforceChartCPSPlanQtrBD"></canvas></div>
            </div>
        </div>
    </div>
  </div>

  <div class="section">
    CPS Product Commercialization
    <div class="chart rounded-div">
      <canvas id="workforceChartCPSPO"></canvas>
    </div>
    <div class="secwrapper">
        <div class="secrow">
            <div class="secleft">
              <div class="chart rounded-div"><canvas id="workforceChartCPSAvaiPO"></canvas></div>
            </div>
            <div class="secright">
              <div class="chart rounded-div"><canvas id="workforceChartCPSPlanQtrPO"></canvas></div>
            </div>
        </div>
    </div>
  </div>

</body>
