# 📊 SCG Digital Workforce Dashboard

> Interactive dashboard for workforce planning, utilization tracking, and resource allocation analysis across SCG Digital business units.

**🌐 Live Site:** [wedo-rm.github.io/workforce](https://wedo-rm.github.io/workforce/)

---

## 🎯 Purpose

This dashboard provides executive-level visibility into workforce planning across the SCG Digital organization, covering:

- 📈 **Workforce Planning** — FTE allocation, utilization, and gap analysis
- 🏢 **Business Unit Breakdown** — CPS, PSE, SD, AIC, TDE
- 📅 **Time-based Analysis** — Monthly, Quarterly, Yearly views
- 💼 **Resource Types** — Payroll, Contractor, Outsource
- 💰 **Financial Tracking** — Project revenue vs. workforce cost

---

## 📁 Repository Structure

```
workforce/
├── index.md              # 🏠 Main dashboard (All Departments)
├── cps.md                # Commercial Products & Solutions
├── pse.md                # Platform & Software Engineering
├── sd.md                 # Solution Delivery
├── aic.md                # AI Innovation Center
├── tde.md                # Talent & Digital Enablement
├── delivery.md           # Delivery [CPS, PSE, SD]
├── chart-index.js        # 📊 Chart.js configurations (32 charts)
├── workforceresult.xlsx  # 📋 Data source (Excel)
├── footer.html           # Shared footer component
└── README.md             # This file
```

---

## 🚀 Getting Started

### Prerequisites
- Git
- Modern web browser (Chrome, Edge, Safari)
- Access to `wedo-rm` GitHub organization

### Clone
```bash
git clone https://github.com/wedo-rm/workforce.git
cd workforce
```

### Local Development
Site is built with **Jekyll** and served via **GitHub Pages**. For local preview, deploy to a test branch and view via GitHub Pages.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Hosting** | GitHub Pages |
| **Site Generator** | Jekyll |
| **Charts** | Chart.js 2.8.0 |
| **Data Loading** | chartjs-plugin-datasource |
| **Data Labels** | chartjs-plugin-datalabels |
| **Data Source** | Excel (.xlsx) |
| **Fonts** | MindSans |

---

## 📊 Data Update Workflow

### 1. Update Excel Data
Update `workforceresult.xlsx` with latest workforce data:
- `GraphAll` sheet — All departments
- `GraphCPS`, `GraphPSE`, `GraphSD`, `GraphAIC`, `GraphTDE` — Per BU
- `GraphPJ` — Projects & Products

### 2. Update Executive Summary
Edit `index.md` to update:
- Top Allocation
- Top Available
- Top Diff FTE
- Average Plan

### 3. Commit & Deploy
```bash
git add .
git commit -m "Q3 2026 workforce data update"
git push
```

Site will auto-deploy via GitHub Pages within 1-3 minutes.

---

## 🗂️ Reporting Cycle

Workforce planning is reviewed **quarterly**:

| Quarter | Backup Repository |
|---|---|
| Q2 2026 | [workforce-2026-q2](https://github.com/wedo-rm/workforce-2026-q2) |
| Q1 2026 | *(archived)* |

---

## 👥 Ownership

**Owner:** Resource Management (RM) Team — SCG Digital  
**Maintainer:** wedo-rm

For questions or updates, contact the RM team.

---

## 📝 Change Log

### 2026-07
- Q3 2026 report cycle initiated
- Migrated development workflow to VS Code + local Git

### 2026-Q2
- Added executive summary section
- Updated chart layouts for CPS, PSE

---

## 📄 License

Internal use only — SCG Digital.
