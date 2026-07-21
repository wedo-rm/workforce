<head>
  <link rel="stylesheet" href="css/style.css">
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.5.1/dist/chart.umd.min.js"></script>
  <script src="https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.2.0/dist/chartjs-plugin-datalabels.min.js"></script>
  <script src="js/summary.js" type="module"></script>
  <script src="js/back-to-top.js" type="module"></script>
  <script src="js/chart-tde.js" type="module"></script>
  <script src="js/sidenav.js" type="text/javascript"></script>
  <script src="js/quick-links.js" type="text/javascript"></script>
</head>

<body class="body-main">

  <div id="mainSidenav" class="sidenav">
    <a href="#" target="_self" class="closebtn" onclick="closeNav(); return false;" aria-label="Close navigation">&times;</a>
    <a href="index">SCG Digital</a>
    <a href="cps">Commercial Products & Solutions</a>
    <a href="pse">Platform & Software Engineering</a>
    <a href="sd">Solution Delivery</a>
    <a href="aic">AI Innovation Center</a>
    <a href="tde" id="selected">Talent & Digital Enablement</a>
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
          aria-controls="tde-quick-links"
          aria-label="Open page quick links"
          title="Jump to">
          <span>TDE Workforce</span>
          <svg class="quick-links-chevron" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
            <path d="m3 6 5 5 5-5"></path>
          </svg>
        </button>
        <span id="tde-quick-links" class="quick-links-menu" role="menu" aria-hidden="true">
          <a class="quick-link-label" href="#tde-sect-fi" target="_self" role="menuitem">
            <strong>Finance</strong>
            <span>Financial Management</span>
          </a>
          <a class="quick-link-label" href="#tde-sect-rm" target="_self" role="menuitem">
            <strong>RM</strong>
            <span>Resource Management</span>
          </a>
          <a class="quick-link-label" href="#tde-sect-ted" target="_self" role="menuitem">
            <strong>TED</strong>
            <span>Talent Experience & Development</span>
          </a>
          <a class="quick-link-label" href="#tde-sect-coe" target="_self" role="menuitem">
            <strong>CoE</strong>
            <span>Center of Excellences</span>
          </a>
        </span>
      </span>
    </span>
    <span class="subbtn subactions">
      <a class="quarter-history-link" href="https://wedo-rm.github.io/workforce-2026-q2/tde" target="_blank" rel="noopener noreferrer" title="Previous quarter: Q2/2026" aria-label="Open previous quarter Q2/2026 in a new tab">
        <svg class="quarter-history-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M3 12a9 9 0 1 0 3-6.7"></path>
          <path d="M3 4v6h6"></path>
          <path d="M12 7v5l3 2"></path>
        </svg>
      </a>
      <span class="subaction-divider" aria-hidden="true"></span>
      <a class="suburl" href="https://scgo365.sharepoint.com/:x:/r/sites/DO-ResourceManagement781-2026/_layouts/15/Doc.aspx?sourcedoc=%7B8BDA76AC-1AA5-43CC-82EB-EB63A21DF770%7D&amp;file=DO%20Workforce%20-%206%20TDE.xlsx&amp;action=default&amp;mobileredirect=true" target="_blank" rel="noopener noreferrer" title="Workforce data input file" aria-label="Open workforce data input file in a new tab">
        <img src="svg/menu-excel.svg" alt="">
      </a>
    </span>
  </div>

  <div class="section">
    <!-- SUMMARY START -->
    <div
      id="summary-tde"
      class="chart rounded-div"
      data-summary-page="tde"
      data-summary-header-class="chartheaderleft">
    </div>
    <!-- SUMMARY END -->
    <div class="chart rounded-div" id="tde-main-mth">
      <canvas id="workforceChartTDE"></canvas>
    </div>
    <div class="chart rounded-div" id="tde-main-qtr">
      <canvas id="workforceChartTDEQTR"></canvas>
    </div>
    <div class="secwrapper">
        <div class="secrow" id="tde-main-avaiplan">
            <div class="secleft">
              <div class="chart rounded-div"><canvas id="workforceChartTDEAvai"></canvas></div>
            </div>
            <div class="secright">
              <div class="chart rounded-div"><canvas id="workforceChartTDEPlanQtr"></canvas></div>
            </div>
        </div>
    </div>
    <div class="secwrapper">
        <div class="secrow" id="tde-tde-demand-scenario">
            <div class="secleft">
              <div class="chart rounded-div"><canvas id="workforceChartTDEDemandScenario"></canvas></div>
            </div>
            <div class="secright">
              <div class="chart rounded-div"><canvas id="workforceChartTDEDemandPlanQtr"></canvas></div>
            </div>
        </div>
    </div>
    <div class="resource-type-block" id="tde-resource">
      <div class="resource-type-grid">
      <div class="chart rounded-div resource-type-chart">
        <canvas id="workforceChartTDEPR"></canvas>
      </div>
      <div class="chart rounded-div resource-type-chart">
        <canvas id="workforceChartTDECT"></canvas>
      </div>
      <div class="chart rounded-div resource-type-chart">
        <canvas id="workforceChartTDEOS"></canvas>
      </div>
      </div>
    </div>
  </div>

  <div class="section" id="tde-sect-fi">
    TDE Financial Management
    <div class="chart rounded-div">
      <canvas id="workforceChartTDEFI"></canvas>
    </div>
    <div class="secwrapper">
        <div class="secrow">
            <div class="secleft">
              <div class="chart rounded-div"><canvas id="workforceChartTDEAvaiFI"></canvas></div>
            </div>
            <div class="secright">
              <div class="chart rounded-div"><canvas id="workforceChartTDEPlanQtrFI"></canvas></div>
            </div>
        </div>
    </div>
    <div class="secwrapper">
        <div class="secrow" id="tde-fi-demand-scenario">
            <div class="secleft">
              <div class="chart rounded-div"><canvas id="workforceChartFIDemandScenario"></canvas></div>
            </div>
            <div class="secright">
              <div class="chart rounded-div"><canvas id="workforceChartFIDemandPlanQtr"></canvas></div>
            </div>
        </div>
    </div>
  </div>

  <div class="section" id="tde-sect-rm">
    TDE Resource Management
    <div class="chart rounded-div">
      <canvas id="workforceChartTDERM"></canvas>
    </div>
    <div class="secwrapper">
        <div class="secrow">
            <div class="secleft">
              <div class="chart rounded-div"><canvas id="workforceChartTDEAvaiRM"></canvas></div>
            </div>
            <div class="secright">
              <div class="chart rounded-div"><canvas id="workforceChartTDEPlanQtrRM"></canvas></div>
            </div>
        </div>
    </div>
    <div class="secwrapper">
        <div class="secrow" id="tde-rm-demand-scenario">
            <div class="secleft">
              <div class="chart rounded-div"><canvas id="workforceChartRMDemandScenario"></canvas></div>
            </div>
            <div class="secright">
              <div class="chart rounded-div"><canvas id="workforceChartRMDemandPlanQtr"></canvas></div>
            </div>
        </div>
    </div>
  </div>

  <div class="section" id="tde-sect-ted">
    TDE Talent Experience & Development
    <div class="chart rounded-div">
      <canvas id="workforceChartTDETED"></canvas>
    </div>
    <div class="secwrapper">
        <div class="secrow">
            <div class="secleft">
              <div class="chart rounded-div"><canvas id="workforceChartTDEAvaiTED"></canvas></div>
            </div>
            <div class="secright">
              <div class="chart rounded-div"><canvas id="workforceChartTDEPlanQtrTED"></canvas></div>
            </div>
        </div>
    </div>
    <div class="secwrapper">
        <div class="secrow" id="tde-ted-demand-scenario">
            <div class="secleft">
              <div class="chart rounded-div"><canvas id="workforceChartTEDDemandScenario"></canvas></div>
            </div>
            <div class="secright">
              <div class="chart rounded-div"><canvas id="workforceChartTEDDemandPlanQtr"></canvas></div>
            </div>
        </div>
    </div>
  </div>

  <div class="section" id="tde-sect-coe">
    TDE Center of Excellences
    <div class="chart rounded-div">
      <canvas id="workforceChartTDECoE"></canvas>
    </div>
    <div class="secwrapper">
        <div class="secrow">
            <div class="secleft">
              <div class="chart rounded-div"><canvas id="workforceChartTDEAvaiCoE"></canvas></div>
            </div>
            <div class="secright">
              <div class="chart rounded-div"><canvas id="workforceChartTDEPlanQtrCoE"></canvas></div>
            </div>
        </div>
    </div>
    <div class="secwrapper">
        <div class="secrow" id="tde-coe-demand-scenario">
            <div class="secleft">
              <div class="chart rounded-div"><canvas id="workforceChartCoEDemandScenario"></canvas></div>
            </div>
            <div class="secright">
              <div class="chart rounded-div"><canvas id="workforceChartCoEDemandPlanQtr"></canvas></div>
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
