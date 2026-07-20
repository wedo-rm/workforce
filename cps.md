<head>
  <link rel="stylesheet" href="css/style.css">
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.5.1/dist/chart.umd.min.js"></script>
  <script src="https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.2.0/dist/chartjs-plugin-datalabels.min.js"></script>
  <script src="js/summary.js" type="module"></script>
  <script src="js/back-to-top.js" type="module"></script>
  <script src="js/chart-cps.js" type="module"></script>
  <script src="js/sidenav.js" type="text/javascript"></script>
  <script src="js/quick-links.js" type="text/javascript"></script>
</head>

<body class="body-main">

  <div id="mainSidenav" class="sidenav">
    <a href="#" target="_self" class="closebtn" onclick="closeNav(); return false;" aria-label="Close navigation">&times;</a>
    <a href="index">SCG Digital</a>
    <a href="cps" id="selected">Commercial Products & Solutions</a>
    <a href="pse">Platform & Software Engineering</a>
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
          aria-controls="cps-quick-links"
          aria-label="Open page quick links"
          title="Jump to">
          <span>CPS Workforce</span>
          <svg class="quick-links-chevron" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
            <path d="m3 6 5 5 5-5"></path>
          </svg>
        </button>
        <span id="cps-quick-links" class="quick-links-menu" role="menu" aria-hidden="true">
          <a class="quick-link-label" href="#cps-sect-bd" target="_self" role="menuitem">
            <strong>BD</strong>
            <span>Business Development &amp; Partnerships</span>
          </a>
          <a class="quick-link-label" href="#cps-sect-po" target="_self" role="menuitem">
            <strong>PO</strong>
            <span>Product Commercialization</span>
          </a>
        </span>
      </span>
    </span>
    <span class="subbtn subactions">
      <a class="quarter-history-link" href="https://wedo-rm.github.io/workforce-2026-q2/cps" target="_blank" rel="noopener noreferrer" title="Previous quarter: Q2/2026" aria-label="Open previous quarter Q2/2026 in a new tab">
        <svg class="quarter-history-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M3 12a9 9 0 1 0 3-6.7"></path>
          <path d="M3 4v6h6"></path>
          <path d="M12 7v5l3 2"></path>
        </svg>
      </a>
      <span class="subaction-divider" aria-hidden="true"></span>
      <a class="suburl" href="https://scgo365.sharepoint.com/:x:/r/sites/DO-ResourceManagement781-2026/_layouts/15/Doc.aspx?sourcedoc=%7B9BBF68FA-8ED4-4047-B96B-FBAB880F6546%7D&file=DO%20Workforce%20-%202%20CPS.xlsx&action=default&mobileredirect=true" target="_blank" rel="noopener noreferrer" title="Workforce data input file" aria-label="Open workforce data input file in a new tab">
        <img src="svg/menu-excel.svg" alt="">
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
    <div class="resource-type-block" id="cps-resource">
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
