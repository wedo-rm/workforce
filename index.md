<head>
  <base target="_blank">
  <link rel="stylesheet" href="css/style.css">
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.5.1/dist/chart.umd.min.js"></script>
  <script src="https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.2.0/dist/chartjs-plugin-datalabels.min.js"></script>
  <script src="js/summary.js" type="module"></script>
  <script src="js/back-to-top.js" type="module"></script>
  <script src="js/chart-index.js" type="module"></script>
  <script src="js/sidenav.js" type="text/javascript"></script>
  <script src="js/quick-links.js" type="text/javascript"></script>
</head>

<body class="body-main">

  <div id="mainSidenav" class="sidenav">
    <a href="#" target="_self" class="closebtn" onclick="closeNav(); return false;" aria-label="Close navigation">&times;</a>
    <a href="index" id="selected">SCG Digital</a>
    <a href="cps">Commercial Products & Solutions</a>
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
          aria-controls="index-quick-links"
          aria-label="Open page quick links"
          title="Jump to">
          <span>DO Workforce</span>
          <svg class="quick-links-chevron" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
            <path d="m3 6 5 5 5-5"></path>
          </svg>
        </button>
        <span id="index-quick-links" class="quick-links-menu" role="menu" aria-hidden="true">
          <a href="#index-all" target="_self" role="menuitem">All Departments</a>
          <a href="#index-dv" target="_self" role="menuitem">Delivery [CPS, PSE, SD]</a>
          <a href="#index-dept" target="_self" role="menuitem">Per Department</a>
          <a href="#index-project" target="_self" role="menuitem">Project / Product</a>
        </span>
      </span>
    </span>
    <span class="subbtn subactions">
      <a class="quarter-history-link" href="https://wedo-rm.github.io/workforce-2026-q2/" target="_blank" rel="noopener noreferrer" title="Previous quarter: Q2/2026" aria-label="Open previous quarter Q2/2026 in a new tab">
        <svg class="quarter-history-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M3 12a9 9 0 1 0 3-6.7"></path>
          <path d="M3 4v6h6"></path>
          <path d="M12 7v5l3 2"></path>
        </svg>
      </a>
      <span class="subaction-divider" aria-hidden="true"></span>
      <a class="suburl" href="https://scgo365.sharepoint.com/:x:/r/sites/DO-ResourceManagement781-2026/_layouts/15/Doc.aspx?sourcedoc=%7BE5121AEA-3700-4875-85EF-5058B984DD9E%7D&file=DO%20Workforce%20-%20Master.xlsx&action=default&mobileredirect=true" target="_blank" rel="noopener noreferrer" title="Workforce data input file" aria-label="Open workforce data input file in a new tab">
        <img src="svg/menu-excel.svg" alt="">
      </a>
    </span>
  </div>
  
  <div class="section">
    <div
      id="summary-index"
      class="chart rounded-div"
      data-summary-page="index"
      data-summary-header-class="chartheader">
    </div>
  </div>

  <hr>
  
  <!-- All Departments -->
  
  <div class="section" id="index-all">
    <div class="chart rounded-div">
      <div class="chartheaderleft">
        All Departments
      </div>
    </div>
    <div class="chart rounded-div" id="index-planactual">
      <canvas id="workforceChartDOPlanActual"></canvas>
    </div>
    <div class="chart rounded-div" id="index-main-mth">
      <canvas id="workforceChartDO"></canvas>
    </div>
    <div class="chart rounded-div" id="index-main-qtr">
      <canvas id="workforceChartDOQTR"></canvas>
    </div>
    <div class="secwrapper">
        <div class="secrow" id="index-main-avaiplan">
            <div class="secleft">
              <div class="chart rounded-div"><canvas id="workforceChartDOAvai"></canvas></div>
            </div>
            <div class="secright">
              <div class="chart rounded-div"><canvas id="workforceChartDOPlanQtr"></canvas></div>
            </div>
        </div>
    </div>
    <div class="resource-type-grid">
      <div class="chart rounded-div">
        <canvas id="workforceChartDOPR"></canvas>
      </div>
      <div class="chart rounded-div">
        <canvas id="workforceChartDOCT"></canvas>
      </div>
      <div class="chart rounded-div">
        <canvas id="workforceChartDOOS"></canvas>
      </div>
    </div>
  </div>
  
  <hr>

  <!-- Delivery -->
  
  <div class="section" id="index-dv">
    <div class="chart rounded-div">
      <div class="chartheaderleft">
        Delivery [CPS, PSE, SD]
      </div>
    </div>
    <div class="chart rounded-div" id="index-dv-planactual">
      <canvas id="workforceChartDVPlanActual"></canvas>
    </div>
    <div class="chart rounded-div" id="index-dv-main-mth">
      <canvas id="workforceChartDV"></canvas>
    </div>
    <div class="chart rounded-div" id="index-dv-main-qtr">
      <canvas id="workforceChartDVQTR"></canvas>
    </div>
    <div class="secwrapper">
        <div class="secrow" id="index-dv-main-avaiplan">
            <div class="secleft">
              <div class="chart rounded-div"><canvas id="workforceChartDVAvai"></canvas></div>
            </div>
            <div class="secright">
              <div class="chart rounded-div"><canvas id="workforceChartDVPlanQtr"></canvas></div>
            </div>
        </div>
    </div>
    <div class="resource-type-grid">
      <div class="chart rounded-div">
        <canvas id="workforceChartDVPR"></canvas>
      </div>
      <div class="chart rounded-div">
        <canvas id="workforceChartDVCT"></canvas>
      </div>
      <div class="chart rounded-div">
        <canvas id="workforceChartDVOS"></canvas>
      </div>
    </div>
  </div>

  <hr>

  <!-- Department -->
  
  <div class="section" id="index-dept">
    Per Department
    <div class="secwrapper">
        <div class="secrow" id="index-dept-cps">
            <div class="secleft">
              <a href="cps"><div class="chart rounded-div"><canvas id="workforceChartCPSQTR"></canvas></div></a>
            </div>
            <div class="secright">
              <a href="cps"><div class="chart rounded-div"><canvas id="workforceChartCPSPlanQtr"></canvas></div></a>
            </div>
        </div>
        <div class="secrow" id="index-dept-pse">
            <div class="secleft">
              <a href="pse"><div class="chart rounded-div"><canvas id="workforceChartPSEQTR"></canvas></div></a>
            </div>
            <div class="secright">
              <a href="pse"><div class="chart rounded-div"><canvas id="workforceChartPSEPlanQtr"></canvas></div></a>
            </div>
        </div>
        <div class="secrow" id="index-dept-sd">
            <div class="secleft">
              <a href="sd"><div class="chart rounded-div"><canvas id="workforceChartSDQTR"></canvas></div></a>
            </div>
            <div class="secright">
              <a href="sd"><div class="chart rounded-div"><canvas id="workforceChartSDPlanQtr"></canvas></div></a>
            </div>
        </div>
        <div class="secrow" id="index-dept-aic">
            <div class="secleft">
              <a href="aic"><div class="chart rounded-div"><canvas id="workforceChartAICQTR"></canvas></div></a>
            </div>
            <div class="secright">
              <a href="aic"><div class="chart rounded-div"><canvas id="workforceChartAICPlanQtr"></canvas></div></a>
            </div>
        </div>
        <div class="secrow" id="index-dept-tde">
            <div class="secleft">
              <a href="tde"><div class="chart rounded-div"><canvas id="workforceChartTDEQTR"></canvas></div></a>
            </div>
            <div class="secright">
              <a href="tde"><div class="chart rounded-div"><canvas id="workforceChartTDEPlanQtr"></canvas></div></a>
            </div>
        </div>
    </div>
  </div>
    
  <div class="section" id="index-project">
    Focus Area
    <div class="chart rounded-div">
      <canvas id="workforceChartProject"></canvas>
    </div>
  </div>
    
  <div class="section" id="index-product">
    DO Product
    <div class="chart rounded-div">
      <canvas id="workforceChartProduct"></canvas>
    </div>
  </div>
    
  <div class="section" id="index-project-top">
    Top 5 Project
    <div class="chart rounded-div">
      <canvas id="workforceChartProjectPerTeam"></canvas>
    </div>
  </div>
  
  <div class="section" id="index-revenue">
    Project Revenue
    <div class="chart rounded-div">
      <canvas id="workforceChartProjectRevenue"></canvas>
    </div>
    <div class="secwrapper">
        <div class="secrow" id="index-revenue-pspd">
            <div class="secleft">
              <div class="chart rounded-div"><canvas id="workforceChartProjectRevenuePS"></canvas></div>
            </div>
            <div class="secright">
              <div class="chart rounded-div"><canvas id="workforceChartProjectRevenuePD"></canvas></div>
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
