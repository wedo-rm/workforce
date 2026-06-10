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
    <span class="submenu">
      <span onclick="openNav()"><span style="font-size:30px;">&#9776;</span> SD Workforce </span> |
      <a href="sd#sd-sect-design">Design</a> &#8226;
      <a href="sd#sd-sect-data">Data</a> &#8226;
      <a href="sd#sd-sect-sa">SA</a> &#8226;
      <a href="sd#sd-sect-sre">SRE</a> &#8226;
      <a href="sd#sd-sect-sec">SEC</a> &#8226;
      <a href="sd#sd-sect-pm">PM</a> &#8226;
      <a href="sd#sd-sect-ba">BA</a> &#8226;
      <a href="sd#sd-sect-qa">QA</a> &#8226;
      <a href="sd#sd-sect-tm">TM</a>
    </span>
    <span class="subbtn">
      <a class="suburl" href="https://scgo365.sharepoint.com/:x:/r/sites/DO-ResourceManagement781-2026/_layouts/15/Doc.aspx?sourcedoc=%7BC72218B3-A306-4A72-A5E7-52741AB15BB6%7D&file=DO%20Workforce%20-%204%20SD.xlsx&action=default&mobileredirect=true" target="_blank">
        <img src="svg/menu-excel.svg" alt="background">
      </a>
    </span>
  </div>
  
  <div class="section">
    <!-- start summary -->
    <div class="chart rounded-div">
      <div class="chartheaderleft">
        SD Workforce Summary Q2/2026
      </div>
      <div class="chartbody">
        &#8227;&ensp;Q2 2026 – Q1 2027 <span class="text-plan">[Plan 90.40%]</span>
      </div>
      <div class="chartsubbody">
        <div class="chartsubbodycontainer">
          &#8226;&ensp;ภาพรวม กราฟ Plan ลงเป็นระนาบเดียวกัน เนื่องจากความไม่แน่นอนในอนาคต
        </div>
        <div class="chartsubbodycontainer">
          &#8226;&ensp;ยังมี Available ในการรับงานในอนาคตเพิ่มเติม ยกเว้น SRE, QA, TM
        </div>
      </div>
      <div class="chartbody">
        &#8227;&ensp;<a href="sd#sd-sect-sre">Site Reliability Engineering</a> <span class="text-plan">[Plan 104.21%]</span>
      </div>
      <div class="chartsubbody">
        <div class="chartsubbodycontainer">
          &#8226;&ensp;ปริมาณงานมากกว่าจำนวนพนักงาน สูงที่สุดในช่วง Q2 โดย Plan อยู่ที่ 125.08% <span class="text-red">[Available -0.5 FTE]</span>
        </div>
        <div class="chartsubbodycontainer">
          &#8226;&ensp;กำลังอยู่ในช่วงการสรรหาพนักงานใหม่มาเพิ่มเติม เพื่อรองรับงานปัจจุบัน และในอนาคตที่จะเข้ามาเพิ่มเติม
        </div>
      </div>
      <div class="chartbody">
        &#8227;&ensp;<a href="sd#sd-sect-qa">Technology QA</a> <span class="text-plan">[Plan 106.10%]</span>
      </div>
      <div class="chartsubbody">
        <div class="chartsubbodycontainer">
          &#8226;&ensp;ปริมาณงานมากกว่าจำนวนพนักงาน สูงที่สุดในช่วง Q3 โดย Plan อยู่ที่ 129.89% <span class="text-red">[Available -3.47 FTE]</span>
        </div>
        <div class="chartsubbodycontainer">
          &#8226;&ensp;สามารถใช้พนักงาน Outsource จาก Doppio มาเพื่อช่วยงานเพิ่มเติม
        </div>
        <div class="chartsubbodycontainer">
          &#8226;&ensp;Note: Doppio usage during Jan-Apr 2026 ~ 509.22 from 1,900 MDs
        </div>
      </div>
      <div class="chartbody">
        &#8227;&ensp;<a href="sd#sd-sect-tm">Technology Management</a> <span class="text-plan">[Plan 103.52%]</span>
      </div>
      <div class="chartsubbody">
        <div class="chartsubbodycontainer">
          &#8226;&ensp;ปริมาณงานมากกว่าจำนวนพนักงาน สูงที่สุดในช่วง Q1/2027 โดย Plan อยู่ที่ 130% <span class="text-red">[Available -1.2 FTE]</span>
        </div>
        <div class="chartsubbodycontainer">
          &#8226;&ensp;เนื่องจากโปรเจค New CDAS ต้องการ TM Support 24x7 จึงต้องมีพนักงาน Standby on-call 2 คน สลับนอกเวลางานกันคนละสัปดาห์
        </div>
        <div class="chartsubbodycontainer">
          &#8226;&ensp;ตัวเลขการประเมินอาจมีการเปลี่ยนแปลงอีกครั้ง หากได้รับการคอนเฟิร์มโมเดลการจ้างงานในเดือนมิถุนายนนี้
        </div>
      </div>
    </div>
    <!-- end summary -->
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
  </div>
    
  <div class="section" id="sd-resource">
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
  </div>
  
  <iframe src="footer.html"></iframe>
  
</body>
