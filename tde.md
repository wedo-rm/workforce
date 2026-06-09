<head>
  <link rel="stylesheet" href="css/style.css">
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
  <script src="https://cdn.jsdelivr.net/npm/xlsx@0.14.3/dist/xlsx.full.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datasource@0.1.0"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/chartjs-plugin-datalabels/0.7.0/chartjs-plugin-datalabels.min.js"></script>
  <script src="js/chart-tde.js" type="module"></script>
  <script src="js/sidenav.js" type="text/javascript"></script>
</head>

<body class="body-main">

  <div id="mainSidenav" class="sidenav">
    <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
    <a href="index">SCG Digital</a>
    <a href="cps">Commercial Products & Solutions</a>
    <a href="pse">Platform & Software Engineering</a>
    <a href="sd">Solution Delivery</a>
    <a href="aic">AI Innovation Center</a>
    <a href="tde" id="selected">Talent & Digital Enablement</a>
    <a href="delivery">Delivery Team [CPS, PSE, SD]</a>
  </div>
  
  <div class="subtitle">
    <span class="submenu" onclick="openNav()"><span style="font-size:30px;">&#9776;</span> TDE Workforce </span>
    <span class="subbtn">
      <a class="suburl" href="https://scgo365.sharepoint.com/:x:/r/sites/DO-ResourceManagement781-2026/_layouts/15/Doc.aspx?sourcedoc=%7B8BDA76AC-1AA5-43CC-82EB-EB63A21DF770%7D&file=DO%20Workforce%20-%206%20TDE.xlsx&action=default&mobileredirect=true" target="_blank">
        <img src="svg/menu-excel.svg" alt="background">
      </a>
    </span>
  </div>
  
  <div class="section">
    <!-- start summary -->
    <div class="chart rounded-div">
      <div class="chartheaderleft">
        TDE Workforce Summary Q2/2026
      </div>
      <div class="chartbody">
        &#8227;&ensp;Q2 2026 – Q1 2027 <span class="text-plan">[Plan 100.00%]</span>
      </div>
      <div class="chartsubbody">
        <div class="chartsubbodycontainer">
          &#8226;&ensp;Fully Plan เนื่องจากเป็น Support Function
        </div>
      </div>
    </div>
    <!-- end summary -->
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
  </div>
    
  <div class="section" id="tde-resource">
    Per Resource Type
    <div class="chart rounded-div">
      <canvas id="workforceChartTDEPR"></canvas>
    </div>
    <div class="chart rounded-div">
      <canvas id="workforceChartTDECT"></canvas>
    </div>
    <div class="chart rounded-div">
      <canvas id="workforceChartTDEOS"></canvas>
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
  </div>
  
  <iframe src="footer.html"></iframe>
  
</body>
