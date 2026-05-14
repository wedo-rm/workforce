<head>
  <link rel="stylesheet" href="css/style.css">
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
  <script src="https://cdn.jsdelivr.net/npm/xlsx@0.14.3/dist/xlsx.full.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datasource@0.1.0"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/chartjs-plugin-datalabels/0.7.0/chartjs-plugin-datalabels.min.js"></script>
  <script src="js/chart-sd.js" type="module"></script>
  <script src="js/sidenav.js" type="text/javascript"></script>
</head>

<body class="body-main">

  <div id="mainSidenav" class="sidenav">
    <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
    <a href="index">SCG Digital</a>
    <a href="cps">Commercial Products & Solutions</a>
    <a href="pse">Platform & Software Engineering</a>
    <a href="sd" id="selected">Solution Delivery</a>
    <a href="aic">AI Innovation Center</a>
    <a href="tde">Talent & Digital Enablement</a>
  </div>
  
  <div class="subtitle">
    <span class="submenu" onclick="openNav()"><span style="font-size:30px;">&#9776;</span> SD Workforce </span>
    <span class="subbtn">
      <a class="suburl" href="https://scgo365.sharepoint.com/:x:/r/sites/DO-ResourceManagement781-2026/_layouts/15/Doc.aspx?sourcedoc=%7BC72218B3-A306-4A72-A5E7-52741AB15BB6%7D&file=DO%20Workforce%20-%204%20SD.xlsx&action=default&mobileredirect=true" target="_blank">
        <img src="svg/menu-excel.svg" alt="background">
      </a>
    </span>
  </div>
  
  <div class="section">
    <div class="chart rounded-div">
      <canvas id="workforceChartSD"></canvas>
    </div>
    <div class="chart rounded-div">
      <canvas id="workforceChartSDQTR"></canvas>
    </div>
    <div class="secwrapper">
        <div class="secrow">
            <div class="secleft">
              <div class="chart rounded-div"><canvas id="workforceChartSDAvai"></canvas></div>
            </div>
            <div class="secright">
              <div class="chart rounded-div"><canvas id="workforceChartSDPlanQtr"></canvas></div>
            </div>
        </div>
    </div>
  </div>
    
  <div class="section">
    Per Resource Type
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

  <div class="section">
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
  </div>

  <div class="section">
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
  </div>

  <div class="section">
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
  </div>

  <div class="section">
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
  </div>

  <div class="section">
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
  </div>

  <div class="section">
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
  </div>

  <div class="section">
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
  </div>

  <div class="section">
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
  </div>

  <div class="section">
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
  </div>
  
</body>
