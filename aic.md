<head>
  <link rel="stylesheet" href="css/style.css">
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.5.1/dist/chart.umd.min.js"></script>
  <script src="https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.2.0/dist/chartjs-plugin-datalabels.min.js"></script>
  <script src="js/summary.js" type="module"></script>
  <script src="js/back-to-top.js" type="module"></script>
  <script src="js/chart-aic.js" type="module"></script>
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
    <a href="aic" id="selected">AI Innovation Center</a>
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
          aria-controls="aic-quick-links"
          aria-label="Open page quick links"
          title="Jump to">
          <span>AIC Workforce</span>
          <svg class="quick-links-chevron" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
            <path d="m3 6 5 5 5-5"></path>
          </svg>
        </button>
        <span id="aic-quick-links" class="quick-links-menu" role="menu" aria-hidden="true">
          <a class="quick-link-label" href="#aic-sect-ra" target="_self" role="menuitem">
            <strong>R&A</strong>
            <span>AI Research & Alliance</span>
          </a>
          <a class="quick-link-label" href="#aic-sect-aie" target="_self" role="menuitem">
            <strong>AIE</strong>
            <span>AIET AI Engineering</span>
          </a>
          <a class="quick-link-label" href="#aic-sect-iot" target="_self" role="menuitem">
            <strong>IoT</strong>
            <span>AIET IoT Engineering</span>
          </a>
          <a class="quick-link-label" href="#aic-sect-sai" target="_self" role="menuitem">
            <strong>SAI</strong>
            <span>AIET Spatial AI Engineering</span>
          </a>
          <a class="quick-link-label" href="#aic-sect-pi" target="_self" role="menuitem">
            <strong>PI</strong>
            <span>Product Innovation</span>
          </a>
        </span>
      </span>
    </span>
    <span class="subbtn subactions">
      <a class="quarter-history-link" href="https://wedo-rm.github.io/workforce-2026-q2/aic" target="_blank" rel="noopener noreferrer" title="Previous quarter: Q2/2026" aria-label="Open previous quarter Q2/2026 in a new tab">
        <svg class="quarter-history-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M3 12a9 9 0 1 0 3-6.7"></path>
          <path d="M3 4v6h6"></path>
          <path d="M12 7v5l3 2"></path>
        </svg>
      </a>
      <span class="subaction-divider" aria-hidden="true"></span>
      <a class="suburl" href="https://scgo365.sharepoint.com/:x:/r/sites/DO-ResourceManagement781-2026/_layouts/15/Doc.aspx?sourcedoc=%7BD68329D4-3D1A-4AEA-BD0D-DD0EF3E5B83E%7D&amp;file=DO%20Workforce%20-%205%20AIC.xlsx&amp;action=default&amp;mobileredirect=true" target="_blank" rel="noopener noreferrer" title="Workforce data input file" aria-label="Open workforce data input file in a new tab">
        <img src="svg/menu-excel.svg" alt="">
      </a>
    </span>
  </div>

  <div class="section">
    <!-- SUMMARY START -->
    <div
      id="summary-aic"
      class="chart rounded-div"
      data-summary-page="aic"
      data-summary-header-class="chartheaderleft">
    </div>
    <!-- SUMMARY END -->
    <div class="chart rounded-div" id="aic-main-mth">
      <canvas id="workforceChartAIC"></canvas>
    </div>
    <div class="chart rounded-div" id="aic-main-qtr">
      <canvas id="workforceChartAICQTR"></canvas>
    </div>
    <div class="secwrapper">
        <div class="secrow" id="aic-main-avaiplan">
            <div class="secleft">
              <div class="chart rounded-div"><canvas id="workforceChartAICAvai"></canvas></div>
            </div>
            <div class="secright">
              <div class="chart rounded-div"><canvas id="workforceChartAICPlanQtr"></canvas></div>
            </div>
        </div>
    </div>
    <div class="secwrapper">
        <div class="secrow" id="aic-aic-demand-scenario">
            <div class="secleft">
              <div class="chart rounded-div"><canvas id="workforceChartAICDemandScenario"></canvas></div>
            </div>
            <div class="secright">
              <div class="chart rounded-div"><canvas id="workforceChartAICDemandPlanQtr"></canvas></div>
            </div>
        </div>
    </div>
    <div class="resource-type-block" id="aic-resource">
      <div class="resource-type-grid">
      <div class="chart rounded-div resource-type-chart">
        <canvas id="workforceChartAICPR"></canvas>
      </div>
      <div class="chart rounded-div resource-type-chart">
        <canvas id="workforceChartAICCT"></canvas>
      </div>
      <div class="chart rounded-div resource-type-chart">
        <canvas id="workforceChartAICOS"></canvas>
      </div>
      </div>
    </div>
  </div>

  <div class="section" id="aic-sect-ra">
    AIC AI Research & Alliance
    <div class="chart rounded-div">
      <canvas id="workforceChartAICRA"></canvas>
    </div>
    <div class="secwrapper">
        <div class="secrow">
            <div class="secleft">
              <div class="chart rounded-div"><canvas id="workforceChartAICAvaiRA"></canvas></div>
            </div>
            <div class="secright">
              <div class="chart rounded-div"><canvas id="workforceChartAICPlanQtrRA"></canvas></div>
            </div>
        </div>
    </div>
    <div class="secwrapper">
        <div class="secrow" id="aic-ra-demand-scenario">
            <div class="secleft">
              <div class="chart rounded-div"><canvas id="workforceChartRADemandScenario"></canvas></div>
            </div>
            <div class="secright">
              <div class="chart rounded-div"><canvas id="workforceChartRADemandPlanQtr"></canvas></div>
            </div>
        </div>
    </div>
  </div>

  <div class="section" id="aic-sect-aie">
    AIC AIET AI Engineering
    <div class="chart rounded-div">
      <canvas id="workforceChartAICAIE"></canvas>
    </div>
    <div class="secwrapper">
        <div class="secrow">
            <div class="secleft">
              <div class="chart rounded-div"><canvas id="workforceChartAICAvaiAIE"></canvas></div>
            </div>
            <div class="secright">
              <div class="chart rounded-div"><canvas id="workforceChartAICPlanQtrAIE"></canvas></div>
            </div>
        </div>
    </div>
    <div class="secwrapper">
        <div class="secrow" id="aic-aie-demand-scenario">
            <div class="secleft">
              <div class="chart rounded-div"><canvas id="workforceChartAIEDemandScenario"></canvas></div>
            </div>
            <div class="secright">
              <div class="chart rounded-div"><canvas id="workforceChartAIEDemandPlanQtr"></canvas></div>
            </div>
        </div>
    </div>
  </div>

  <div class="section" id="aic-sect-iot">
    AIC AIET IoT Engineering
    <div class="chart rounded-div">
      <canvas id="workforceChartAICIoT"></canvas>
    </div>
    <div class="secwrapper">
        <div class="secrow">
            <div class="secleft">
              <div class="chart rounded-div"><canvas id="workforceChartAICAvaiIoT"></canvas></div>
            </div>
            <div class="secright">
              <div class="chart rounded-div"><canvas id="workforceChartAICPlanQtrIoT"></canvas></div>
            </div>
        </div>
    </div>
    <div class="secwrapper">
        <div class="secrow" id="aic-iot-demand-scenario">
            <div class="secleft">
              <div class="chart rounded-div"><canvas id="workforceChartIoTDemandScenario"></canvas></div>
            </div>
            <div class="secright">
              <div class="chart rounded-div"><canvas id="workforceChartIoTDemandPlanQtr"></canvas></div>
            </div>
        </div>
    </div>
  </div>

  <div class="section" id="aic-sect-sai">
    AIC AIET Spatial AI Engineering
    <div class="chart rounded-div">
      <canvas id="workforceChartAICSAI"></canvas>
    </div>
    <div class="secwrapper">
        <div class="secrow">
            <div class="secleft">
              <div class="chart rounded-div"><canvas id="workforceChartAICAvaiSAI"></canvas></div>
            </div>
            <div class="secright">
              <div class="chart rounded-div"><canvas id="workforceChartAICPlanQtrSAI"></canvas></div>
            </div>
        </div>
    </div>
    <div class="secwrapper">
        <div class="secrow" id="aic-sai-demand-scenario">
            <div class="secleft">
              <div class="chart rounded-div"><canvas id="workforceChartSAIDemandScenario"></canvas></div>
            </div>
            <div class="secright">
              <div class="chart rounded-div"><canvas id="workforceChartSAIDemandPlanQtr"></canvas></div>
            </div>
        </div>
    </div>
  </div>

  <div class="section" id="aic-sect-pi">
    AIC Product Innovation
    <div class="chart rounded-div">
      <canvas id="workforceChartAICPI"></canvas>
    </div>
    <div class="secwrapper">
        <div class="secrow">
            <div class="secleft">
              <div class="chart rounded-div"><canvas id="workforceChartAICAvaiPI"></canvas></div>
            </div>
            <div class="secright">
              <div class="chart rounded-div"><canvas id="workforceChartAICPlanQtrPI"></canvas></div>
            </div>
        </div>
    </div>
    <div class="secwrapper">
        <div class="secrow" id="aic-pi-demand-scenario">
            <div class="secleft">
              <div class="chart rounded-div"><canvas id="workforceChartPIDemandScenario"></canvas></div>
            </div>
            <div class="secright">
              <div class="chart rounded-div"><canvas id="workforceChartPIDemandPlanQtr"></canvas></div>
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
