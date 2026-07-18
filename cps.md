<head>
  <link rel="stylesheet" href="css/style.css">
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.5.1/dist/chart.umd.min.js"></script>
  <script src="https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.2.0/dist/chartjs-plugin-datalabels.min.js"></script>
  <script src="js/summary.js" type="module"></script>
  <script src="js/back-to-top.js" type="module"></script>
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
    <span class="submenu">
      <span onclick="openNav()"><span style="font-size:30px;">&#9776;</span> CPS Workforce </span> |
      <a href="cps#cps-sect-bd">BD</a> &#8226;
      <a href="cps#cps-sect-po">PO</a>
    </span>
    <span class="subbtn">
      <a class="suburl" href="https://scgo365.sharepoint.com/:x:/r/sites/DO-ResourceManagement781-2026/_layouts/15/Doc.aspx?sourcedoc=%7B9BBF68FA-8ED4-4047-B96B-FBAB880F6546%7D&file=DO%20Workforce%20-%202%20CPS.xlsx&action=default&mobileredirect=true" target="_blank">
        <img src="svg/menu-excel.svg" alt="background">
      </a>
    </span>
  </div>
  
  <div class="section">
    <div
      id="summary-cps"
      class="chart rounded-div"
      data-summary-page="cps"
      data-summary-header-class="chartheaderleft">
    </div>

    <div class="chart rounded-div" id="cps-main-mth">
      <canvas id="workforceChartCPS"></canvas>
    </div>
    <div class="chart rounded-div" id="cps-main-qtr">
      <canvas id="workforceChartCPSQTR"></canvas>
    </div>
    <div class="secwrapper">
        <div class="secrow" id="cps-main-avaiplan">
            <div class="secleft">
              <div class="chart rounded-div"><canvas id="workforceChartCPSAvai"></canvas></div>
            </div>
            <div class="secright">
              <div class="chart rounded-div"><canvas id="workforceChartCPSPlanQtr"></canvas></div>
            </div>
        </div>
    </div>
  </div>
    
  <div class="section" id="cps-resource">
    Per Resource Type
    <div class="resource-type-grid">
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
  </div>

  <div class="section" id="cps-sect-bd">
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

  <div class="section" id="cps-sect-po">
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
  
  <button
    id="backToTop"
    class="back-to-top"
    type="button"
    aria-label="Back to top"
    title="Back to top">&#8593;</button>

  <iframe src="footer.html"></iframe>

</body>
