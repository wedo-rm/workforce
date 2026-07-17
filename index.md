<head>
  <base target="_blank">
  <link rel="stylesheet" href="css/style.css">
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
  <script src="https://cdn.jsdelivr.net/npm/xlsx@0.14.3/dist/xlsx.full.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datasource@0.1.0"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/chartjs-plugin-datalabels/0.7.0/chartjs-plugin-datalabels.min.js"></script>
  <script src="js/chart-index.js" type="module"></script>
  <script src="js/sidenav.js" type="text/javascript"></script>
</head>

<body class="body-main">

  <div id="mainSidenav" class="sidenav">
    <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
    <a href="index" id="selected">SCG Digital</a>
    <a href="cps">Commercial Products & Solutions</a>
    <a href="pse">Platform & Software Engineering</a>
    <a href="sd">Solution Delivery</a>
    <a href="aic">AI Innovation Center</a>
    <a href="tde">Talent & Digital Enablement</a>
  </div>

  
  <div class="subtitle">
    <span class="submenu">
      <span onclick="openNav()"><span style="font-size:30px;">&#9776;</span> DO Workforce </span> |
      <a href="index#index-all">All Departments</a> &#8226;
      <a href="index#index-dv">Delivery [CPS, PSE, SD]</a>
    </span>
    <span class="subbtn">
      <a class="suburl" href="https://scgo365.sharepoint.com/:x:/r/sites/DO-ResourceManagement781-2026/_layouts/15/Doc.aspx?sourcedoc=%7BE5121AEA-3700-4875-85EF-5058B984DD9E%7D&file=DO%20Workforce%20-%20Master.xlsx&action=default&mobileredirect=true" target="_blank">
        <img src="svg/menu-excel.svg" alt="background">
      </a>
    </span>
  </div>
  
  <div class="section">
    <div class="chart rounded-div">
      <div class="chartheader">
        Executive Summary
      </div>
      <div class="chartbody">
        &#8227;&ensp;Q2 2026 – Q1 2027 <span class="text-plan">[Plan 86.54%]</span>
      </div>
      <div class="chartsubbody">
        <div class="chartsubbodycontainer">
          &#8226;&ensp;ปริมาณคน > ปริมาณงาน (diff average รายปี)
        </div>
        <div class="chartsubbodycontainer">
          <div class="chartsubbodytitle">&#8226;&ensp;Top Allocation</div>
          <div class="chartsubbodydata">
            <a href="sd#sd-sect-qa">SD-QA</a> 106.10%<br>
            <a href="sd#sd-sect-sre">SD-SRE</a> 104.21%<br>
            <a href="sd#sd-sect-tm">SD-TM</a> 103.52%
          </div>
        </div>
        <div class="chartsubbodycontainer">
          <div class="chartsubbodytitle">&#8226;&ensp;Top Available</div>
          <div class="chartsubbodydata">
            <a href="aic#aic-sect-sai">AIC-SAI</a>     58.92% <span class="text-avai">[Available 41.08%]</span><br>
            <a href="aic#aic-sect-aie">AIC-AIE</a>     62.62% <span class="text-avai">[Available 37.38%]</span><br>
            <a href="aic#aic-sect-iot">AIC-IoT</a>     67.62% <span class="text-avai">[Available 32.38%]</span><br>
            <a href="sd#sd-sect-design">SD-Design</a>  69.24% <span class="text-avai">[Available 30.76%]</span> 
          </div>
        </div>
        <div class="chartsubbodycontainer">
          <div class="chartsubbodytitle">&#8226;&ensp;Top Diff FTE</div>
          <div class="chartsubbodydata">
            <a href="pse#pse-sect-se">PSE-SE</a> <span class="text-avai">+7.1 FTE</span><br>
            <a href="aic#aic-sect-aie">AIC-AIE</a> <span class="text-avai">+3 FTE</span><br>
            <a href="aic#aic-sect-iot">AIE-IoT</a> <span class="text-avai">+1.7 FTE</span><br> 
            <a href="sd#sd-sect-data">SD-Data</a> <span class="text-avai">+1.7 FTE</span>
          </div>
        </div>
        <div class="chartsubbodycontainer">
          <div class="chartsubbodytitle">&#8226;&ensp;Average Plan</div>
          <div class="chartsubbodydata">
            86.54 % (Available ~ <span class="text-avai">+20.23 FTE</span> per month)
          </div>
        </div>
      </div>
      <div class="chartbody">
        &#8227;&ensp;Q2 2026 <span class="text-plan">[Plan 95.54%]</span>
      </div>
      <div class="chartsubbody">
        <div class="chartsubbodycontainer">
        &#8226;&ensp;May มีปริมาณ Plan FTE สูงสุด [92.03%] เนื่องจากมีงานเข้ามาแน่นอนแล้วในช่วงปัจจุบัน
        </div>
        <div class="chartsubbodycontainer">
          <div class="chartsubbodytitle">&#8226;&ensp;Top Allocation</div>
          <div class="chartsubbodydata">
            <a href="sd#sd-sect-sre">SD-SRE</a> 125.08%<br>
            <a href="sd#sd-sect-qa">SD-QA</a> 105.79%<br>
            <a href="cps#cps-sect-bd">CPS-BD</a> 103.94%<br>
            <a href="sd#sd-sect-ba">SD-BA</a> 103.125%
          </div>
        </div>
        <div class="chartsubbodycontainer">
          <div class="chartsubbodytitle">&#8226;&ensp;Top Available</div>
          <div class="chartsubbodydata">
            <a href="sd#sd-sect-tm">SD-TM</a> 78.08% <span class="text-avai">[Available 21.92%]</span><br>
            <a href="aic#aic-sect-sai">AIC-SAI</a> 81.92% <span class="text-avai">[Available 18.08%]</span><br> 
            <a href="aic#aic-sect-iot">AIC-IoT</a> 85.00% <span class="text-avai">[Available 15.00%]</span> 
          </div>
        </div>
          <div class="chartsubbodycontainer">
          <div class="chartsubbodytitle">&#8226;&ensp;Top Diff FTE</div>
          <div class="chartsubbodydata">
            <a href="pse#pse-sect-se">PSE-SE</a> <span class="text-avai">+2.63 FTE</span><br>
            <a href="aic#aic-sect-aie">AIC-AIE</a> <span class="text-avai">+0.97 FTE</span><br> 
            <a href="sd#sd-sect-data">SD-Data</a> <span class="text-avai">+0.92 FTE</span><br>
            <a href="aic#aic-sect-iot">AIC-IoT</a> <span class="text-avai">+0.9 FTE</span> 
          </div>
        </div>
        <div class="chartsubbodycontainer">
          &#8226;&ensp;ยังเป็นตัวเลขที่สามารถจัดการได้ โดยทีมที่พนักงานเกิน (PSE-SE) สามารถโยกมาทำ Internal Project ได้
        </div>
        <div class="chartsubbodycontainer">
          &#8226;&ensp;ส่วนทีมที่พนักงานขาด (SD-SRE) กำลังอยู่ในช่วงการสรรหาพนักงานใหม่มาเพิ่มเติม
        </div>
      </div>
      <div class="chartbody">
        &#8227;&ensp;Q1 2027 <span class="text-plan">[Plan 69.63%]</span>
      </div>
      <div class="chartsubbody">
        <div class="chartsubbodycontainer">
          &#8226;&ensp;Available เป็นจำนวนมาก เกิดจากความไม่แน่นอนในโปรเจคใหม่ที่จะเข้ามาในปีหน้า รวมถึงมีโปรเจคที่จบตั้งแต่ปี 2026 และยังไม่มีแผนขยาย
        </div>
        <div class="chartsubbodycontainer">
          <div class="chartsubbodytitle">&#8226;&ensp;Top Allocation</div>
          <div class="chartsubbodydata">
            <a href="sd#sd-sect-tm">SD-TM</a> 130%
          </div>
        </div>
        <div class="chartsubbodycontainer">
          <div class="chartsubbodytitle">&#8226;&ensp;Top Available</div>
          <div class="chartsubbodydata">
            <a href="aic#aic-sect-sai">AIC-SAI</a> 10% <span class="text-avai">[Available 90%]</span><br>
            <a href="sd#sd-sect-pm">SD-PM</a> 25% <span class="text-avai">[Available 75%]</span><br>
            <a href="sd#sd-sect-design">SD-Design</a> 27.86% <span class="text-avai">[Available 72.14%]</span><br>
            <a href="aic#aic-sect-iot">AIC-IoT</a> 28% <span class="text-avai">[Available 72%]</span> 
          </div>
        </div>
        <div class="chartsubbodycontainer">
          <div class="chartsubbodytitle">&#8226;&ensp;Top Diff FTE</div>
          <div class="chartsubbodydata">
            <a href="pse#pse-sect-se">PSE-SE</a> <span class="text-avai"> +16.35 FTE</span>
          </div>
        </div>

TEST Allocation
<topalloc>SD-SRE, sd, sd-sect-sre, 125.08%</topalloc>
      </div>
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
  
  <iframe src="footer.html"></iframe>

</body>

