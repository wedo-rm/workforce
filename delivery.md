<head>
  <base target="_blank">
  <link rel="stylesheet" href="css/style.css">
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
  <script src="https://cdn.jsdelivr.net/npm/xlsx@0.14.3/dist/xlsx.full.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datasource@0.1.0"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/chartjs-plugin-datalabels/0.7.0/chartjs-plugin-datalabels.min.js"></script>
  <script src="js/chart-delivery.js" type="module"></script>
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
    <a href="tde">Talent & Digital Enablement</a>
    <a href="delivery" id="selected">Delivery Team [CPS, PSE, SD]</a>
  </div>
  
  <div class="subtitle">
    <span class="submenu" onclick="openNav()"><span style="font-size:30px;">&#9776;</span> Delivery Workforce </span>
    <span class="subbtn">
      <a class="suburl" href="https://scgo365.sharepoint.com/:x:/r/sites/DO-ResourceManagement781-2026/_layouts/15/Doc.aspx?sourcedoc=%7BE5121AEA-3700-4875-85EF-5058B984DD9E%7D&file=DO%20Workforce%20-%20Master.xlsx&action=default&mobileredirect=true" target="_blank">
        <img src="svg/menu-excel.svg" alt="background">
      </a>
    </span>
  </div>
  
  <div class="section">
    <div class="chart rounded-div">
      <div class="chartheader">
        Delivery Summary
      </div>
      <div class="chartbody">
        &#8227;&ensp;Q2 2026 – Q1 2027 <span class="text-plan">[Plan 88.48%]</span>
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
            <a href="sd#sd-sect-design">SD-Design</a> 69.24% <span class="text-avai">[Available 30.76%]</span> 
          </div>
        </div>
        <div class="chartsubbodycontainer">
          <div class="chartsubbodytitle">&#8226;&ensp;Top Diff FTE</div>
          <div class="chartsubbodydata">
            <a href="pse#pse-sect-se">PSE-SE</a> <span class="text-avai">+7.1 FTE</span><br>
            <a href="sd#sd-sect-data">SD-Data</a> <span class="text-avai">+1.7 FTE</span>
          </div>
        </div>
        <div class="chartsubbodycontainer">
          <div class="chartsubbodytitle">&#8226;&ensp;Average Plan</div>
          <div class="chartsubbodydata">
            88.48 % (Available ~ <span class="text-avai">+13 FTE</span> per month)
          </div>
        </div>
      </div>
      <div class="chartbody">
        &#8227;&ensp;Q2 2026 <span class="text-plan">[Plan 97.06%]</span>
      </div>
      <div class="chartsubbody">
        <div class="chartsubbodycontainer">
        &#8226;&ensp;May มีปริมาณ Plan FTE สูงสุด [98.51%] เนื่องจากมีงานเข้ามาแน่นอนแล้วในช่วงปัจจุบัน
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
            <a href="sd#sd-sect-tm">SD-TM</a> 78.08% <span class="text-avai">[Available 21.92%]</span>
          </div>
        </div>
          <div class="chartsubbodycontainer">
          <div class="chartsubbodytitle">&#8226;&ensp;Top Diff FTE</div>
          <div class="chartsubbodydata">
            <a href="pse#pse-sect-se">PSE-SE</a> <span class="text-avai">+2.63 FTE</span><br>
            <a href="sd#sd-sect-data">SD-Data</a> <span class="text-avai">+0.92 FTE</span>
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
        &#8227;&ensp;Q1 2027 <span class="text-plan">[Plan 70.33%]</span>
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
            <a href="sd#sd-sect-pm">SD-PM</a> 25% <span class="text-avai">[Available 75%]</span><br>
            <a href="sd#sd-sect-design">SD-Design</a> 27.86% <span class="text-avai">[Available 72.14%]</span>
          </div>
        </div>
        <div class="chartsubbodycontainer">
          <div class="chartsubbodytitle">&#8226;&ensp;Top Diff FTE</div>
          <div class="chartsubbodydata">
            <a href="pse#pse-sect-se">PSE-SE</a> <span class="text-avai"> +16.35 FTE</span>
          </div>
        </div>
      </div>
    </div>
    <div class="chart rounded-div" id="index-planactual">
      <canvas id="workforceChartDVPlanActual"></canvas>
    </div>
    <div class="chart rounded-div" id="index-main-mth">
      <canvas id="workforceChartDV"></canvas>
    </div>
    <div class="chart rounded-div" id="index-main-qtr">
      <canvas id="workforceChartDVQTR"></canvas>
    </div>
    <div class="secwrapper">
        <div class="secrow" id="index-main-avaiplan">
            <div class="secleft">
              <div class="chart rounded-div"><canvas id="workforceChartDVAvai"></canvas></div>
            </div>
            <div class="secright">
              <div class="chart rounded-div"><canvas id="workforceChartDVPlanQtr"></canvas></div>
            </div>
        </div>
    </div>
  </div>
    
  <div class="section" id="index-resource">
    Per Resource Type
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
    </div>
  </div>
  
  <iframe src="footer.html"></iframe>

</body>

