<head>
  <link rel="stylesheet" href="css/style.css">
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.5.1/dist/chart.umd.min.js"></script>
  <script src="https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.2.0/dist/chartjs-plugin-datalabels.min.js"></script>
  <script src="js/summary.js" type="module"></script>
  <script src="js/back-to-top.js" type="module"></script>
  <script src="js/chart-pse.js" type="module"></script>
  <script src="js/sidenav.js" type="text/javascript"></script>
  <script src="js/quick-links.js" type="text/javascript"></script>
</head>

<body class="body-main">

  <div id="mainSidenav" class="sidenav">
    <a href="#" target="_self" class="closebtn" onclick="closeNav(); return false;" aria-label="Close navigation">&times;</a>
    <a href="index">SCG Digital</a>
    <a href="cps">Commercial Products & Solutions</a>
    <a href="pse" id="selected">Platform & Software Engineering</a>
    <a href="sd">Solution Delivery</a>
    <a href="aic">AI Innovation Center</a>
    <a href="tde">Talent & Digital Enablement</a>
  </div>
  
  <div class="subtitle">
    <span class="submenu">
      <button
        class="sidenav-trigger"
        type="button"
        onclick="openNav()"
        aria-label="Open main navigation"
        title="Open main navigation">
        <span aria-hidden="true">&#9776;</span>
      </button>
      <span class="quick-links" data-quick-links>
        <button
          class="quick-links-trigger"
          type="button"
          aria-expanded="false"
          aria-controls="pse-quick-links"
          aria-label="Open page quick links"
          title="Jump to">
          <span>PSE Workforce</span>
          <svg class="quick-links-chevron" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
            <path d="m3 6 5 5 5-5"></path>
          </svg>
        </button>
        <span id="pse-quick-links" class="quick-links-menu" role="menu" aria-hidden="true">
          <a class="quick-link-label" href="#pse-sect-pe" target="_self" role="menuitem">
            <strong>PE</strong>
            <span>Platform Engineering</span>
          </a>
          <a class="quick-link-label" href="#pse-sect-se" target="_self" role="menuitem">
            <strong>SE</strong>
            <span>Software Engineering</span>
          </a>
        </span>
      </span>
    </span>
    <span class="subbtn subactions">
      <a class="quarter-history-link" href="https://wedo-rm.github.io/workforce-2026-q2/pse" target="_blank" rel="noopener noreferrer" title="Previous quarter: Q2/2026" aria-label="Open previous quarter Q2/2026 in a new tab">
        <svg class="quarter-history-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M3 12a9 9 0 1 0 3-6.7"></path>
          <path d="M3 4v6h6"></path>
          <path d="M12 7v5l3 2"></path>
        </svg>
      </a>
      <span class="subaction-divider" aria-hidden="true"></span>
      <a class="suburl" href="https://scgo365.sharepoint.com/:x:/r/sites/DO-ResourceManagement781-2026/_layouts/15/Doc.aspx?sourcedoc=%7B4B6DF829-33EE-4F99-B98C-71595D5368C1%7D&file=DO%20Workforce%20-%203%20PSE.xlsx&action=default&mobileredirect=true" target="_blank" rel="noopener noreferrer" title="Workforce data input file" aria-label="Open workforce data input file in a new tab">
        <img src="svg/menu-excel.svg" alt="">
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
    <div class="secwrapper">
        <div class="secrow" id="pse-pse-demand-scenario">
            <div class="secleft">
              <div class="chart rounded-div"><canvas id="workforceChartPSEDemandScenario"></canvas></div>
            </div>
            <div class="secright">
              <div class="chart rounded-div"><canvas id="workforceChartPSEDemandPlanQtr"></canvas></div>
            </div>
        </div>
    </div>
    <div class="resource-type-block" id="pse-resource">
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
    <div class="secwrapper">
        <div class="secrow" id="pse-pe-demand-scenario">
            <div class="secleft">
              <div class="chart rounded-div"><canvas id="workforceChartPEDemandScenario"></canvas></div>
            </div>
            <div class="secright">
              <div class="chart rounded-div"><canvas id="workforceChartPEDemandPlanQtr"></canvas></div>
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
    <div class="secwrapper">
        <div class="secrow" id="pse-se-demand-scenario">
            <div class="secleft">
              <div class="chart rounded-div"><canvas id="workforceChartSEDemandScenario"></canvas></div>
            </div>
            <div class="secright">
              <div class="chart rounded-div"><canvas id="workforceChartSEDemandPlanQtr"></canvas></div>
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
