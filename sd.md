<head>
  <link rel="stylesheet" href="css/style.css">
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.5.1/dist/chart.umd.min.js"></script>
  <script src="https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.2.0/dist/chartjs-plugin-datalabels.min.js"></script>
  <script src="js/summary.js" type="module"></script>
  <script src="js/back-to-top.js" type="module"></script>
  <script src="js/chart-sd.js" type="module"></script>
  <script src="js/sidenav.js" type="text/javascript"></script>
  <script src="js/quick-links.js" type="text/javascript"></script>
</head>

<body class="body-main">

  <div id="mainSidenav" class="sidenav">
    <a href="#" target="_self" class="closebtn" onclick="closeNav(); return false;" aria-label="Close navigation">&times;</a>
    <a href="index">SCG Digital</a>
    <a href="cps">Commercial Products & Solutions</a>
    <a href="pse">Platform & Software Engineering</a>
    <a href="sd" id="selected">Solution Delivery</a>
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
          aria-controls="sd-quick-links"
          aria-label="Open page quick links"
          title="Jump to">
          <span>SD Workforce</span>
          <svg class="quick-links-chevron" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
            <path d="m3 6 5 5 5-5"></path>
          </svg>
        </button>
        <span id="sd-quick-links" class="quick-links-menu" role="menu" aria-hidden="true">
          <a class="quick-link-label" href="#sd-sect-design" target="_self" role="menuitem">
            <strong>Design</strong>
          </a>
          <a class="quick-link-label" href="#sd-sect-data" target="_self" role="menuitem">
            <strong>Data</strong>
            <span>Data Technology</span>
          </a>
          <a class="quick-link-label" href="#sd-sect-sa" target="_self" role="menuitem">
            <strong>SA</strong>
            <span>Solution Architecture</span>
          </a>
          <a class="quick-link-label" href="#sd-sect-sre" target="_self" role="menuitem">
            <strong>SRE</strong>
            <span>Site Reliability Engineering</span>
          </a>
          <a class="quick-link-label" href="#sd-sect-sec" target="_self" role="menuitem">
            <strong>SEC</strong>
            <span>Cyber Security</span>
          </a>
          <a class="quick-link-label" href="#sd-sect-pm" target="_self" role="menuitem">
            <strong>PM</strong>
            <span>Project Management</span>
          </a>
          <a class="quick-link-label" href="#sd-sect-ba" target="_self" role="menuitem">
            <strong>BA</strong>
            <span>Technology Analyst</span>
          </a>
          <a class="quick-link-label" href="#sd-sect-qa" target="_self" role="menuitem">
            <strong>QA</strong>
            <span>Technology QA</span>
          </a>
          <a class="quick-link-label" href="#sd-sect-tm" target="_self" role="menuitem">
            <strong>TM</strong>
            <span>Technology Management</span>
          </a>
        </span>
      </span>
    </span>
    <span class="subbtn subactions">
      <a class="quarter-history-link" href="https://wedo-rm.github.io/workforce-2026-q2/sd" target="_blank" rel="noopener noreferrer" title="Previous quarter: Q2/2026" aria-label="Open previous quarter Q2/2026 in a new tab">
        <svg class="quarter-history-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M3 12a9 9 0 1 0 3-6.7"></path>
          <path d="M3 4v6h6"></path>
          <path d="M12 7v5l3 2"></path>
        </svg>
      </a>
      <span class="subaction-divider" aria-hidden="true"></span>
      <a class="suburl" href="https://scgo365.sharepoint.com/:x:/r/sites/DO-ResourceManagement781-2026/_layouts/15/Doc.aspx?sourcedoc=%7BC72218B3-A306-4A72-A5E7-52741AB15BB6%7D&amp;file=DO%20Workforce%20-%204%20SD.xlsx&amp;action=default&amp;mobileredirect=true" target="_blank" rel="noopener noreferrer" title="Workforce data input file" aria-label="Open workforce data input file in a new tab">
        <img src="svg/menu-excel.svg" alt="">
      </a>
    </span>
  </div>
  
  <div class="section">
    <div
      id="summary-sd"
      class="chart rounded-div"
      data-summary-page="sd"
      data-summary-header-class="chartheaderleft">
    </div>
    <div class="chart rounded-div" id="sd-main-mth">
      <canvas id="workforceChartSD"></canvas>
    </div>
    <div class="chart rounded-div" id="sd-main-qtr">
      <canvas id="workforceChartSDQTR"></canvas>
    </div>
    <div class="secwrapper">
        <div class="secrow" id="sd-main-avaiplan">
            <div class="secleft">
              <div class="chart rounded-div"><canvas id="workforceChartSDAvai"></canvas></div>
            </div>
            <div class="secright">
              <div class="chart rounded-div"><canvas id="workforceChartSDPlanQtr"></canvas></div>
            </div>
        </div>
    </div>
    <div class="secwrapper">
        <div class="secrow" id="sd-sd-demand-scenario">
            <div class="secleft">
              <div class="chart rounded-div"><canvas id="workforceChartSDDemandScenario"></canvas></div>
            </div>
            <div class="secright">
              <div class="chart rounded-div"><canvas id="workforceChartSDDemandPlanQtr"></canvas></div>
            </div>
        </div>
    </div>
    <div class="resource-type-block" id="sd-resource">
      <div class="resource-type-grid">
        <div class="chart rounded-div">
          <canvas id="workforceChartSDPR"></canvas>
        </div>
        <div class="chart rounded-div">
          <canvas id="workforceChartSDCT"></canvas>
        </div>
        <div class="chart rounded-div">
          <canvas id="workforceChartSDOS"></canvas>
        </div>
      </div>
    </div>
  </div>

  <div class="section" id="sd-sect-design">
    SD Design
    <div class="chart rounded-div">
      <canvas id="workforceChartSDDesign"></canvas>
    </div>
    <div class="secwrapper">
        <div class="secrow">
            <div class="secleft">
              <div class="chart rounded-div"><canvas id="workforceChartSDAvaiDesign"></canvas></div>
            </div>
            <div class="secright">
              <div class="chart rounded-div"><canvas id="workforceChartSDPlanQtrDesign"></canvas></div>
            </div>
        </div>
    </div>
    <div class="secwrapper">
        <div class="secrow" id="sd-design-demand-scenario">
            <div class="secleft">
              <div class="chart rounded-div"><canvas id="workforceChartDesignDemandScenario"></canvas></div>
            </div>
            <div class="secright">
              <div class="chart rounded-div"><canvas id="workforceChartDesignDemandPlanQtr"></canvas></div>
            </div>
        </div>
    </div>
  </div>

  <div class="section" id="sd-sect-data">
    SD Data Technology
    <div class="chart rounded-div">
      <canvas id="workforceChartSDData"></canvas>
    </div>
    <div class="secwrapper">
        <div class="secrow">
            <div class="secleft">
              <div class="chart rounded-div"><canvas id="workforceChartSDAvaiData"></canvas></div>
            </div>
            <div class="secright">
              <div class="chart rounded-div"><canvas id="workforceChartSDPlanQtrData"></canvas></div>
            </div>
        </div>
    </div>
    <div class="secwrapper">
        <div class="secrow" id="sd-data-demand-scenario">
            <div class="secleft">
              <div class="chart rounded-div"><canvas id="workforceChartDataDemandScenario"></canvas></div>
            </div>
            <div class="secright">
              <div class="chart rounded-div"><canvas id="workforceChartDataDemandPlanQtr"></canvas></div>
            </div>
        </div>
    </div>
  </div>

  <div class="section" id="sd-sect-sa">
    SD Solution Architecture
    <div class="chart rounded-div">
      <canvas id="workforceChartSDSA"></canvas>
    </div>
    <div class="secwrapper">
        <div class="secrow">
            <div class="secleft">
              <div class="chart rounded-div"><canvas id="workforceChartSDAvaiSA"></canvas></div>
            </div>
            <div class="secright">
              <div class="chart rounded-div"><canvas id="workforceChartSDPlanQtrSA"></canvas></div>
            </div>
        </div>
    </div>
    <div class="secwrapper">
        <div class="secrow" id="sd-sa-demand-scenario">
            <div class="secleft">
              <div class="chart rounded-div"><canvas id="workforceChartSADemandScenario"></canvas></div>
            </div>
            <div class="secright">
              <div class="chart rounded-div"><canvas id="workforceChartSADemandPlanQtr"></canvas></div>
            </div>
        </div>
    </div>
  </div>

  <div class="section" id="sd-sect-sre">
    SD Site Reliability Engineering
    <div class="chart rounded-div">
      <canvas id="workforceChartSDSRE"></canvas>
    </div>
    <div class="secwrapper">
        <div class="secrow">
            <div class="secleft">
              <div class="chart rounded-div"><canvas id="workforceChartSDAvaiSRE"></canvas></div>
            </div>
            <div class="secright">
              <div class="chart rounded-div"><canvas id="workforceChartSDPlanQtrSRE"></canvas></div>
            </div>
        </div>
    </div>
    <div class="secwrapper">
        <div class="secrow" id="sd-sre-demand-scenario">
            <div class="secleft">
              <div class="chart rounded-div"><canvas id="workforceChartSREDemandScenario"></canvas></div>
            </div>
            <div class="secright">
              <div class="chart rounded-div"><canvas id="workforceChartSREDemandPlanQtr"></canvas></div>
            </div>
        </div>
    </div>
  </div>

  <div class="section" id="sd-sect-sec">
    SD Cyber Security
    <div class="chart rounded-div">
      <canvas id="workforceChartSDSEC"></canvas>
    </div>
    <div class="secwrapper">
        <div class="secrow">
            <div class="secleft">
              <div class="chart rounded-div"><canvas id="workforceChartSDAvaiSEC"></canvas></div>
            </div>
            <div class="secright">
              <div class="chart rounded-div"><canvas id="workforceChartSDPlanQtrSEC"></canvas></div>
            </div>
        </div>
    </div>
    <div class="secwrapper">
        <div class="secrow" id="sd-cybersec-demand-scenario">
            <div class="secleft">
              <div class="chart rounded-div"><canvas id="workforceChartCYBERSECDemandScenario"></canvas></div>
            </div>
            <div class="secright">
              <div class="chart rounded-div"><canvas id="workforceChartCYBERSECDemandPlanQtr"></canvas></div>
            </div>
        </div>
    </div>
  </div>

  <div class="section" id="sd-sect-pm">
    SD Project Management
    <div class="chart rounded-div">
      <canvas id="workforceChartSDPM"></canvas>
    </div>
    <div class="secwrapper">
        <div class="secrow">
            <div class="secleft">
              <div class="chart rounded-div"><canvas id="workforceChartSDAvaiPM"></canvas></div>
            </div>
            <div class="secright">
              <div class="chart rounded-div"><canvas id="workforceChartSDPlanQtrPM"></canvas></div>
            </div>
        </div>
    </div>
    <div class="secwrapper">
        <div class="secrow" id="sd-pm-demand-scenario">
            <div class="secleft">
              <div class="chart rounded-div"><canvas id="workforceChartPMDemandScenario"></canvas></div>
            </div>
            <div class="secright">
              <div class="chart rounded-div"><canvas id="workforceChartPMDemandPlanQtr"></canvas></div>
            </div>
        </div>
    </div>
  </div>

  <div class="section" id="sd-sect-ba">
    SD Technology Analyst
    <div class="chart rounded-div">
      <canvas id="workforceChartSDBA"></canvas>
    </div>
    <div class="secwrapper">
        <div class="secrow">
            <div class="secleft">
              <div class="chart rounded-div"><canvas id="workforceChartSDAvaiBA"></canvas></div>
            </div>
            <div class="secright">
              <div class="chart rounded-div"><canvas id="workforceChartSDPlanQtrBA"></canvas></div>
            </div>
        </div>
    </div>
    <div class="secwrapper">
        <div class="secrow" id="sd-ba-demand-scenario">
            <div class="secleft">
              <div class="chart rounded-div"><canvas id="workforceChartBADemandScenario"></canvas></div>
            </div>
            <div class="secright">
              <div class="chart rounded-div"><canvas id="workforceChartBADemandPlanQtr"></canvas></div>
            </div>
        </div>
    </div>
  </div>

  <div class="section" id="sd-sect-qa">
    SD Technology QA
    <div class="chart rounded-div">
      <canvas id="workforceChartSDQA"></canvas>
    </div>
    <div class="secwrapper">
        <div class="secrow">
            <div class="secleft">
              <div class="chart rounded-div"><canvas id="workforceChartSDAvaiQA"></canvas></div>
            </div>
            <div class="secright">
              <div class="chart rounded-div"><canvas id="workforceChartSDPlanQtrQA"></canvas></div>
            </div>
        </div>
    </div>
    <div class="secwrapper">
        <div class="secrow" id="sd-qa-demand-scenario">
            <div class="secleft">
              <div class="chart rounded-div"><canvas id="workforceChartQADemandScenario"></canvas></div>
            </div>
            <div class="secright">
              <div class="chart rounded-div"><canvas id="workforceChartQADemandPlanQtr"></canvas></div>
            </div>
        </div>
    </div>
  </div>

  <div class="section" id="sd-sect-tm">
    SD Technology Management
    <div class="chart rounded-div">
      <canvas id="workforceChartSDTM"></canvas>
    </div>
    <div class="secwrapper">
        <div class="secrow">
            <div class="secleft">
              <div class="chart rounded-div"><canvas id="workforceChartSDAvaiTM"></canvas></div>
            </div>
            <div class="secright">
              <div class="chart rounded-div"><canvas id="workforceChartSDPlanQtrTM"></canvas></div>
            </div>
        </div>
    </div>
    <div class="secwrapper">
        <div class="secrow" id="sd-tm-demand-scenario">
            <div class="secleft">
              <div class="chart rounded-div"><canvas id="workforceChartTMDemandScenario"></canvas></div>
            </div>
            <div class="secright">
              <div class="chart rounded-div"><canvas id="workforceChartTMDemandPlanQtr"></canvas></div>
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
