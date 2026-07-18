<head>
  <link rel="stylesheet" href="css/style.css">
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.5.1/dist/chart.umd.min.js"></script>
  <script src="https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.2.0/dist/chartjs-plugin-datalabels.min.js"></script>
  <script src="js/summary.js" type="module"></script>
  <script src="js/back-to-top.js" type="module"></script>
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
    <span class="submenu">
      <span onclick="openNav()"><span style="font-size:30px;">&#9776;</span> PSE Workforce </span> |
      <a href="pse#pse-sect-pe">PE</a> &#8226;
      <a href="pse#pse-sect-se">SE</a>
    </span>
    <span class="subbtn">
      <a class="suburl" href="https://scgo365.sharepoint.com/:x:/r/sites/DO-ResourceManagement781-2026/_layouts/15/Doc.aspx?sourcedoc=%7B4B6DF829-33EE-4F99-B98C-71595D5368C1%7D&file=DO%20Workforce%20-%203%20PSE.xlsx&action=default&mobileredirect=true" target="_blank">
        <img src="svg/menu-excel.svg" alt="background">
      </a>
    </span>
  </div>
  
  <div class="section">
    <div
      id="summary-pse"
      class="chart rounded-div"
      data-summary-page="pse"
      data-summary-header-class="chartheaderleft">
    </div>
    <div class="chart rounded-div" id="pse-main-mth">
      <canvas id="workforceChartPSE"></canvas>
    </div>
    <div class="chart rounded-div" id="pse-main-qtr">
      <canvas id="workforceChartPSEQTR"></canvas>
    </div>
    <div class="secwrapper">
        <div class="secrow" id="pse-main-avaiplan">
            <div class="secleft">
              <div class="chart rounded-div"><canvas id="workforceChartPSEAvai"></canvas></div>
            </div>
            <div class="secright">
              <div class="chart rounded-div"><canvas id="workforceChartPSEPlanQtr"></canvas></div>
            </div>
        </div>
    </div>
  </div>
    
  <div class="section" id="pse-resource">
    Per Resource Type
    <div class="resource-type-grid">
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
  </div>

  <div class="section" id="pse-sect-pe">
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

  <div class="section" id="pse-sect-se">
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
  
  <button
    id="backToTop"
    class="back-to-top"
    type="button"
    aria-label="Back to top"
    title="Back to top">&#8593;</button>

  <iframe src="footer.html"></iframe>

</body>
