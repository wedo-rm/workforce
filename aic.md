<head>
  <link rel="stylesheet" href="css/style.css">
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
  <script src="https://cdn.jsdelivr.net/npm/xlsx@0.14.3/dist/xlsx.full.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datasource@0.1.0"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/chartjs-plugin-datalabels/0.7.0/chartjs-plugin-datalabels.min.js"></script>
  <script src="js/chart-aic.js" type="module"></script>
  <script src="js/sidenav.js" type="text/javascript"></script>
</head>

<body class="body-main">

  <div id="mainSidenav" class="sidenav">
    <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
    <a href="index">SCG Digital</a>
    <a href="cps">Commercial Products & Solutions</a>
    <a href="pse">Platform & Software Engineering</a>
    <a href="sd">Solution Delivery</a>
    <a href="aic" id="selected">AI Innovation Center</a>
    <a href="tde">Talent & Digital Enablement</a>
  </div>
  
  <div class="subtitle">
    <span onclick="openNav()"><span style="font-size:30px;">&#9776;</span> AIC Workforce </span> |
      <a href="aic#aic-sect-ra"> R&A</a> &#8226;
      <a href="aic#aic-sect-aie">AIE</a> &#8226;
      <a href="aic#aic-sect-iot">IoT</a> &#8226;
      <a href="aic#aic-sect-sai">SAI</a> &#8226;
      <a href="aic#aic-sect-pi"> PI</a>
    </span>
    <span class="subbtn">
      <a class="suburl" href="https://scgo365.sharepoint.com/:x:/r/sites/DO-ResourceManagement781-2026/_layouts/15/Doc.aspx?sourcedoc=%7BD68329D4-3D1A-4AEA-BD0D-DD0EF3E5B83E%7D&file=DO%20Workforce%20-%205%20AIC.xlsx&action=default&mobileredirect=true" target="_blank">
        <img src="svg/menu-excel.svg" alt="background">
      </a>
    </span>
  </div>
  
  <div class="section">
    <!-- start summary -->
    <div class="chart rounded-div">
      <div class="chartheaderleft">
        AIC Workforce Summary Q2/2026
      </div>
      <div class="chartbody">
        &#8227;&ensp;Q2 2026 – Q1 2027 <span class="text-plan">[Plan 68.23%]</span>
      </div>
      <div class="chartsubbody">
        <div class="chartsubbodycontainer">
          &#8226;&ensp;ภาพรวม กราฟ Plan ลงเป็นระนาบเดียวกัน เนื่องจากความไม่แน่นอนในอนาคต
        </div>
        <div class="chartsubbodycontainer">
          &#8226;&ensp;งานที่จะรับจากทาง AE/BD ยังมีความไม่แน่นอน และไม่แน่ใจจะเริ่มเมื่อไหร่
        </div>
        <div class="chartsubbodycontainer">
          &#8226;&ensp;จำนวนพนักงานในปัจจุบัน ยังสามารถรองรับงานที่จะเข้ามาในอนาคตได้
        </div>
        <div class="chartsubbodycontainer">
          &#8226;&ensp;Note: ไม่มีพนักงานภายใต้ Product Innovation แล้ว นับตั้งแต่ Q2/2026 เป็นต้นมา
        </div>
      </div>
      <div class="chartbody">
        &#8227;&ensp;<a href="aic#aic-sect-aie">AIET AI Engineering</a> <span class="text-plan">[Plan 62.62%]</span>
      </div>
      <div class="chartsubbody">
        <div class="chartsubbodycontainer">
          &#8226;&ensp;ปริมาณคนมากกว่าปริมาณงาน โดยมีส่วนต่างสูงสุดอยู่ที่ Q1/2027 โดยมีการ Plan อยู่ที่ 46.06% <span class="text-avai">[Available +4.3 FTE]</span>
        </div>
        <div class="chartsubbodycontainer">
          &#8226;&ensp;งานที่จะรับจากทาง AE/BD ยังมีความไม่แน่นอน และไม่แน่ใจจะเริ่มเมื่อไหร่
        </div>
        <div class="chartsubbodycontainer">
          &#8226;&ensp;Plan สำหรับการทำ Research & Explore ประมาณ 0.05 FTE สำหรับพนักงาน 1 คน ต่อเดือน
        </div>
      </div>
      <div class="chartbody">
        &#8227;&ensp;<a href="aic#aic-sect-iot">AIET IoT Engineering</a> <span class="text-plan">[Plan 67.62%]</span>
      </div>
      <div class="chartsubbody">
        <div class="chartsubbodycontainer">
          &#8226;&ensp;ปริมาณคนมากกว่าปริมาณงาน โดยมีส่วนต่างสูงสุดอยู่ที่ Q1/2027 โดยมีการ Plan อยู่ที่ 28.00% <span class="text-avai">[Available +3.6 FTE]</span>
        </div>
        <div class="chartsubbodycontainer">
          &#8226;&ensp;งานพาร์ท IoT ส่วนใหญ่จะจบจบภายในปี 2026
        </div>
        <div class="chartsubbodycontainer">
          &#8226;&ensp;Plan สำหรับการทำ Research & Explore ประมาณ 0.05 FTE สำหรับพนักงาน 1 คน ต่อเดือน
        </div>
      </div>
      <div class="chartbody">
        &#8227;&ensp;<a href="aic#aic-sect-sai">AIET Spatial AI Engineering</a> <span class="text-plan">[Plan 58.92%]</span>
      </div>
      <div class="chartsubbody">
        <div class="chartsubbodycontainer">
          &#8226;&ensp;ปริมาณคนมากกว่าปริมาณงาน โดยมีส่วนต่างสูงสุดอยู่ที่ Q1/2027 โดยมีการ Plan อยู่ที่ 10.00% <span class="text-avai">[Available +3.6 FTE]</span>
        </div>
        <div class="chartsubbodycontainer">
          &#8226;&ensp;ประเมิน Plan จากหัวข้อ Research ที่ดูแลอยู่ในปัจจุบันเท่านั้น ซึ่งงานส่วนใหญ่จะจบภายในสิ้นปี 2026
        </div>
        <div class="chartsubbodycontainer">
          &#8226;&ensp;สำหรับหัวข้อ Research ในปี 2027 จะดูปลาย Q3 ว่าจะลง Research ในส่วนไหน ซึ่งข้อมูลการ Plan อาจะมีการเปลี่ยนแปลงในรอบการประเมินถัดไป
        </div>
      </div>
    </div>
    <!-- end summary -->
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
  </div>
    
  <div class="section" id="aic-resource">
    Per Resource Type
    <div class="chart rounded-div">
      <canvas id="workforceChartAICPR"></canvas>
    </div>
    <div class="chart rounded-div">
      <canvas id="workforceChartAICCT"></canvas>
    </div>
    <div class="chart rounded-div">
      <canvas id="workforceChartAICOS"></canvas>
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
  </div>
  
  <iframe src="footer.html"></iframe>
  
</body>
