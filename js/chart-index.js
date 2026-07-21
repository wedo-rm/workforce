/*
 * Full Chart.js 4 migration for the workforce dashboard.
 *
 * The chart definitions below are retained from the original chart-index.js.
 * The compatibility functions replace chartjs-plugin-datasource with direct
 * SheetJS parsing and translate the remaining Chart.js 2 options to Chart.js 4.
 */

const WORKBOOK_URL = 'workforceresult.xlsx';
const NativeChart = globalThis.Chart;

function assertBrowserDependency(name, value) {
  if (typeof value === 'undefined') {
    throw new Error(`${name} did not load. Check the script tags and network.`);
  }
}

function readQualifiedRange(workbook, qualifiedRange, formatted = false) {
  const separator = qualifiedRange.lastIndexOf('!');

  if (separator < 1) {
    throw new Error(`Invalid workbook range: ${qualifiedRange}`);
  }

  const sheetName = qualifiedRange.slice(0, separator);
  const rangeAddress = qualifiedRange.slice(separator + 1);
  const worksheet = workbook.Sheets[sheetName];

  if (!worksheet) {
    throw new Error(`Worksheet "${sheetName}" was not found.`);
  }

  const range = XLSX.utils.decode_range(rangeAddress);
  const rows = [];

  for (let rowIndex = range.s.r; rowIndex <= range.e.r; rowIndex += 1) {
    const row = [];

    for (let columnIndex = range.s.c; columnIndex <= range.e.c; columnIndex += 1) {
      const address = XLSX.utils.encode_cell({ r: rowIndex, c: columnIndex });
      const cell = worksheet[address];

      if (!cell) {
        row.push(null);
      } else if (formatted && cell.w !== undefined) {
        row.push(cell.w);
      } else {
        row.push(cell.v);
      }
    }

    rows.push(row);
  }

  return rows;
}

async function loadWorkbook(url) {
  const response = await fetch(url, { cache: 'no-store' });

  if (!response.ok) {
    throw new Error(`Could not load ${url} (${response.status} ${response.statusText}).`);
  }

  const buffer = await response.arrayBuffer();
  return XLSX.read(buffer, { type: 'array', cellDates: true });
}

function migrateTitleOptions(legacyTitle) {
  if (!legacyTitle) {
    return undefined;
  }

  const title = { ...legacyTitle };

  if (title.fontSize !== undefined) {
    title.font = { ...(title.font || {}), size: title.fontSize };
    delete title.fontSize;
  }

  if (title.fontColor !== undefined) {
    title.color = title.fontColor;
    delete title.fontColor;
  }

  return title;
}

function migrateTooltipOptions(legacyTooltip) {
  if (!legacyTooltip) {
    return undefined;
  }

  const tooltip = { ...legacyTooltip };

  if (tooltip.titleFontSize !== undefined) {
    tooltip.titleFont = { ...(tooltip.titleFont || {}), size: tooltip.titleFontSize };
    delete tooltip.titleFontSize;
  }

  return tooltip;
}

function formatNumberMaxTwoDecimals(value) {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return value;
  }

  return String(Math.round((numericValue + Number.EPSILON) * 100) / 100);
}

function isStaffAverageDataset(dataset) {
  return String(dataset?.label || '').trim().toUpperCase() === 'STAFF AVG';
}

const MONTH_NAME_TO_INDEX = new Map([
  ['JAN', 0], ['JANUARY', 0],
  ['FEB', 1], ['FEBRUARY', 1],
  ['MAR', 2], ['MARCH', 2],
  ['APR', 3], ['APRIL', 3],
  ['MAY', 4],
  ['JUN', 5], ['JUNE', 5],
  ['JUL', 6], ['JULY', 6],
  ['AUG', 7], ['AUGUST', 7],
  ['SEP', 8], ['SEPT', 8], ['SEPTEMBER', 8],
  ['OCT', 9], ['OCTOBER', 9],
  ['NOV', 10], ['NOVEMBER', 10],
  ['DEC', 11], ['DECEMBER', 11]
]);

function parseMonthLabel(label, currentYear = new Date().getFullYear()) {
  const normalized = String(label ?? '')
    .trim()
    .toUpperCase()
    .replace(/[’`]/g, "'")
    .replace(/\./g, '');
  const match = normalized.match(/^([A-Z]+)(?:\s*['-]?\s*(\d{2}|\d{4}))?$/);

  if (!match || !MONTH_NAME_TO_INDEX.has(match[1])) {
    return null;
  }

  const yearText = match[2];
  const year = !yearText
    ? currentYear
    : yearText.length === 2
      ? 2000 + Number(yearText)
      : Number(yearText);

  return { year, month: MONTH_NAME_TO_INDEX.get(match[1]) };
}

function isHistoricalMonthLabel(label, now = new Date()) {
  const parsed = parseMonthLabel(label, now.getFullYear());

  return Boolean(parsed) && (
    parsed.year < now.getFullYear() ||
    (parsed.year === now.getFullYear() && parsed.month < now.getMonth())
  );
}

function parseQuarterLabel(label, currentYear = new Date().getFullYear()) {
  const normalized = String(label ?? '')
    .trim()
    .toUpperCase()
    .replace(/[’`]/g, "'")
    .replace(/\./g, '');
  const match = normalized.match(/^Q([1-4])(?:\s*['-]?\s*(\d{2}|\d{4}))?$/);

  if (!match) {
    return null;
  }

  const yearText = match[2];
  const year = !yearText
    ? currentYear
    : yearText.length === 2
      ? 2000 + Number(yearText)
      : Number(yearText);

  return { year, quarter: Number(match[1]) };
}

function isHistoricalQuarterLabel(label, now = new Date()) {
  const parsed = parseQuarterLabel(label, now.getFullYear());
  const currentQuarter = Math.floor(now.getMonth() / 3) + 1;

  return Boolean(parsed) && (
    parsed.year < now.getFullYear() ||
    (parsed.year === now.getFullYear() && parsed.quarter < currentQuarter)
  );
}

function mixColorWithWhite(color, whiteRatio = 0.5) {
  if (typeof color !== 'string') {
    return color;
  }

  const rgbaMatch = color.trim().match(
    /^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*[,/]\s*([\d.]+))?\s*\)$/i
  );
  let channels;
  let alpha = 1;

  if (rgbaMatch) {
    channels = rgbaMatch.slice(1, 4).map(Number);
    alpha = rgbaMatch[4] === undefined ? 1 : Number(rgbaMatch[4]);
  } else {
    const hexMatch = color.trim().match(/^#([\da-f]{3}|[\da-f]{6}|[\da-f]{8})$/i);

    if (!hexMatch) {
      return color;
    }

    let hex = hexMatch[1];

    if (hex.length === 3) {
      hex = hex.split('').map((character) => character + character).join('');
    }

    if (hex.length === 8) {
      alpha = parseInt(hex.slice(6, 8), 16) / 255;
      hex = hex.slice(0, 6);
    }

    channels = [0, 2, 4].map((offset) => parseInt(hex.slice(offset, offset + 2), 16));
  }

  const mixedChannels = channels.map((channel) =>
    Math.round(channel + (255 - channel) * whiteRatio)
  );

  return `rgba(${mixedChannels.join(', ')}, ${alpha})`;
}

function resolveScriptableColor(option, context) {
  return typeof option === 'function' ? option(context) : option;
}

function configureHistoricalTimelineColors(config) {
  const labels = config.data.labels || [];
  const currentYear = new Date().getFullYear();
  const isMonthlyTimeline = labels.length > 1 && labels.every((label) =>
    parseMonthLabel(label, currentYear)
  );
  const isQuarterlyTimeline = labels.length > 1 && labels.every((label) =>
    parseQuarterLabel(label, currentYear)
  );

  if (!isMonthlyTimeline && !isQuarterlyTimeline) {
    return;
  }

  const globalDatalabels = config.options.plugins.datalabels || {};
  const legendColors = new Map();
  const isHistoricalIndex = (dataIndex) => {
    if (!Number.isInteger(dataIndex)) {
      return false;
    }

    return isMonthlyTimeline
      ? isHistoricalMonthLabel(labels[dataIndex])
      : isHistoricalQuarterLabel(labels[dataIndex]);
  };

  for (const dataset of config.data.datasets) {
    const datasetType = dataset.type || config.type;

    if (!['line', 'bar'].includes(datasetType) || isStaffAverageDataset(dataset)) {
      continue;
    }

    const baseBorderColor = dataset.borderColor;
    const baseBackgroundColor = dataset.backgroundColor;
    const legendFillColor = typeof baseBackgroundColor === 'string'
      ? baseBackgroundColor
      : typeof baseBorderColor === 'string'
        ? baseBorderColor
        : undefined;
    const legendStrokeColor = typeof baseBorderColor === 'string'
      ? baseBorderColor
      : legendFillColor;

    legendColors.set(dataset, {
      fillStyle: legendFillColor,
      strokeStyle: legendStrokeColor
    });

    dataset.datalabels ||= {};
    const baseDatalabelBackground = dataset.datalabels.backgroundColor ??
      globalDatalabels.backgroundColor;
    const baseDatalabelColor = dataset.datalabels.color ?? globalDatalabels.color;

    const resolveDatalabelBackground = (context) => {
      const resolved = resolveScriptableColor(baseDatalabelBackground, context);

      // Several original callbacks return context.dataset.backgroundColor.
      // Once a bar becomes scriptable that value is a function, so retain the
      // captured solid dataset color for the datalabel box instead.
      return typeof resolved === 'string'
        ? resolved
        : typeof baseBackgroundColor === 'string'
          ? baseBackgroundColor
          : resolved;
    };

    if (datasetType === 'line' && typeof baseBorderColor === 'string') {
      const originalSegmentBorderColor = dataset.segment?.borderColor;
      const basePointBorderColor = dataset.pointBorderColor || baseBorderColor;
      const basePointBackgroundColor =
        dataset.pointBackgroundColor || baseBackgroundColor;

      dataset.segment = {
        ...(dataset.segment || {}),
        borderColor(context) {
          const originalColor = resolveScriptableColor(
            originalSegmentBorderColor,
            context
          ) || baseBorderColor;

          return isHistoricalIndex(context.p1DataIndex)
            ? mixColorWithWhite(originalColor, 0.5)
            : originalColor;
        }
      };

      dataset.pointBorderColor = (context) => {
        const originalColor = resolveScriptableColor(basePointBorderColor, context);

        return isHistoricalIndex(context.dataIndex)
          ? mixColorWithWhite(originalColor, 0.5)
          : originalColor;
      };

      if (basePointBackgroundColor) {
        dataset.pointBackgroundColor = (context) => {
          const originalColor = resolveScriptableColor(
            basePointBackgroundColor,
            context
          );

          return isHistoricalIndex(context.dataIndex)
            ? mixColorWithWhite(originalColor, 0.5)
            : originalColor;
        };
      }
    }

    if (datasetType === 'bar' && typeof baseBackgroundColor === 'string') {
      dataset.backgroundColor = (context) =>
        isHistoricalIndex(context.dataIndex)
          ? mixColorWithWhite(baseBackgroundColor, 0.5)
          : baseBackgroundColor;

      const baseHoverBackgroundColor = typeof dataset.hoverBackgroundColor === 'string'
        ? dataset.hoverBackgroundColor
        : baseBackgroundColor;
      dataset.hoverBackgroundColor = (context) =>
        isHistoricalIndex(context.dataIndex)
          ? mixColorWithWhite(baseHoverBackgroundColor, 0.5)
          : baseHoverBackgroundColor;

      if (typeof baseBorderColor === 'string') {
        dataset.borderColor = (context) =>
          isHistoricalIndex(context.dataIndex)
            ? mixColorWithWhite(baseBorderColor, 0.5)
            : baseBorderColor;
      }
    }

    dataset.datalabels.backgroundColor = (context) => {
      const originalColor = resolveDatalabelBackground(context);

      return isHistoricalIndex(context.dataIndex)
        ? mixColorWithWhite(originalColor, 0.5)
        : originalColor;
    };

    dataset.datalabels.color = (context) => {
      const originalBackground = resolveDatalabelBackground(context);
      const originalColor = resolveScriptableColor(baseDatalabelColor, context);

      // Labels without a colored box (for example Available) use colored text,
      // so fade the text itself. Boxed labels keep their existing text color.
      return isHistoricalIndex(context.dataIndex) && !originalBackground
        ? mixColorWithWhite(originalColor, 0.5)
        : originalColor;
    };
  }

  config.options.plugins.legend ||= {};
  config.options.plugins.legend.labels ||= {};
  const existingGenerateLabels =
    config.options.plugins.legend.labels.generateLabels ||
    NativeChart.defaults?.plugins?.legend?.labels?.generateLabels ||
    ((chart) => chart.data.datasets.map((dataset, datasetIndex) => ({
      text: dataset.label || '',
      datasetIndex,
      fillStyle: dataset.backgroundColor,
      strokeStyle: dataset.borderColor
    })));

  config.options.plugins.legend.labels.generateLabels = (chart) =>
    existingGenerateLabels(chart).map((legendItem) => {
      const dataset = chart.data.datasets[legendItem.datasetIndex];
      const originalColors = legendColors.get(dataset);

      if (!originalColors) {
        return legendItem;
      }

      return {
        ...legendItem,
        fillStyle: originalColors.fillStyle || legendItem.fillStyle,
        strokeStyle: originalColors.strokeStyle || legendItem.strokeStyle
      };
    });
}

const AVAILABLE_POSITIVE_COLOR = '#c00000';
const AVAILABLE_ZERO_COLOR = '#a5a5a5';
const AVAILABLE_NEGATIVE_COLOR = '#7030a0';

function configureAvailableStatusColors(config) {
  const titleText = String(config.options.plugins?.title?.text || '').toUpperCase();
  const labels = config.data.labels || [];

  if (!titleText.includes('AVAILABLE') || !titleText.includes('MONTH')) {
    return;
  }

  const colorForValue = (value) => {
    const numericValue = Number(value);

    if (numericValue < 0) {
      return AVAILABLE_NEGATIVE_COLOR;
    }

    if (numericValue > 0) {
      return AVAILABLE_POSITIVE_COLOR;
    }

    return AVAILABLE_ZERO_COLOR;
  };
  const colorForIndex = (dataset, dataIndex) => {
    const statusColor = colorForValue(dataset.data?.[dataIndex]);

    return isHistoricalMonthLabel(labels[dataIndex])
      ? mixColorWithWhite(statusColor, 0.5)
      : statusColor;
  };

  for (const dataset of config.data.datasets) {
    if ((dataset.type || config.type) !== 'line') {
      continue;
    }

    dataset.borderColor = AVAILABLE_ZERO_COLOR;
    dataset.backgroundColor = AVAILABLE_ZERO_COLOR;
    dataset.segment = {
      ...(dataset.segment || {}),
      borderColor: (context) => colorForIndex(dataset, context.p1DataIndex)
    };
    dataset.pointBorderColor = (context) =>
      colorForIndex(dataset, context.dataIndex);
    dataset.pointBackgroundColor = (context) =>
      colorForIndex(dataset, context.dataIndex);
    dataset.hoverBorderColor = (context) =>
      colorForIndex(dataset, context.dataIndex);
    dataset.hoverBackgroundColor = (context) =>
      colorForIndex(dataset, context.dataIndex);
    dataset.datalabels ||= {};
    dataset.datalabels.backgroundColor = null;
    dataset.datalabels.color = (context) =>
      colorForIndex(dataset, context.dataIndex);
  }

  config.options.plugins.legend ||= {};
  config.options.plugins.legend.labels ||= {};
  const existingGenerateLabels =
    config.options.plugins.legend.labels.generateLabels ||
    NativeChart.defaults?.plugins?.legend?.labels?.generateLabels ||
    ((chart) => chart.data.datasets.map((dataset, datasetIndex) => ({
      text: dataset.label || '',
      datasetIndex,
      fillStyle: dataset.backgroundColor,
      strokeStyle: dataset.borderColor
    })));

  config.options.plugins.legend.labels.generateLabels = (chart) =>
    existingGenerateLabels(chart).map((legendItem) => ({
      ...legendItem,
      fillStyle: AVAILABLE_ZERO_COLOR,
      strokeStyle: AVAILABLE_ZERO_COLOR
    }));
}

function configurePercentPlanUnits(config) {
  const titleText = String(config.options.plugins?.title?.text || '').toUpperCase();

  if (!titleText.includes('%') || !titleText.includes('PLAN')) {
    return;
  }

  const planColor = '#ed7d32';
  const overCapacityColor = '#c65911';
  const formatPercent = (value) => `${formatNumberMaxTwoDecimals(value)}%`;
  const labels = config.data.labels || [];
  const numericValueAt = (dataset, dataIndex) => {
    const rawValue = dataset.data?.[dataIndex];
    const value = rawValue && typeof rawValue === 'object'
      ? rawValue.y ?? rawValue.value
      : rawValue;

    return Number(value);
  };
  const colorForIndex = (dataset, dataIndex) => {
    const baseColor = numericValueAt(dataset, dataIndex) > 100
      ? overCapacityColor
      : planColor;

    return isHistoricalQuarterLabel(labels[dataIndex])
      ? mixColorWithWhite(baseColor, 0.5)
      : baseColor;
  };

  for (const dataset of config.data.datasets) {
    dataset.datalabels ||= {};
    dataset.datalabels.formatter = formatPercent;

    if ((dataset.type || config.type) !== 'line') {
      continue;
    }

    dataset.borderColor = planColor;
    dataset.backgroundColor = planColor;
    dataset.segment = {
      ...(dataset.segment || {}),
      borderColor: (context) => colorForIndex(dataset, context.p1DataIndex)
    };
    dataset.pointBorderColor = (context) => colorForIndex(dataset, context.dataIndex);
    dataset.pointBackgroundColor = (context) => colorForIndex(dataset, context.dataIndex);
    dataset.hoverBorderColor = (context) => colorForIndex(dataset, context.dataIndex);
    dataset.hoverBackgroundColor = (context) => colorForIndex(dataset, context.dataIndex);
    dataset.datalabels.backgroundColor = null;
    dataset.datalabels.color = (context) => colorForIndex(dataset, context.dataIndex);
  }

  config.options.scales ||= {};
  config.options.scales.y ||= {};
  config.options.scales.y.ticks ||= {};
  config.options.scales.y.ticks.callback = formatPercent;

  const tooltip = config.options.plugins.tooltip ||= {};
  tooltip.callbacks ||= {};
  tooltip.callbacks.label = (context) => {
    const label = String(context.dataset?.label || '').trim();
    const value = context.parsed?.y ?? context.raw;

    return `${label ? `${label}: ` : ''}${formatPercent(value)}`;
  };

  config.options.plugins.legend ||= {};
  config.options.plugins.legend.labels ||= {};
  const existingGenerateLabels =
    config.options.plugins.legend.labels.generateLabels ||
    NativeChart.defaults?.plugins?.legend?.labels?.generateLabels ||
    ((chart) => chart.data.datasets.map((dataset, datasetIndex) => ({
      text: dataset.label || '',
      datasetIndex,
      fillStyle: dataset.backgroundColor,
      strokeStyle: dataset.borderColor
    })));

  config.options.plugins.legend.labels.generateLabels = (chart) =>
    existingGenerateLabels(chart).map((legendItem) => ({
      ...legendItem,
      fillStyle: planColor,
      strokeStyle: planColor
    }));
}

function hideStaffAverageFromLegendAndTooltip(config) {
  config.options.plugins.legend ||= {};
  config.options.plugins.legend.labels ||= {};
  const existingLegendFilter = config.options.plugins.legend.labels.filter;
  config.options.plugins.legend.labels.filter = (legendItem, chartData) => {
    const dataset = config.data.datasets[legendItem.datasetIndex];

    return !isStaffAverageDataset(dataset) &&
      (!existingLegendFilter || existingLegendFilter(legendItem, chartData));
  };

  config.options.plugins.tooltip ||= {};
  const existingTooltipFilter = config.options.plugins.tooltip.filter;
  config.options.plugins.tooltip.filter = (tooltipItem, chartData) =>
    !isStaffAverageDataset(tooltipItem.dataset) &&
    (!existingTooltipFilter || existingTooltipFilter(tooltipItem, chartData));
}

function prioritizeStaffInLegend(config) {
  config.options.plugins.legend ||= {};
  config.options.plugins.legend.labels ||= {};
  const existingLegendSort = config.options.plugins.legend.labels.sort;
  config.options.plugins.legend.labels.sort = (first, second, chartData) => {
    const firstLabel = String(
      config.data.datasets[first.datasetIndex]?.label || ''
    ).trim().toUpperCase();
    const secondLabel = String(
      config.data.datasets[second.datasetIndex]?.label || ''
    ).trim().toUpperCase();

    if (firstLabel === 'STAFF' && secondLabel !== 'STAFF') return -1;
    if (secondLabel === 'STAFF' && firstLabel !== 'STAFF') return 1;
    return existingLegendSort ? existingLegendSort(first, second, chartData) : 0;
  };

  config.options.plugins.tooltip ||= {};
  const existingTooltipSort = config.options.plugins.tooltip.itemSort;
  config.options.plugins.tooltip.itemSort = (first, second, chartData) => {
    const firstLabel = String(first.dataset?.label || '').trim().toUpperCase();
    const secondLabel = String(second.dataset?.label || '').trim().toUpperCase();

    if (firstLabel === 'STAFF' && secondLabel !== 'STAFF') return -1;
    if (secondLabel === 'STAFF' && firstLabel !== 'STAFF') return 1;
    return existingTooltipSort ? existingTooltipSort(first, second, chartData) : 0;
  };
}

function prioritizePlanDatalabelLayer(config) {
  const datasets = config.data.datasets;
  const staffIndex = datasets.findIndex(
    ({ label }) => String(label || '').trim().toUpperCase() === 'STAFF'
  );
  const planIndex = datasets.findIndex(
    ({ label }) => String(label || '').trim().toUpperCase() === 'PLAN'
  );

  if (staffIndex === -1 || planIndex === -1 || planIndex < staffIndex) {
    return;
  }

  // chartjs-plugin-datalabels draws lower dataset indexes last. Keep every
  // label above its line, but place Plan before Staff so the orange box wins
  // when their boxes overlap. Legend and tooltip order are sorted separately.
  [datasets[staffIndex], datasets[planIndex]] = [
    datasets[planIndex],
    datasets[staffIndex]
  ];
}

function addWorkforceTooltipSeparator(config) {
  const labels = new Set(
    config.data.datasets.map((dataset) =>
      String(dataset.label || '').trim().toUpperCase()
    )
  );
  const requiredLabels = ['STAFF', 'PLAN', 'PAYROLL', 'CONTRACTOR', 'OUTSOURCE'];

  if (!requiredLabels.every((label) => labels.has(label))) {
    return;
  }

  config.options.plugins.tooltip ||= {};
  config.options.plugins.tooltip.callbacks ||= {};
  const existingAfterLabel = config.options.plugins.tooltip.callbacks.afterLabel;
  config.options.plugins.tooltip.callbacks.afterLabel = (context) => {
    const existingResult = existingAfterLabel?.(context);
    const isPlan = String(context.dataset?.label || '').trim().toUpperCase() === 'PLAN';

    if (!isPlan) {
      return existingResult;
    }

    const separator = '────────────';

    if (existingResult === undefined || existingResult === '') {
      return separator;
    }

    return Array.isArray(existingResult)
      ? [...existingResult, separator]
      : [existingResult, separator];
  };
}

function configureProjectRevenueTooltip(config, canvas) {
  if (canvas.id !== 'workforceChartProjectRevenue') {
    return;
  }

  const tooltip = config.options.plugins.tooltip ||= {};
  const desiredOrder = [
    'PLAN',
    'ACTUAL',
    'PLAN-PS',
    'ACTUAL-PS',
    'PLAN-PD',
    'ACTUAL-PD'
  ];
  const rank = new Map(desiredOrder.map((label, index) => [label, index]));
  const normalizeLabel = (item) =>
    String(item.dataset?.label || '').trim().toUpperCase();
  const existingItemSort = tooltip.itemSort;

  tooltip.itemSort = (first, second, chartData) => {
    const firstRank = rank.get(normalizeLabel(first));
    const secondRank = rank.get(normalizeLabel(second));

    if (firstRank !== undefined && secondRank !== undefined) {
      return firstRank - secondRank;
    }

    return existingItemSort ? existingItemSort(first, second, chartData) : 0;
  };

  const existingTooltipFilter = tooltip.filter;
  tooltip.filter = (tooltipItem, chartData) => {
    const label = normalizeLabel(tooltipItem);
    const rawValue = tooltipItem.raw ??
      tooltipItem.parsed?.y ??
      tooltipItem.dataset?.data?.[tooltipItem.dataIndex];
    const isZeroActual = label.startsWith('ACTUAL') && Number(rawValue) === 0;

    return !isZeroActual &&
      (!existingTooltipFilter || existingTooltipFilter(tooltipItem, chartData));
  };

  tooltip.callbacks ||= {};
  const existingAfterLabel = tooltip.callbacks.afterLabel;
  tooltip.callbacks.afterLabel = (context) => {
    const existingResult = existingAfterLabel?.(context);
    const label = normalizeLabel(context);
    const hasValueForLabel = (targetLabel) => {
      const dataset = config.data.datasets.find(
        (candidate) =>
          String(candidate.label || '').trim().toUpperCase() === targetLabel
      );
      const value = dataset?.data?.[context.dataIndex];

      return value !== null && value !== undefined && value !== '' && Number(value) !== 0;
    };
    const needsSeparator =
      label === 'ACTUAL' ||
      label === 'ACTUAL-PS' ||
      (label === 'PLAN' && !hasValueForLabel('ACTUAL')) ||
      (label === 'PLAN-PS' && !hasValueForLabel('ACTUAL-PS'));

    if (!needsSeparator) {
      return existingResult;
    }

    const separator = '────────────';

    if (existingResult === undefined || existingResult === '') {
      return separator;
    }

    return Array.isArray(existingResult)
      ? [...existingResult, separator]
      : [existingResult, separator];
  };
}

function configureRevenuePairLayerAndOrder(config, canvas) {
  const revenuePairCanvasIds = new Set([
    'workforceChartProjectRevenuePS',
    'workforceChartProjectRevenuePD'
  ]);

  if (!revenuePairCanvasIds.has(canvas.id)) {
    return;
  }

  const datasets = config.data.datasets;
  const normalizeLabel = (value) =>
    String(value || '').trim().toUpperCase();
  const planIndex = datasets.findIndex(({ label }) =>
    normalizeLabel(label).startsWith('PLAN')
  );
  const actualIndex = datasets.findIndex(({ label }) =>
    normalizeLabel(label).startsWith('ACTUAL')
  );

  if (planIndex === -1 || actualIndex === -1) {
    return;
  }

  const planDataset = datasets[planIndex];
  const actualDataset = datasets[actualIndex];

  // Lower Chart.js order values are drawn later, so Actual stays above Plan.
  planDataset.order = 1;
  actualDataset.order = 0;

  // chartjs-plugin-datalabels draws lower dataset indexes last. Put Actual at
  // the lower index so its green number box wins when the two boxes overlap.
  if (actualIndex > planIndex) {
    [datasets[planIndex], datasets[actualIndex]] = [
      datasets[actualIndex],
      datasets[planIndex]
    ];
  }

  const rank = (label) => normalizeLabel(label).startsWith('PLAN') ? 0 : 1;

  config.options.plugins.legend ||= {};
  config.options.plugins.legend.labels ||= {};
  const existingLegendSort = config.options.plugins.legend.labels.sort;
  config.options.plugins.legend.labels.sort = (first, second, chartData) => {
    const difference = rank(datasets[first.datasetIndex]?.label) -
      rank(datasets[second.datasetIndex]?.label);

    return difference ||
      (existingLegendSort ? existingLegendSort(first, second, chartData) : 0);
  };

  config.options.plugins.tooltip ||= {};
  const existingTooltipSort = config.options.plugins.tooltip.itemSort;
  config.options.plugins.tooltip.itemSort = (first, second, chartData) => {
    const difference = rank(first.dataset?.label) - rank(second.dataset?.label);

    return difference ||
      (existingTooltipSort ? existingTooltipSort(first, second, chartData) : 0);
  };
}

const MOBILE_LANDSCAPE_CHART_QUERY = globalThis.matchMedia?.(
  '(orientation: landscape) and (max-width: 900px) and (max-height: 450px)'
);
const mobileLandscapeCharts = new Map();

function applyMobileLandscapeChartHeight(chart, originalMaintainAspectRatio) {
  const isMobileLandscape = Boolean(MOBILE_LANDSCAPE_CHART_QUERY?.matches);
  const chartCard = chart.canvas.closest('.chart');

  chartCard?.classList.toggle('mobile-landscape-chart', isMobileLandscape);
  chart.options.maintainAspectRatio = isMobileLandscape
    ? false
    : originalMaintainAspectRatio ?? true;
}

MOBILE_LANDSCAPE_CHART_QUERY?.addEventListener?.('change', () => {
  for (const [chart, originalMaintainAspectRatio] of mobileLandscapeCharts) {
    applyMobileLandscapeChartHeight(chart, originalMaintainAspectRatio);
    chart.resize();
  }
});

function configureMobileLandscapeChartHeight(config, canvas) {
  const originalMaintainAspectRatio = config.options.maintainAspectRatio;

  config.plugins.push({
    id: `mobile-landscape-height-${canvas.id}`,
    beforeInit(chart) {
      mobileLandscapeCharts.set(chart, originalMaintainAspectRatio);
      applyMobileLandscapeChartHeight(chart, originalMaintainAspectRatio);
    },
    afterDestroy(chart) {
      mobileLandscapeCharts.delete(chart);
    }
  });
}

function configureResourceTypeCompactLabels(config, canvas) {
  const resourceTypeCanvasIds = new Set([
    'workforceChartDOPR',
    'workforceChartDOCT',
    'workforceChartDOOS',
    'workforceChartDVPR',
    'workforceChartDVCT',
    'workforceChartDVOS',
    'workforceChartCPSPR',
    'workforceChartCPSCT',
    'workforceChartCPSOS',
    'workforceChartPSEPR',
    'workforceChartPSECT',
    'workforceChartPSEOS'
  ]);

  if (!resourceTypeCanvasIds.has(canvas.id)) {
    return;
  }

  config.options.plugins.title ||= {};
  config.options.plugins.title.font ||= {};
  config.options.plugins.title.font.size = 13;
  config.options.plugins.title.padding = { top: 5, bottom: 10 };

  config.options.plugins.legend ||= {};
  config.options.plugins.legend.display = false;
  config.options.plugins.legend.labels ||= {};
  config.options.plugins.legend.labels.font ||= {};
  config.options.plugins.legend.labels.font.size = 7;
  config.options.plugins.legend.labels.boxWidth = 6;
  config.options.plugins.legend.labels.boxHeight = 6;
  config.options.plugins.legend.labels.padding = 3;

  config.options.scales ||= {};

  for (const axis of ['x', 'y']) {
    config.options.scales[axis] ||= {};
    config.options.scales[axis].ticks ||= {};
    config.options.scales[axis].ticks.font ||= {};
    config.options.scales[axis].ticks.font.size = 7;
  }

  config.options.scales.y.beginAtZero = false;
  delete config.options.scales.y.min;
  delete config.options.scales.y.max;

  const datalabels = config.options.plugins.datalabels ||= {};
  datalabels.backgroundColor = null;
  datalabels.borderRadius = 0;
  datalabels.font ||= {};
  datalabels.font.size = 8;
  datalabels.color = (context) =>
    context.dataset.backgroundColor || context.dataset.borderColor;

  datalabels.display = false;

  config.plugins.push({
      id: 'inline-resource-legend-' + canvas.id,
      afterDraw(chart) {
        const context = chart.ctx;
        const fontSize = 9;
        const markerRadius = 3;
        const markerTextGap = 3;
        const lineHeight = 11;
        const items = chart.data.datasets
          .map((dataset, datasetIndex) => ({ dataset, datasetIndex }))
          .filter(({ dataset }) => !isStaffAverageDataset(dataset))
          .sort((first, second) => {
            const firstIsStaff = String(first.dataset.label || '')
              .trim().toUpperCase() === 'STAFF';
            const secondIsStaff = String(second.dataset.label || '')
              .trim().toUpperCase() === 'STAFF';
            return Number(secondIsStaff) - Number(firstIsStaff);
          });

        context.save();
        context.font = fontSize + "px 'MindSans', sans-serif";
        context.textBaseline = 'middle';

        const measuredItems = items.map((item) => ({
          ...item,
          label: String(item.dataset.label || ''),
          width: markerRadius * 2 + markerTextGap +
            context.measureText(String(item.dataset.label || '')).width
        }));
        const legendWidth = Math.max(
          ...measuredItems.map((item) => item.width),
          0
        );
        const titleBlock = chart.titleBlock;
        const centerY = titleBlock
          ? titleBlock.top + titleBlock.height / 2
          : 8;
        const cursorX = chart.width - 8 - legendWidth;
        const hitboxes = [];

        measuredItems.forEach((item, itemIndex) => {
          const color = item.dataset.backgroundColor || item.dataset.borderColor;
          const itemCenterY = centerY +
            (itemIndex - (measuredItems.length - 1) / 2) * lineHeight;

          context.globalAlpha = chart.isDatasetVisible(item.datasetIndex) ? 1 : 0.35;
          context.fillStyle = color;
          context.beginPath();
          context.arc(
            cursorX + markerRadius,
            itemCenterY,
            markerRadius,
            0,
            Math.PI * 2
          );
          context.fill();
          context.fillStyle = '#616161';
          context.fillText(
            item.label,
            cursorX + markerRadius * 2 + markerTextGap,
            itemCenterY
          );
          hitboxes.push({
            datasetIndex: item.datasetIndex,
            left: cursorX,
            right: cursorX + item.width,
            top: itemCenterY - fontSize / 2,
            bottom: itemCenterY + fontSize / 2
          });
        });

        chart.$inlineResourceLegendHitboxes = hitboxes;
        context.restore();
      },
      afterEvent(chart, args) {
        if (args.event.type !== 'click') {
          return;
        }

        const hitbox = chart.$inlineResourceLegendHitboxes?.find((box) =>
          args.event.x >= box.left && args.event.x <= box.right &&
          args.event.y >= box.top && args.event.y <= box.bottom
        );

        if (!hitbox) {
          return;
        }

        chart.setDatasetVisibility(
          hitbox.datasetIndex,
          !chart.isDatasetVisible(hitbox.datasetIndex)
        );
        chart.update();
      }
    });

  for (const dataset of config.data.datasets) {
    if ((dataset.type || config.type) !== 'line') {
      continue;
    }

    dataset.borderWidth = isStaffAverageDataset(dataset) ? 0.75 : 2;

    if (dataset.pointRadius === 0) {
      dataset.pointHoverRadius = 0;
      dataset.pointHitRadius = 0;
    } else {
      dataset.pointRadius = 1.5;
      dataset.pointHoverRadius = 2.5;
    }
  }

  const calculateSuggestedMinimum = (values) => {
    if (!values.length) {
      return undefined;
    }

    const dataMinimum = Math.min(...values);
    const dataMaximum = Math.max(...values);
    const dataRange = dataMaximum - dataMinimum;
    let step;

    if (dataRange === 0) {
      const absoluteMinimum = Math.abs(dataMinimum);
      step = absoluteMinimum >= 100 ? 10 :
        absoluteMinimum >= 20 ? 5 :
        absoluteMinimum >= 5 ? 1 : 0.5;
    } else if (dataRange <= 10) {
      step = 1;
    } else if (dataRange <= 50) {
      step = 5;
    } else if (dataRange <= 100) {
      step = 10;
    } else {
      step = 10 ** Math.floor(Math.log10(dataRange));
    }

    const padding = Math.max(dataRange * 0.15, step);
    // Resource counts cannot be negative. Preserve the automatic range for
    // positive values, but clamp all-zero or near-zero datasets to zero.
    return Math.max(0, Math.floor((dataMinimum - padding) / step) * step);
  };

  const initialValues = config.data.datasets
    .flatMap((dataset) => dataset.data)
    .filter((value) => value !== null && value !== undefined && value !== '')
    .map(Number)
    .filter(Number.isFinite);
  config.options.scales.y.suggestedMin = calculateSuggestedMinimum(initialValues);

  if (initialValues.length && initialValues.every((value) => value === 0)) {
    config.options.scales.y.min = 0;
    config.options.scales.y.max = 1;
  }

  config.plugins.push({
    id: 'dynamic-resource-y-range-' + canvas.id,
    beforeUpdate(chart) {
      if (chart.legend && !chart.legend.$resourceCompactFit) {
        const originalFit = chart.legend.fit;

        chart.legend.fit = function compactResourceLegendFit() {
          originalFit.call(this);
          // Chart.js reserves about 5px above and below a horizontal legend.
          // Remove 5px total so both sides are approximately half as large.
          this.height = Math.max(this.height - 5, 0);
        };
        chart.legend.$resourceCompactFit = true;
      }

      const visibleValues = chart.data.datasets.flatMap((dataset, datasetIndex) => {
        if (!chart.isDatasetVisible(datasetIndex)) {
          return [];
        }

        return dataset.data
          .filter((value) => value !== null && value !== undefined && value !== '')
          .map(Number)
          .filter(Number.isFinite);
      });

      if (!visibleValues.length) {
        delete chart.options.scales.y.suggestedMin;
        delete chart.options.scales.y.min;
        delete chart.options.scales.y.max;
        return;
      }

      chart.options.scales.y.suggestedMin =
        calculateSuggestedMinimum(visibleValues);

      if (visibleValues.every((value) => value === 0)) {
        chart.options.scales.y.min = 0;
        chart.options.scales.y.max = 1;
      } else {
        delete chart.options.scales.y.min;
        delete chart.options.scales.y.max;
      }
    }
  });
}

function configureUtilizationTooltip(config, canvas) {
  const utilizationCanvasIds = new Set([
    'workforceChartDOPlanActual',
    'workforceChartDVPlanActual'
  ]);

  if (!utilizationCanvasIds.has(canvas.id)) {
    return;
  }

  const tooltip = config.options.plugins.tooltip ||= {};
  const normalizeLabel = (item) =>
    String(item.dataset?.label || '').trim().toUpperCase();
  const currentLabels = new Map([
    ['STAFF', 0],
    ['PLAN', 1],
    ['ACTUAL', 2]
  ]);
  const existingItemSort = tooltip.itemSort;

  // Any fourth label is the previous planning snapshot. This keeps working if
  // the Excel label changes from "Q1 Plan" to "Plan Q1" later.
  tooltip.itemSort = (first, second, chartData) => {
    const firstRank = currentLabels.get(normalizeLabel(first)) ?? 3;
    const secondRank = currentLabels.get(normalizeLabel(second)) ?? 3;

    if (firstRank !== secondRank) {
      return firstRank - secondRank;
    }

    return existingItemSort ? existingItemSort(first, second, chartData) : 0;
  };

  config.options.plugins.legend ||= {};
  config.options.plugins.legend.labels ||= {};
  const existingLegendSort = config.options.plugins.legend.labels.sort;
  config.options.plugins.legend.labels.sort = (first, second, chartData) => {
    const firstDataset = config.data.datasets[first.datasetIndex];
    const secondDataset = config.data.datasets[second.datasetIndex];
    const firstRank = currentLabels.get(
      String(firstDataset?.label || '').trim().toUpperCase()
    ) ?? 3;
    const secondRank = currentLabels.get(
      String(secondDataset?.label || '').trim().toUpperCase()
    ) ?? 3;

    if (firstRank !== secondRank) {
      return firstRank - secondRank;
    }

    return existingLegendSort ? existingLegendSort(first, second, chartData) : 0;
  };

  tooltip.callbacks ||= {};
  const existingAfterLabel = tooltip.callbacks.afterLabel;
  tooltip.callbacks.afterLabel = (context) => {
    const existingResult = existingAfterLabel?.(context);
    const label = normalizeLabel(context);
    const actualDataset = config.data.datasets.find(
      (dataset) => String(dataset.label || '').trim().toUpperCase() === 'ACTUAL'
    );
    const actualValue = actualDataset?.data?.[context.dataIndex];
    const hasActual = actualValue !== null && actualValue !== undefined && actualValue !== '';
    const needsSeparator = label === 'ACTUAL' || (label === 'PLAN' && !hasActual);

    if (!needsSeparator) {
      return existingResult;
    }

    const separator = '────────────';

    if (existingResult === undefined || existingResult === '') {
      return separator;
    }

    return Array.isArray(existingResult)
      ? [...existingResult, separator]
      : [existingResult, separator];
  };

  config.options.scales ||= {};
  config.options.scales.y ||= {};
  config.options.scales.y.beginAtZero = false;
  delete config.options.scales.y.min;

  config.plugins.push({
    id: 'dynamic-utilization-y-range',
    beforeUpdate(chart) {
      const visibleValues = chart.data.datasets.flatMap((dataset, datasetIndex) => {
        if (!chart.isDatasetVisible(datasetIndex)) {
          return [];
        }

        return dataset.data
          .filter((value) => value !== null && value !== undefined && value !== '')
          .map(Number)
          .filter(Number.isFinite);
      });

      if (!visibleValues.length) {
        delete chart.options.scales.y.suggestedMin;
        return;
      }

      const dataMinimum = Math.min(...visibleValues);
      chart.options.scales.y.suggestedMin = Math.floor(dataMinimum / 10) * 10;
    }
  });
}

function populateDataFromWorkbook(config, workbook, chartNumber) {
  const datasource = config.options?.plugins?.datasource;

  if (!datasource) {
    return;
  }

  const datasetLabels = readQualifiedRange(workbook, datasource.datasetLabels, true).flat();
  const indexLabels = readQualifiedRange(workbook, datasource.indexLabels, true).flat();
  const values = readQualifiedRange(workbook, datasource.data);
  const datasets = config.data?.datasets || [];

  if (datasets.length !== datasetLabels.length || datasets.length !== values.length) {
    throw new Error(
      `Chart ${chartNumber} range mismatch: ${datasets.length} dataset definitions, ` +
      `${datasetLabels.length} labels, and ${values.length} value rows.`
    );
  }

  config.data.labels = indexLabels;
  config.data.datasets = datasets.map((dataset, datasetIndex) => ({
    ...dataset,
    label: datasetLabels[datasetIndex],
    data: values[datasetIndex]
  }));

  delete config.options.plugins.datasource;
}

function migrateScales(scales = {}) {
  const migrated = { ...scales };

  if (!migrated.x && Array.isArray(migrated.xAxes) && migrated.xAxes[0]) {
    migrated.x = { ...migrated.xAxes[0] };
  }

  if (!migrated.y && Array.isArray(migrated.yAxes) && migrated.yAxes[0]) {
    migrated.y = { ...migrated.yAxes[0] };
  }

  if (migrated.x?.gridLines) {
    migrated.x.grid = migrated.x.gridLines;
    delete migrated.x.gridLines;
  }

  if (migrated.y?.gridLines) {
    migrated.y.grid = migrated.y.gridLines;
    delete migrated.y.gridLines;
  }

  if (migrated.y?.ticks?.beginAtZero !== undefined && migrated.y.beginAtZero === undefined) {
    migrated.y.beginAtZero = migrated.y.ticks.beginAtZero;
    delete migrated.y.ticks.beginAtZero;
  }

  delete migrated.xAxes;
  delete migrated.yAxes;
  return migrated;
}

function configureDynamicProjectTotal(config, canvas, chartNumber) {
  if (canvas.id !== 'workforceChartProjectPerTeam') {
    return;
  }

  // The workbook now contains only the five source categories. Keep Total as a
  // generated line so it can recalculate whenever a legend item is toggled.
  const totalDataset = {
    label: 'Total FTE',
    type: 'line',
    data: [],
    fill: false,
    order: 1,
    borderWidth: 1,
    borderColor: 'rgba(91, 91, 91, 0.2)',
    backgroundColor: 'rgba(91, 91, 91)',
    pointRadius: 0,
    pointHoverRadius: 0,
    tension: 0.4,
    datalabels: {
      align: 'end',
      anchor: 'end',
      backgroundColor: null,
      color: '#0000008A',
      formatter: function(value) {
        const numericValue = Number(value);
        return Number.isFinite(numericValue)
          ? String(Number(numericValue.toFixed(2)))
          : value;
      },
      font: {
        weight: 'bold'
      }
    }
  };
  config.data.datasets.push(totalDataset);
  const totalIndex = config.data.datasets.length - 1;

  function updateTotal(chart) {
    totalDataset.data = config.data.labels.map((_label, dataIndex) =>
      config.data.datasets.reduce((sum, dataset, datasetIndex) => {
        if (datasetIndex === totalIndex || !chart.isDatasetVisible(datasetIndex)) {
          return sum;
        }

        const value = Number(dataset.data[dataIndex]);
        return sum + (Number.isFinite(value) ? value : 0);
      }, 0)
    );
  }

  // Start with a calculated total instead of the pre-calculated Excel row.
  totalDataset.data = config.data.labels.map((_label, dataIndex) =>
    config.data.datasets.slice(0, totalIndex).reduce((sum, dataset) => {
      const value = Number(dataset.data[dataIndex]);
      return sum + (Number.isFinite(value) ? value : 0);
    }, 0)
  );
  config.plugins.push({
    id: `dynamic-project-total-${chartNumber}`,
    beforeUpdate: updateTotal
  });

  config.options.plugins.legend ||= {};
  config.options.plugins.legend.labels ||= {};
  const existingLegendFilter = config.options.plugins.legend.labels.filter;
  config.options.plugins.legend.labels.filter = (legendItem, chartData) =>
    legendItem.datasetIndex !== totalIndex &&
    (!existingLegendFilter || existingLegendFilter(legendItem, chartData));

  config.options.plugins.tooltip ||= {};
  const existingTooltipFilter = config.options.plugins.tooltip.filter;
  config.options.plugins.tooltip.filter = (tooltipItem, chartData) =>
    tooltipItem.datasetIndex !== totalIndex &&
    (!existingTooltipFilter || existingTooltipFilter(tooltipItem, chartData));
}

function migrateChartConfig(config, workbook, chartNumber, canvas) {
  config.options ||= {};
  config.options.plugins ||= {};
  populateDataFromWorkbook(config, workbook, chartNumber);

  if (config.interaction && !config.options.interaction) {
    config.options.interaction = config.interaction;
  }

  if (config.options.title) {
    config.options.plugins.title = migrateTitleOptions(config.options.title);
    delete config.options.title;
  }

  if (config.options.legend) {
    config.options.plugins.legend = config.options.legend;
    delete config.options.legend;
  }

  if (config.options.tooltips) {
    config.options.plugins.tooltip = migrateTooltipOptions(config.options.tooltips);
    delete config.options.tooltips;
  }

  if (config.displayColors !== undefined) {
    config.options.plugins.tooltip ||= {};
    config.options.plugins.tooltip.displayColors = config.displayColors;
  }

  config.options.scales = migrateScales(config.options.scales);
  config.data.datasets.forEach((dataset, datasetIndex) => {
    const datasetType = dataset.type || config.type;

    if (datasetType === 'line') {
      if (dataset.lineTension !== undefined && dataset.tension === undefined) {
        dataset.tension = dataset.lineTension;
        delete dataset.lineTension;
      }

      if (dataset.tension === undefined) {
        dataset.tension = 0.4;
      }

      // Chart.js 4 stacks mixed line datasets unless they have separate IDs.
      dataset.stack = `line-${chartNumber}-${datasetIndex}`;

      const normalizedLabel = String(dataset.label || '').trim().toUpperCase();

      // Higher order values are drawn first (under lower values) in Chart.js.
      if (normalizedLabel === 'ACTUAL') {
        dataset.order = 0;
      } else if (normalizedLabel === 'PLAN') {
        dataset.order = 1;
      } else if (normalizedLabel === 'STAFF') {
        dataset.order = 2;
      } else if (normalizedLabel === 'STAFF AVG') {
        dataset.order = 3;
      } else if (normalizedLabel.includes('PLAN')) {
        // Previous planning snapshots such as Q1 Plan or Plan Q1.
        dataset.order = 3;
      }
    }

    if (datasetType === 'bar') {
      // A numeric radius rounds only the exposed ends of a Chart.js stack.
      dataset.borderRadius = 6;
    }

    if (dataset.datalabels && typeof dataset.datalabels.formatter !== 'function') {
      dataset.datalabels.formatter = formatNumberMaxTwoDecimals;
    }
  });

  prioritizePlanDatalabelLayer(config);

  config.plugins = (config.plugins || []).filter(
    (plugin) => plugin && plugin !== LEGACY_DATASOURCE_PLUGIN
  );
  configureDynamicProjectTotal(config, canvas, chartNumber);
  hideStaffAverageFromLegendAndTooltip(config);
  addWorkforceTooltipSeparator(config);
  configureProjectRevenueTooltip(config, canvas);
  configureRevenuePairLayerAndOrder(config, canvas);
  configureMobileLandscapeChartHeight(config, canvas);
  configureResourceTypeCompactLabels(config, canvas);
  configureUtilizationTooltip(config, canvas);
  prioritizeStaffInLegend(config);
  configureHistoricalTimelineColors(config);
  configureAvailableStatusColors(config);
  configurePercentPlanUnits(config);

  delete config.interaction;
  delete config.displayColors;
  return config;
}

const LEGACY_DATASOURCE_PLUGIN = { id: 'legacy-datasource-placeholder' };

function renderAllCharts(workbook) {
  let chartNumber = 0;
  const ChartDataSource = LEGACY_DATASOURCE_PLUGIN;

  function Chart(canvas, legacyConfig) {
    chartNumber += 1;

    if (!canvas) {
      throw new Error(`Canvas for chart ${chartNumber} was not found.`);
    }

    // The original file repeats six chart definitions for the same canvases.
    // Chart.js 2 tolerated this, while Chart.js 4 rejects a reused canvas.
    // The repeated definitions are identical, so retain the first instance.
    const existingChart = NativeChart.getChart(canvas);

    if (existingChart) {
      return existingChart;
    }

    return new NativeChart(
      canvas,
      migrateChartConfig(legacyConfig, workbook, chartNumber, canvas)
    );
  }

  function renderDepartmentDemandScenario(department, startRow) {
    const monthlyCanvas = document.getElementById(
      `workforceChart${department}DemandScenario`
    );
    const quarterCanvas = document.getElementById(
      `workforceChart${department}DemandPlanQtr`
    );
    const monthlyDataStartRow = startRow + 1;
    const monthlyDataEndRow = startRow + 3;
    const quarterDataStartRow = startRow + 2;
    const quarterDataEndRow = startRow + 3;

    new Chart(monthlyCanvas, {
      type: 'line',
      displayColors: true,
      interaction: {
        mode: 'index',
        intersect: false
      },
      data: {
        datasets: [{
          borderWidth: 2,
          borderColor: 'rgba(68, 114, 196)',
          backgroundColor: 'rgba(68, 114, 196)',
          fill: false,
          pointRadius: 3,
          datalabels: {
            display: false
          }
        }, {
          borderWidth: 2,
          borderColor: 'rgba(237, 125, 50)',
          backgroundColor: 'rgba(237, 125, 50)',
          fill: false,
          pointRadius: 3,
          datalabels: {
            display: false
          }
        }, {
          borderWidth: 2,
          borderColor: 'rgba(237, 125, 50)',
          backgroundColor: 'rgba(237, 125, 50)',
          borderDash: [6, 4],
          fill: false,
          pointRadius: 2,
          pointStyle: 'rectRot',
          datalabels: {
            display: false
          }
        }]
      },
      plugins: [ChartDataSource],
      options: {
        title: {
          display: true,
          fontSize: 14,
          text: `${department} Demand Scenario per Month`,
          padding: 20,
          fontColor: '#616161'
        },
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true
          }
        },
        tooltips: {
          mode: 'index',
          intersect: false,
          titleFontSize: 10,
          position: 'nearest'
        },
        responsive: true,
        scales: {
          x: {
            stacked: false,
            offset: true,
            grid: {
              offset: true
            }
          },
          y: {
            stacked: false,
            beginAtZero: false
          }
        },
        plugins: {
          datasource: {
            url: 'workforceresult.xlsx',
            type: 'sheet',
            datasetLabels: `Graph-Demand!A${monthlyDataStartRow}:A${monthlyDataEndRow}`,
            indexLabels: `Graph-Demand!B${startRow}:P${startRow}`,
            data: `Graph-Demand!B${monthlyDataStartRow}:P${monthlyDataEndRow}`
          },
          datalabels: {
            display: false
          }
        }
      }
    });

    new Chart(quarterCanvas, {
      type: 'line',
      displayColors: true,
      interaction: {
        mode: 'index',
        intersect: false
      },
      data: {
        datasets: [{
          borderWidth: 2,
          borderColor: 'rgba(237, 125, 50)',
          backgroundColor: 'rgba(237, 125, 50)',
          fill: false,
          pointRadius: 3,
          datalabels: {
            align: 'bottom',
            anchor: 'end',
            offset: 3,
            padding: 2
          }
        }, {
          borderWidth: 2,
          borderColor: 'rgba(237, 125, 50)',
          backgroundColor: 'rgba(237, 125, 50)',
          borderDash: [6, 4],
          fill: false,
          pointRadius: 2,
          pointStyle: 'rectRot',
          datalabels: {
            display: (context) => {
              const weightedValue = context.chart.data.datasets[0]
                ?.data?.[context.dataIndex];
              const unweightedValue = context.dataset.data?.[context.dataIndex];
              return Number(weightedValue) !== Number(unweightedValue);
            },
            align: 'top',
            anchor: 'end',
            offset: 3,
            padding: 2
          }
        }]
      },
      plugins: [ChartDataSource],
      options: {
        title: {
          display: true,
          fontSize: 14,
          text: `% ${department} Plan Scenario per Quarter`,
          padding: 20,
          fontColor: '#616161'
        },
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true
          }
        },
        tooltips: {
          mode: 'index',
          intersect: false,
          titleFontSize: 10,
          position: 'nearest'
        },
        responsive: true,
        scales: {
          x: {
            stacked: false,
            offset: true,
            grid: {
              offset: true
            }
          },
          y: {
            stacked: false,
            beginAtZero: true
          }
        },
        plugins: {
          datasource: {
            url: 'workforceresult.xlsx',
            type: 'sheet',
            datasetLabels: `Graph-Demand!AA${quarterDataStartRow}:AA${quarterDataEndRow}`,
            indexLabels: `Graph-Demand!AB${startRow}:AF${startRow}`,
            data: `Graph-Demand!AB${quarterDataStartRow}:AF${quarterDataEndRow}`
          },
          datalabels: {
            formatter: Math.round,
            color: 'rgba(197, 90, 17)',
            padding: 0
          }
        }
      }
    });
  }

  [
    ['CPS', 21],
    ['PSE', 51],
    ['SD', 81],
    ['AIC', 181],
    ['TDE', 241]
  ].forEach(([department, startRow]) => {
    renderDepartmentDemandScenario(department, startRow);
  });

  
  const actions = [{
      name: 'Mode: index',
      handler(chart) {
          chart.options.interaction.axis = 'xy';
          chart.options.interaction.mode = 'index';
          chart.update();
      }
  }];
  
  /*
  /* MONTH
  */
  
  const ctx = document.getElementById('workforceChartDO');
  new Chart(ctx, {
      type: 'bar',
      displayColors: true,
      interaction: {
          mode: 'index',
          intersect: false
      },
      data: {
          datasets: [{
              type: 'line',
              borderWidth: 2,
              borderColor: 'rgba(68, 114, 196)',
              backgroundColor: 'rgba(68, 114, 196)',
              fill: false,
              order: 1,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          }, {
              type: 'line',
              borderWidth: 1,
              borderColor: 'rgba(68, 114, 196)',
              borderDash: [5, 5],
              fill: false,
              order: 2,
              pointRadius: 0,
              datalabels: {
                  display: false
              }
          }, {
              type: 'line',
              borderWidth: 2,
              borderColor: 'rgba(237, 125, 50)',
              backgroundColor: 'rgba(237, 125, 50)',
              fill: false,
              order: 3,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          }, {
              backgroundColor: 'rgba(165, 165, 165)',
              order: 4,
              stack: 'groupplan'
          }, {
              backgroundColor: 'rgba(255, 191, 0)',
              order: 4,
              stack: 'groupplan'
          }, {
              backgroundColor: 'rgba(91, 155, 213)',
              order: 4,
              stack: 'groupplan'
          }]
      },
      plugins: [ChartDataSource],
      options: {
          title: {
              display: true,
              fontSize: 20,
              text: 'SCG Digital Workforce 2026',
              padding: 20,
              fontColor: '#616161',
          },
          legend: {
              position: 'bottom',
              labels: {
                  usePointStyle: true
              }
          },
          tooltips: {
              mode: 'index',
              intersect: false,
              titleFontSize: 12,
              position: 'nearest'
          },
          responsive: true,
          scales: {
              x: {
                  stacked: true
              },
              y: {
                  stacked: true,
                  beginAtZero: true
              }
          },
          plugins: {
              datasource: {
                  url: 'workforceresult.xlsx',
                  type: 'sheet',
                  //rowMapping: 'dataset',
                  datasetLabels: 'GraphAll!A2:A7',
                  indexLabels: 'GraphAll!B1:P1',
                  data: 'GraphAll!B2:P7'
              },
              datalabels: {
                  formatter: (value, ctx) => {
                      return;
                  },
                  backgroundColor: function(context) {
                      return context.dataset.backgroundColor;
                  },
                  borderRadius: 4,
                  //formatter: Math.round,
                  color: 'white',
                  padding: 0
              }
          }
      }
  });
  
  /*
  /* QUARTER
  */
  
  const ctxqtr = document.getElementById('workforceChartDOQTR');
  new Chart(ctxqtr, {
      type: 'bar',
      displayColors: true,
      interaction: {
          mode: 'index',
          intersect: false
      },
      data: {
          datasets: [{
              type: 'line',
              borderWidth: 2,
              borderColor: 'rgba(68, 114, 196)',
              backgroundColor: 'rgba(68, 114, 196)',
              fill: false,
              order: 1,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          }, {
              type: 'line',
              borderWidth: 1,
              borderColor: 'rgba(68, 114, 196)',
              borderDash: [5, 5],
              fill: false,
              order: 2,
              pointRadius: 0,
              datalabels: {
                  display: false
              }
          }, {
              type: 'line',
              borderWidth: 2,
              borderColor: 'rgba(237, 125, 50)',
              backgroundColor: 'rgba(237, 125, 50)',
              fill: false,
              order: 3,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          }, {
              backgroundColor: 'rgba(165, 165, 165)',
              order: 4,
              stack: 'groupplan'
          }, {
              backgroundColor: 'rgba(255, 191, 0)',
              order: 4,
              stack: 'groupplan'
          }, {
              backgroundColor: 'rgba(91, 155, 213)',
              order: 4,
              stack: 'groupplan'
          }]
      },
      plugins: [ChartDataSource],
      options: {
          title: {
              display: true,
              fontSize: 20,
              text: 'Workforce 2026 per Quarter',
              padding: 20,
              fontColor: '#616161',
          },
          legend: {
              position: 'bottom',
              labels: {
                  usePointStyle: true
              }
          },
          tooltips: {
              mode: 'index',
              intersect: false,
              titleFontSize: 12,
              position: 'nearest'
          },
          responsive: true,
          scales: {
              x: {
                  stacked: true
              },
              y: {
                  stacked: true,
                  beginAtZero: true
              }
          },
          plugins: {
              datasource: {
                  url: 'workforceresult.xlsx',
                  type: 'sheet',
                  //rowMapping: 'dataset',
                  datasetLabels: 'GraphAll!A42:A47',
                  indexLabels: 'GraphAll!B41:F41',
                  data: 'GraphAll!B42:F47'
              },
              datalabels: {
                  formatter: (value, ctx) => {
                      return;
                  },
                  backgroundColor: function(context) {
                      return context.dataset.backgroundColor;
                  },
                  borderRadius: 4,
                  //formatter: Math.round,
                  color: 'white',
                  padding: 0
              }
          }
      }
  });

  /*
  /* DEMAND SCENARIO - MONTH
  */

  const ctxDemandScenario = document.getElementById('workforceChartDODemandScenario');
  new Chart(ctxDemandScenario, {
      type: 'line',
      displayColors: true,
      interaction: {
          mode: 'index',
          intersect: false
      },
      data: {
          datasets: [{
              borderWidth: 2,
              borderColor: 'rgba(68, 114, 196)',
              backgroundColor: 'rgba(68, 114, 196)',
              fill: false,
              pointRadius: 3,
              datalabels: {
                  display: false
              }
          }, {
              borderWidth: 2,
              borderColor: 'rgba(237, 125, 50)',
              backgroundColor: 'rgba(237, 125, 50)',
              fill: false,
              pointRadius: 3,
              datalabels: {
                  display: false
              }
          }, {
              borderWidth: 2,
              borderColor: 'rgba(237, 125, 50)',
              backgroundColor: 'rgba(237, 125, 50)',
              borderDash: [6, 4],
              fill: false,
              pointRadius: 2,
              pointStyle: 'rectRot',
              datalabels: {
                  display: false
              }
          }]
      },
      plugins: [ChartDataSource],
      options: {
          title: {
              display: true,
              fontSize: 14,
              text: 'Demand Scenario per Month',
              padding: 20,
              fontColor: '#616161'
          },
          legend: {
              position: 'bottom',
              labels: {
                  usePointStyle: true
              }
          },
          tooltips: {
              mode: 'index',
              intersect: false,
              titleFontSize: 10,
              position: 'nearest'
          },
          responsive: true,
          scales: {
              x: {
                  stacked: false,
                  offset: true,
                  grid: {
                      offset: true
                  }
              },
              y: {
                  stacked: false,
                  beginAtZero: false
              }
          },
          plugins: {
              datasource: {
                  url: 'workforceresult.xlsx',
                  type: 'sheet',
                  datasetLabels: 'Graph-Demand!A2:A4',
                  indexLabels: 'Graph-Demand!B1:P1',
                  data: 'Graph-Demand!B2:P4'
              },
              datalabels: {
                  display: false
              }
          }
      }
  });

  /*
  /* % PLAN DEMAND SCENARIO - QUARTER
  */

  const ctxDemandPlanQtr = document.getElementById('workforceChartDODemandPlanQtr');
  new Chart(ctxDemandPlanQtr, {
      type: 'line',
      displayColors: true,
      interaction: {
          mode: 'index',
          intersect: false
      },
      data: {
          datasets: [{
              borderWidth: 2,
              borderColor: 'rgba(237, 125, 50)',
              backgroundColor: 'rgba(237, 125, 50)',
              fill: false,
              pointRadius: 3,
              datalabels: {
                  align: 'bottom',
                  anchor: 'end',
                  offset: 3,
                  padding: 2
              }
          }, {
              borderWidth: 2,
              borderColor: 'rgba(237, 125, 50)',
              backgroundColor: 'rgba(237, 125, 50)',
              borderDash: [6, 4],
              fill: false,
              pointRadius: 2,
              pointStyle: 'rectRot',
              datalabels: {
                  align: 'top',
                  anchor: 'end',
                  offset: 3,
                  padding: 2
              }
          }]
      },
      plugins: [ChartDataSource],
      options: {
          title: {
              display: true,
              fontSize: 14,
              text: '% Plan Scenario per Quarter',
              padding: 20,
              fontColor: '#616161'
          },
          legend: {
              position: 'bottom',
              labels: {
                  usePointStyle: true
              }
          },
          tooltips: {
              mode: 'index',
              intersect: false,
              titleFontSize: 10,
              position: 'nearest'
          },
          responsive: true,
          scales: {
              x: {
                  stacked: false,
                  offset: true,
                  grid: {
                      offset: true
                  }
              },
              y: {
                  stacked: false,
                  beginAtZero: true
              }
          },
          plugins: {
              datasource: {
                  url: 'workforceresult.xlsx',
                  type: 'sheet',
                  datasetLabels: 'Graph-Demand!AA3:AA4',
                  indexLabels: 'Graph-Demand!AB1:AF1',
                  data: 'Graph-Demand!AB3:AF4'
              },
              datalabels: {
                  formatter: Math.round,
                  color: 'rgba(197, 90, 17)',
                  padding: 0
              }
          }
      }
  });
  
  /*
  /* PAYROLL
  */
  
  const ctxpr = document.getElementById('workforceChartDOPR');
  new Chart(ctxpr, {
      type: 'bar',
      displayColors: true,
      interaction: {
          mode: 'index',
          intersect: false
      },
      data: {
          datasets: [{
              type: 'line',
              borderWidth: 2,
              borderColor: 'rgba(68, 114, 196)',
              backgroundColor: 'rgba(68, 114, 196)',
              fill: false,
              order: 1,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          }, {
              type: 'line',
              borderWidth: 1,
              borderColor: 'rgba(68, 114, 196)',
              borderDash: [5, 5],
              fill: false,
              order: 2,
              pointRadius: 0,
              datalabels: {
                  display: false
              }
          }, {
              type: 'line',
              borderWidth: 2,
              borderColor: 'rgba(237, 125, 50)',
              backgroundColor: 'rgba(237, 125, 50)',
              fill: false,
              order: 3,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          }]
      },
      plugins: [ChartDataSource],
      options: {
          title: {
              display: true,
              fontSize: 20,
              text: 'Payroll',
              padding: 20,
              fontColor: '#616161',
          },
          legend: {
              position: 'bottom',
              labels: {
                  usePointStyle: true
              }
          },
          tooltips: {
              mode: 'index',
              intersect: false,
              titleFontSize: 12,
              position: 'nearest'
          },
          responsive: true,
          scales: {
              x: {
                  stacked: true
              },
              y: {
                  stacked: true,
                  beginAtZero: true
              },
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          },
          plugins: {
              datasource: {
                  url: 'workforceresult.xlsx',
                  type: 'sheet',
                  //rowMapping: 'dataset',
                  datasetLabels: 'GraphAll!A12:A14',
                  indexLabels: 'GraphAll!B11:P11',
                  data: 'GraphAll!B12:P14'
              },
              datalabels: {
                  formatter: (value, ctx) => {
                      return;
                  },
                  backgroundColor: function(context) {
                      return context.dataset.backgroundColor;
                  },
                  borderRadius: 4,
                  //formatter: Math.round,
                  color: 'white',
                  padding: 0
              }
          }
      }
  });
  
  /*
  /* CONTRACTOR
  */
  
  const ctxct = document.getElementById('workforceChartDOCT');
  new Chart(ctxct, {
      type: 'bar',
      displayColors: true,
      interaction: {
          mode: 'index',
          intersect: false
      },
      data: {
          datasets: [{
              type: 'line',
              borderWidth: 2,
              borderColor: 'rgba(68, 114, 196)',
              backgroundColor: 'rgba(68, 114, 196)',
              fill: false,
              order: 1,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          }, {
              type: 'line',
              borderWidth: 1,
              borderColor: 'rgba(68, 114, 196)',
              borderDash: [5, 5],
              fill: false,
              order: 2,
              pointRadius: 0,
              datalabels: {
                  display: false
              }
          }, {
              type: 'line',
              borderWidth: 2,
              borderColor: 'rgba(237, 125, 50)',
              backgroundColor: 'rgba(237, 125, 50)',
              fill: false,
              order: 3,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          }]
      },
      plugins: [ChartDataSource],
      options: {
          title: {
              display: true,
              fontSize: 20,
              text: 'Contractor',
              padding: 20,
              fontColor: '#616161',
          },
          legend: {
              position: 'bottom',
              labels: {
                  usePointStyle: true
              }
          },
          tooltips: {
              mode: 'index',
              intersect: false,
              titleFontSize: 12,
              position: 'nearest'
          },
          responsive: true,
          scales: {
              x: {
                  stacked: true
              },
              y: {
                  stacked: true,
                  beginAtZero: true
              },
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          },
          plugins: {
              datasource: {
                  url: 'workforceresult.xlsx',
                  type: 'sheet',
                  //rowMapping: 'dataset',
                  datasetLabels: 'GraphAll!A22:A24',
                  indexLabels: 'GraphAll!B21:P21',
                  data: 'GraphAll!B22:P24'
              },
              datalabels: {
                  formatter: (value, ctx) => {
                      return;
                  },
                  backgroundColor: function(context) {
                      return context.dataset.backgroundColor;
                  },
                  borderRadius: 4,
                  //formatter: Math.round,
                  color: 'white',
                  padding: 0
              }
          }
      }
  });
  
  /*
  /* OUTSOURCE
  */
  
  const ctxos = document.getElementById('workforceChartDOOS');
  new Chart(ctxos, {
      type: 'bar',
      displayColors: true,
      interaction: {
          mode: 'index',
          intersect: false
      },
      data: {
          datasets: [{
              type: 'line',
              borderWidth: 2,
              borderColor: 'rgba(68, 114, 196)',
              backgroundColor: 'rgba(68, 114, 196)',
              fill: false,
              order: 1,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          }, {
              type: 'line',
              borderWidth: 1,
              borderColor: 'rgba(68, 114, 196)',
              borderDash: [5, 5],
              fill: false,
              order: 2,
              pointRadius: 0,
              datalabels: {
                  display: false
              }
          }, {
              type: 'line',
              borderWidth: 2,
              borderColor: 'rgba(237, 125, 50)',
              backgroundColor: 'rgba(237, 125, 50)',
              fill: false,
              order: 3,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          }]
      },
      plugins: [ChartDataSource],
      options: {
          title: {
              display: true,
              fontSize: 20,
              text: 'Outsource',
              padding: 20,
              fontColor: '#616161',
          },
          legend: {
              position: 'bottom',
              labels: {
                  usePointStyle: true
              }
          },
          tooltips: {
              mode: 'index',
              intersect: false,
              titleFontSize: 12,
              position: 'nearest'
          },
          responsive: true,
          scales: {
              x: {
                  stacked: true
              },
              y: {
                  stacked: true,
                  beginAtZero: true
              },
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          },
          plugins: {
              datasource: {
                  url: 'workforceresult.xlsx',
                  type: 'sheet',
                  //rowMapping: 'dataset',
                  datasetLabels: 'GraphAll!A32:A34',
                  indexLabels: 'GraphAll!B31:P31',
                  data: 'GraphAll!B32:P34'
              },
              datalabels: {
                  formatter: (value, ctx) => {
                      return;
                  },
                  backgroundColor: function(context) {
                      return context.dataset.backgroundColor;
                  },
                  borderRadius: 4,
                  //formatter: Math.round,
                  color: 'white',
                  padding: 0
              }
          }
      }
  });
  
  /*
  /* QUARTER : CPS
  */
  const ctxqtrcps = document.getElementById('workforceChartCPSQTR');
  new Chart(ctxqtrcps, {
      type: 'bar',
      displayColors: true,
      interaction: {
          mode: 'index',
          intersect: false
      },
      data: {
          datasets: [{
              type: 'line',
              borderWidth: 2,
              borderColor: 'rgba(68, 114, 196)',
              backgroundColor: 'rgba(68, 114, 196)',
              fill: false,
              order: 1,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          }, {
              type: 'line',
              borderWidth: 1,
              borderColor: 'rgba(68, 114, 196)',
              borderDash: [5, 5],
              fill: false,
              order: 2,
              pointRadius: 0,
              datalabels: {
                  display: false
              }
          }, {
              type: 'line',
              borderWidth: 2,
              borderColor: 'rgba(237, 125, 50)',
              backgroundColor: 'rgba(237, 125, 50)',
              fill: false,
              order: 3,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          }, {
              backgroundColor: 'rgba(165, 165, 165)',
              order: 4,
              stack: 'groupplan'
          }, {
              backgroundColor: 'rgba(255, 191, 0)',
              order: 4,
              stack: 'groupplan'
          }, {
              backgroundColor: 'rgba(91, 155, 213)',
              order: 4,
              stack: 'groupplan'
          }]
      },
      plugins: [ChartDataSource],
      options: {
          title: {
              display: true,
              fontSize: 14,
              text: 'CPS',
              padding: 20,
              fontColor: '#616161',
          },
          legend: {
              position: 'bottom',
              labels: {
                  usePointStyle: true
              }
          },
          tooltips: {
              mode: 'index',
              intersect: false,
              titleFontSize: 10,
              position: 'nearest'
          },
          responsive: true,
          scales: {
              x: {
                  stacked: true
              },
              y: {
                  stacked: true,
                  beginAtZero: true
              }
          },
          plugins: {
              datasource: {
                  url: 'workforceresult.xlsx',
                  type: 'sheet',
                  //rowMapping: 'dataset',
                  datasetLabels: 'GraphCPS!A42:A47',
                  indexLabels: 'GraphCPS!B41:F41',
                  data: 'GraphCPS!B42:F47'
              },
              datalabels: {
                  formatter: (value, ctx) => {
                      return;
                  },
                  backgroundColor: function(context) {
                      return context.dataset.backgroundColor;
                  },
                  borderRadius: 4,
                  //formatter: Math.round,
                  color: 'white',
                  padding: 0
              }
          }
      }
  });
  
  /*
  /* QUARTER : PSE
  */
  const ctxqtrpse = document.getElementById('workforceChartPSEQTR');
  new Chart(ctxqtrpse, {
      type: 'bar',
      displayColors: true,
      interaction: {
          mode: 'index',
          intersect: false
      },
      data: {
          datasets: [{
              type: 'line',
              borderWidth: 2,
              borderColor: 'rgba(68, 114, 196)',
              backgroundColor: 'rgba(68, 114, 196)',
              fill: false,
              order: 1,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          }, {
              type: 'line',
              borderWidth: 1,
              borderColor: 'rgba(68, 114, 196)',
              borderDash: [5, 5],
              fill: false,
              order: 2,
              pointRadius: 0,
              datalabels: {
                  display: false
              }
          }, {
              type: 'line',
              borderWidth: 2,
              borderColor: 'rgba(237, 125, 50)',
              backgroundColor: 'rgba(237, 125, 50)',
              fill: false,
              order: 3,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          }, {
              backgroundColor: 'rgba(165, 165, 165)',
              order: 4,
              stack: 'groupplan'
          }, {
              backgroundColor: 'rgba(255, 191, 0)',
              order: 4,
              stack: 'groupplan'
          }, {
              backgroundColor: 'rgba(91, 155, 213)',
              order: 4,
              stack: 'groupplan'
          }]
      },
      plugins: [ChartDataSource],
      options: {
          title: {
              display: true,
              fontSize: 14,
              text: 'PSE',
              padding: 20,
              fontColor: '#616161',
          },
          legend: {
              position: 'bottom',
              labels: {
                  usePointStyle: true
              }
          },
          tooltips: {
              mode: 'index',
              intersect: false,
              titleFontSize: 10,
              position: 'nearest'
          },
          responsive: true,
          scales: {
              x: {
                  stacked: true
              },
              y: {
                  stacked: true,
                  beginAtZero: true
              }
          },
          plugins: {
              datasource: {
                  url: 'workforceresult.xlsx',
                  type: 'sheet',
                  //rowMapping: 'dataset',
                  datasetLabels: 'GraphPSE!A42:A47',
                  indexLabels: 'GraphPSE!B41:F41',
                  data: 'GraphPSE!B42:F47'
              },
              datalabels: {
                  formatter: (value, ctx) => {
                      return;
                  },
                  backgroundColor: function(context) {
                      return context.dataset.backgroundColor;
                  },
                  borderRadius: 4,
                  //formatter: Math.round,
                  color: 'white',
                  padding: 0
              }
          }
      }
  });
  
  /*
  /* QUARTER : SD
  */
  const ctxqtrsd = document.getElementById('workforceChartSDQTR');
  new Chart(ctxqtrsd, {
      type: 'bar',
      displayColors: true,
      interaction: {
          mode: 'index',
          intersect: false
      },
      data: {
          datasets: [{
              type: 'line',
              borderWidth: 2,
              borderColor: 'rgba(68, 114, 196)',
              backgroundColor: 'rgba(68, 114, 196)',
              fill: false,
              order: 1,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          }, {
              type: 'line',
              borderWidth: 1,
              borderColor: 'rgba(68, 114, 196)',
              borderDash: [5, 5],
              fill: false,
              order: 2,
              pointRadius: 0,
              datalabels: {
                  display: false
              }
          }, {
              type: 'line',
              borderWidth: 2,
              borderColor: 'rgba(237, 125, 50)',
              backgroundColor: 'rgba(237, 125, 50)',
              fill: false,
              order: 3,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          }, {
              backgroundColor: 'rgba(165, 165, 165)',
              order: 4,
              stack: 'groupplan'
          }, {
              backgroundColor: 'rgba(255, 191, 0)',
              order: 4,
              stack: 'groupplan'
          }, {
              backgroundColor: 'rgba(91, 155, 213)',
              order: 4,
              stack: 'groupplan'
          }]
      },
      plugins: [ChartDataSource],
      options: {
          title: {
              display: true,
              fontSize: 14,
              text: 'SD',
              padding: 20,
              fontColor: '#616161',
          },
          legend: {
              position: 'bottom',
              labels: {
                  usePointStyle: true
              }
          },
          tooltips: {
              mode: 'index',
              intersect: false,
              titleFontSize: 10,
              position: 'nearest'
          },
          responsive: true,
          scales: {
              x: {
                  stacked: true
              },
              y: {
                  stacked: true,
                  beginAtZero: true
              }
          },
          plugins: {
              datasource: {
                  url: 'workforceresult.xlsx',
                  type: 'sheet',
                  //rowMapping: 'dataset',
                  datasetLabels: 'GraphSD!A42:A47',
                  indexLabels: 'GraphSD!B41:F41',
                  data: 'GraphSD!B42:F47'
              },
              datalabels: {
                  formatter: (value, ctx) => {
                      return;
                  },
                  backgroundColor: function(context) {
                      return context.dataset.backgroundColor;
                  },
                  borderRadius: 4,
                  //formatter: Math.round,
                  color: 'white',
                  padding: 0
              }
          }
      }
  });
  
  /*
  /* QUARTER : AIC
  */
  const ctxqtraic = document.getElementById('workforceChartAICQTR');
  new Chart(ctxqtraic, {
      type: 'bar',
      displayColors: true,
      interaction: {
          mode: 'index',
          intersect: false
      },
      data: {
          datasets: [{
              type: 'line',
              borderWidth: 2,
              borderColor: 'rgba(68, 114, 196)',
              backgroundColor: 'rgba(68, 114, 196)',
              fill: false,
              order: 1,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          }, {
              type: 'line',
              borderWidth: 1,
              borderColor: 'rgba(68, 114, 196)',
              borderDash: [5, 5],
              fill: false,
              order: 2,
              pointRadius: 0,
              datalabels: {
                  display: false
              }
          }, {
              type: 'line',
              borderWidth: 2,
              borderColor: 'rgba(237, 125, 50)',
              backgroundColor: 'rgba(237, 125, 50)',
              fill: false,
              order: 3,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          }, {
              backgroundColor: 'rgba(165, 165, 165)',
              order: 4,
              stack: 'groupplan'
          }, {
              backgroundColor: 'rgba(255, 191, 0)',
              order: 4,
              stack: 'groupplan'
          }, {
              backgroundColor: 'rgba(91, 155, 213)',
              order: 4,
              stack: 'groupplan'
          }]
      },
      plugins: [ChartDataSource],
      options: {
          title: {
              display: true,
              fontSize: 14,
              text: 'AIC',
              padding: 20,
              fontColor: '#616161',
          },
          legend: {
              position: 'bottom',
              labels: {
                  usePointStyle: true
              }
          },
          tooltips: {
              mode: 'index',
              intersect: false,
              titleFontSize: 10,
              position: 'nearest'
          },
          responsive: true,
          scales: {
              x: {
                  stacked: true
              },
              y: {
                  stacked: true,
                  beginAtZero: true
              }
          },
          plugins: {
              datasource: {
                  url: 'workforceresult.xlsx',
                  type: 'sheet',
                  //rowMapping: 'dataset',
                  datasetLabels: 'GraphAIC!A42:A47',
                  indexLabels: 'GraphAIC!B41:F41',
                  data: 'GraphAIC!B42:F47'
              },
              datalabels: {
                  formatter: (value, ctx) => {
                      return;
                  },
                  backgroundColor: function(context) {
                      return context.dataset.backgroundColor;
                  },
                  borderRadius: 4,
                  //formatter: Math.round,
                  color: 'white',
                  padding: 0
              }
          }
      }
  });
  
  /*
  /* QUARTER : TDE
  */
  const ctxqtrtde = document.getElementById('workforceChartTDEQTR');
  new Chart(ctxqtrtde, {
      type: 'bar',
      displayColors: true,
      interaction: {
          mode: 'index',
          intersect: false
      },
      data: {
          datasets: [{
              type: 'line',
              borderWidth: 2,
              borderColor: 'rgba(68, 114, 196)',
              backgroundColor: 'rgba(68, 114, 196)',
              fill: false,
              order: 1,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          }, {
              type: 'line',
              borderWidth: 1,
              borderColor: 'rgba(68, 114, 196)',
              borderDash: [5, 5],
              fill: false,
              order: 2,
              pointRadius: 0,
              datalabels: {
                  display: false
              }
          }, {
              type: 'line',
              borderWidth: 2,
              borderColor: 'rgba(237, 125, 50)',
              backgroundColor: 'rgba(237, 125, 50)',
              fill: false,
              order: 3,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          }, {
              backgroundColor: 'rgba(165, 165, 165)',
              order: 4,
              stack: 'groupplan'
          }, {
              backgroundColor: 'rgba(255, 191, 0)',
              order: 4,
              stack: 'groupplan'
          }, {
              backgroundColor: 'rgba(91, 155, 213)',
              order: 4,
              stack: 'groupplan'
          }]
      },
      plugins: [ChartDataSource],
      options: {
          title: {
              display: true,
              fontSize: 14,
              text: 'TDE',
              padding: 20,
              fontColor: '#616161',
          },
          legend: {
              position: 'bottom',
              labels: {
                  usePointStyle: true
              }
          },
          tooltips: {
              mode: 'index',
              intersect: false,
              titleFontSize: 10,
              position: 'nearest'
          },
          responsive: true,
          scales: {
              x: {
                  stacked: true
              },
              y: {
                  stacked: true,
                  beginAtZero: true
              }
          },
          plugins: {
              datasource: {
                  url: 'workforceresult.xlsx',
                  type: 'sheet',
                  //rowMapping: 'dataset',
                  datasetLabels: 'GraphTDE!A42:A47',
                  indexLabels: 'GraphTDE!B41:F41',
                  data: 'GraphTDE!B42:F47'
              },
              datalabels: {
                  formatter: (value, ctx) => {
                      return;
                  },
                  backgroundColor: function(context) {
                      return context.dataset.backgroundColor;
                  },
                  borderRadius: 4,
                  //formatter: Math.round,
                  color: 'white',
                  padding: 0
              }
          }
      }
  });
  
  /*
  /* Available - Month
  */
  const ctxavai = document.getElementById('workforceChartDOAvai');
  new Chart(ctxavai, {
      type: 'bar',
      displayColors: true,
      interaction: {
          mode: 'index',
          intersect: false
      },
      data: {
          datasets: [{
              type: 'line',
              borderWidth: 2,
              borderColor: 'rgba(112, 173, 71)',
              fill: false,
              order: 1,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          }]
      },
      plugins: [ChartDataSource],
      options: {
          title: {
              display: true,
              fontSize: 14,
              text: 'Available per Month',
              padding: 20,
              fontColor: '#616161',
          },
          legend: {
              position: 'bottom',
              labels: {
                  usePointStyle: true
              }
          },
          tooltips: {
              mode: 'index',
              intersect: false,
              titleFontSize: 10,
              position: 'nearest'
          },
          responsive: true,
          scales: {
              x: {
                  stacked: true
              },
              y: {
                  stacked: true,
                  beginAtZero: true
              },
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          },
          plugins: {
              datasource: {
                  url: 'workforceresult.xlsx',
                  type: 'sheet',
                  //rowMapping: 'dataset',
                  datasetLabels: 'GraphAll!A153:A153',
                  indexLabels: 'GraphAll!B151:P151',
                  data: 'GraphAll!B153:P153'
              },
              datalabels: {
                  formatter: (value, ctx) => {
                      return;
                  },
                  backgroundColor: function(context) {
                      return context.dataset.backgroundColor;
                  },
                  borderRadius: 4,
                  formatter: Math.round,
                  color: 'rgba(112, 173, 71)',
                  padding: 0
              }
          }
      }
  });
  
  /*
  /* % PLAN - QTR
  */
  const ctxplanqtr = document.getElementById('workforceChartDOPlanQtr');
  new Chart(ctxplanqtr, {
      type: 'bar',
      displayColors: true,
      interaction: {
          mode: 'index',
          intersect: false
      },
      data: {
          datasets: [{
              type: 'line',
              borderWidth: 2,
              borderColor: 'rgba(197, 90, 17)',
              fill: false,
              order: 1,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          }]
      },
      plugins: [ChartDataSource],
      options: {
          title: {
              display: true,
              fontSize: 14,
              text: '% Plan per Quarter',
              padding: 20,
              fontColor: '#616161',
          },
          legend: {
              position: 'bottom',
              labels: {
                  usePointStyle: true
              }
          },
          tooltips: {
              mode: 'index',
              intersect: false,
              titleFontSize: 10,
              position: 'nearest'
          },
          responsive: true,
          scales: {
              x: {
                  stacked: true
              },
              y: {
                  stacked: true,
                  beginAtZero: true
              },
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          },
          plugins: {
              datasource: {
                  url: 'workforceresult.xlsx',
                  type: 'sheet',
                  //rowMapping: 'dataset',
                  datasetLabels: 'GraphAll!A156:A156',
                  indexLabels: 'GraphAll!B155:F155',
                  data: 'GraphAll!B156:F156'
              },
              datalabels: {
                  formatter: (value, ctx) => {
                      return;
                  },
                  backgroundColor: function(context) {
                      return context.dataset.backgroundColor;
                  },
                  borderRadius: 4,
                  formatter: Math.round,
                  color: 'rgba(197, 90, 17)',
                  padding: 0
              }
          }
      }
  });
  
  /*
  /* % PLAN - QTR : CPS
  */
  const ctxplanqtrcps = document.getElementById('workforceChartCPSPlanQtr');
  new Chart(ctxplanqtrcps, {
      type: 'bar',
      displayColors: true,
      interaction: {
          mode: 'index',
          intersect: false
      },
      data: {
          datasets: [{
              type: 'line',
              borderWidth: 2,
              borderColor: 'rgba(197, 90, 17)',
              fill: false,
              order: 1,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          }]
      },
      plugins: [ChartDataSource],
      options: {
          title: {
              display: true,
              fontSize: 14,
              text: '% CPS Plan',
              padding: 20,
              fontColor: '#616161',
          },
          legend: {
              position: 'bottom',
              labels: {
                  usePointStyle: true
              }
          },
          tooltips: {
              mode: 'index',
              intersect: false,
              titleFontSize: 10,
              position: 'nearest'
          },
          responsive: true,
          scales: {
              x: {
                  stacked: true
              },
              y: {
                  stacked: true,
                  beginAtZero: true
              },
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          },
          plugins: {
              datasource: {
                  url: 'workforceresult.xlsx',
                  type: 'sheet',
                  //rowMapping: 'dataset',
                  datasetLabels: 'GraphCPS!A156:A156',
                  indexLabels: 'GraphCPS!B155:F155',
                  data: 'GraphCPS!B156:F156'
              },
              datalabels: {
                  formatter: (value, ctx) => {
                      return;
                  },
                  backgroundColor: function(context) {
                      return context.dataset.backgroundColor;
                  },
                  borderRadius: 4,
                  formatter: Math.round,
                  color: 'rgba(197, 90, 17)',
                  padding: 0
              }
          }
      }
  });
  
  /*
  /* % PLAN - QTR : PSE
  */
  const ctxplanqtrpse = document.getElementById('workforceChartPSEPlanQtr');
  new Chart(ctxplanqtrpse, {
      type: 'bar',
      displayColors: true,
      interaction: {
          mode: 'index',
          intersect: false
      },
      data: {
          datasets: [{
              type: 'line',
              borderWidth: 2,
              borderColor: 'rgba(197, 90, 17)',
              fill: false,
              order: 1,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          }]
      },
      plugins: [ChartDataSource],
      options: {
          title: {
              display: true,
              fontSize: 14,
              text: '% PSE Plan',
              padding: 20,
              fontColor: '#616161',
          },
          legend: {
              position: 'bottom',
              labels: {
                  usePointStyle: true
              }
          },
          tooltips: {
              mode: 'index',
              intersect: false,
              titleFontSize: 10,
              position: 'nearest'
          },
          responsive: true,
          scales: {
              x: {
                  stacked: true
              },
              y: {
                  stacked: true,
                  beginAtZero: true
              },
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          },
          plugins: {
              datasource: {
                  url: 'workforceresult.xlsx',
                  type: 'sheet',
                  //rowMapping: 'dataset',
                  datasetLabels: 'GraphPSE!A156:A156',
                  indexLabels: 'GraphPSE!B155:F155',
                  data: 'GraphPSE!B156:F156'
              },
              datalabels: {
                  formatter: (value, ctx) => {
                      return;
                  },
                  backgroundColor: function(context) {
                      return context.dataset.backgroundColor;
                  },
                  borderRadius: 4,
                  formatter: Math.round,
                  color: 'rgba(197, 90, 17)',
                  padding: 0
              }
          }
      }
  });
  
  /*
  /* % PLAN - QTR : SD
  */
  const ctxplanqtrsd = document.getElementById('workforceChartSDPlanQtr');
  new Chart(ctxplanqtrsd, {
      type: 'bar',
      displayColors: true,
      interaction: {
          mode: 'index',
          intersect: false
      },
      data: {
          datasets: [{
              type: 'line',
              borderWidth: 2,
              borderColor: 'rgba(197, 90, 17)',
              fill: false,
              order: 1,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          }]
      },
      plugins: [ChartDataSource],
      options: {
          title: {
              display: true,
              fontSize: 14,
              text: '% SD Plan',
              padding: 20,
              fontColor: '#616161',
          },
          legend: {
              position: 'bottom',
              labels: {
                  usePointStyle: true
              }
          },
          tooltips: {
              mode: 'index',
              intersect: false,
              titleFontSize: 10,
              position: 'nearest'
          },
          responsive: true,
          scales: {
              x: {
                  stacked: true
              },
              y: {
                  stacked: true,
                  beginAtZero: true
              },
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          },
          plugins: {
              datasource: {
                  url: 'workforceresult.xlsx',
                  type: 'sheet',
                  //rowMapping: 'dataset',
                  datasetLabels: 'GraphSD!A156:A156',
                  indexLabels: 'GraphSD!B155:F155',
                  data: 'GraphSD!B156:F156'
              },
              datalabels: {
                  formatter: (value, ctx) => {
                      return;
                  },
                  backgroundColor: function(context) {
                      return context.dataset.backgroundColor;
                  },
                  borderRadius: 4,
                  formatter: Math.round,
                  color: 'rgba(197, 90, 17)',
                  padding: 0
              }
          }
      }
  });
  
  /*
  /* % PLAN - QTR : AIC
  */
  const ctxplanqtraic = document.getElementById('workforceChartAICPlanQtr');
  new Chart(ctxplanqtraic, {
      type: 'bar',
      displayColors: true,
      interaction: {
          mode: 'index',
          intersect: false
      },
      data: {
          datasets: [{
              type: 'line',
              borderWidth: 2,
              borderColor: 'rgba(197, 90, 17)',
              fill: false,
              order: 1,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          }]
      },
      plugins: [ChartDataSource],
      options: {
          title: {
              display: true,
              fontSize: 14,
              text: '% AIC Plan',
              padding: 20,
              fontColor: '#616161',
          },
          legend: {
              position: 'bottom',
              labels: {
                  usePointStyle: true
              }
          },
          tooltips: {
              mode: 'index',
              intersect: false,
              titleFontSize: 10,
              position: 'nearest'
          },
          responsive: true,
          scales: {
              x: {
                  stacked: true
              },
              y: {
                  stacked: true,
                  beginAtZero: true
              },
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          },
          plugins: {
              datasource: {
                  url: 'workforceresult.xlsx',
                  type: 'sheet',
                  //rowMapping: 'dataset',
                  datasetLabels: 'GraphAIC!A156:A156',
                  indexLabels: 'GraphAIC!B155:F155',
                  data: 'GraphAIC!B156:F156'
              },
              datalabels: {
                  formatter: (value, ctx) => {
                      return;
                  },
                  backgroundColor: function(context) {
                      return context.dataset.backgroundColor;
                  },
                  borderRadius: 4,
                  formatter: Math.round,
                  color: 'rgba(197, 90, 17)',
                  padding: 0
              }
          }
      }
  });
  
  /*
  /* % PLAN - QTR : TDE
  */
  const ctxplanqtrtde = document.getElementById('workforceChartTDEPlanQtr');
  new Chart(ctxplanqtrtde, {
      type: 'bar',
      displayColors: true,
      interaction: {
          mode: 'index',
          intersect: false
      },
      data: {
          datasets: [{
              type: 'line',
              borderWidth: 2,
              borderColor: 'rgba(197, 90, 17)',
              fill: false,
              order: 1,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          }]
      },
      plugins: [ChartDataSource],
      options: {
          title: {
              display: true,
              fontSize: 14,
              text: '% TDE Plan',
              padding: 20,
              fontColor: '#616161',
          },
          legend: {
              position: 'bottom',
              labels: {
                  usePointStyle: true
              }
          },
          tooltips: {
              mode: 'index',
              intersect: false,
              titleFontSize: 10,
              position: 'nearest'
          },
          responsive: true,
          scales: {
              x: {
                  stacked: true
              },
              y: {
                  stacked: true,
                  beginAtZero: true
              },
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          },
          plugins: {
              datasource: {
                  url: 'workforceresult.xlsx',
                  type: 'sheet',
                  //rowMapping: 'dataset',
                  datasetLabels: 'GraphTDE!A156:A156',
                  indexLabels: 'GraphTDE!B155:F155',
                  data: 'GraphTDE!B156:F156'
              },
              datalabels: {
                  formatter: (value, ctx) => {
                      return;
                  },
                  backgroundColor: function(context) {
                      return context.dataset.backgroundColor;
                  },
                  borderRadius: 4,
                  formatter: Math.round,
                  color: 'rgba(197, 90, 17)',
                  padding: 0
              }
          }
      }
  });
  
  /*
  /* Project
  */
  const ctxproject = document.getElementById('workforceChartProject');
  new Chart(ctxproject, {
      type: 'line',
      displayColors: true,
      interaction: {
          mode: 'index',
          intersect: false
      },
      data: {
          datasets: [{
              borderWidth: 2,
              borderColor: 'rgba(68, 115, 196)',
              backgroundColor: 'rgba(68, 115, 196)',
              fill: false,
              order: 1,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          },{
              borderWidth: 2,
              borderColor: 'rgba(237, 126, 49)',
              backgroundColor: 'rgba(237, 126, 49)',
              fill: false,
              order: 2,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          },{
              borderWidth: 2,
              borderColor: 'rgba(165, 165, 165)',
              backgroundColor: 'rgba(165, 165, 165)',
              fill: false,
              order: 3,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          },{
              borderWidth: 2,
              borderColor: 'rgba(254, 192, 2)',
              backgroundColor: 'rgba(254, 192, 2)',
              fill: false,
              order: 4,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          },{
              borderWidth: 2,
              borderColor: 'rgba(91, 155, 213)',
              backgroundColor: 'rgba(91, 155, 213)',
              fill: false,
              order: 5,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          }]
      },
      plugins: [ChartDataSource],
      options: {
          title: {
              display: true,
              fontSize: 20,
              text: 'FTE per Focus Area',
              padding: 20,
              fontColor: '#616161',
          },
          legend: {
              position: 'bottom',
              labels: {
                  usePointStyle: true
              }
          },
          tooltips: {
              mode: 'index',
              intersect: false,
              titleFontSize: 12,
              position: 'nearest'
          },
          responsive: true,
          scales: {
              x: {
                  stacked: true
              },
              y: {
                  stacked: true,
                  beginAtZero: true
              },
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          },
          plugins: {
              datasource: {
                  url: 'workforceresult.xlsx',
                  type: 'sheet',
                  //rowMapping: 'dataset',
                  datasetLabels: 'GraphPJ!A42:A46',
                  indexLabels: 'GraphPJ!B41:P41',
                  data: 'GraphPJ!B42:P46'
              },
              datalabels: {
                  formatter: (value, ctx) => {
                      return;
                  },
                  backgroundColor: function(context) {
                      return context.dataset.backgroundColor;
                  },
                  borderRadius: 4,
                  //formatter: Math.round,
                  color: 'white',
                  padding: 0
              }
          }
      }
  });
  
  /*
  /* Product
  */
  const ctxproduct = document.getElementById('workforceChartProduct');
  new Chart(ctxproduct, {
      type: 'line',
      displayColors: true,
      interaction: {
          mode: 'index',
          intersect: false
      },
      data: {
          datasets: [{
              borderWidth: 2,
              borderColor: 'rgba(68, 115, 196)',
              backgroundColor: 'rgba(68, 115, 196)',
              fill: false,
              order: 1,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          },{
              borderWidth: 2,
              borderColor: 'rgba(237, 126, 49)',
              backgroundColor: 'rgba(237, 126, 49)',
              fill: false,
              order: 2,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          },{
              borderWidth: 2,
              borderColor: 'rgba(165, 165, 165)',
              backgroundColor: 'rgba(165, 165, 165)',
              fill: false,
              order: 3,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          },{
              borderWidth: 2,
              borderColor: 'rgba(254, 192, 2)',
              backgroundColor: 'rgba(254, 192, 2)',
              fill: false,
              order: 4,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          },{
              borderWidth: 2,
              borderColor: 'rgba(91, 155, 213)',
              backgroundColor: 'rgba(91, 155, 213)',
              fill: false,
              order: 5,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          },{
              borderWidth: 2,
              borderColor: 'rgba(6, 176, 80)',
              backgroundColor: 'rgba(6, 176, 80)',
              fill: false,
              order: 5,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          }]
      },
      plugins: [ChartDataSource],
      options: {
          title: {
              display: true,
              fontSize: 20,
              text: 'FTE per DO Product',
              padding: 20,
              fontColor: '#616161',
          },
          legend: {
              position: 'bottom',
              labels: {
                  usePointStyle: true
              }
          },
          tooltips: {
              mode: 'index',
              intersect: false,
              titleFontSize: 12,
              position: 'nearest'
          },
          responsive: true,
          scales: {
              x: {
                  stacked: true
              },
              y: {
                  stacked: true,
                  beginAtZero: true
              },
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          },
          plugins: {
              datasource: {
                  url: 'workforceresult.xlsx',
                  type: 'sheet',
                  //rowMapping: 'dataset',
                  datasetLabels: 'GraphPJ!A2:A7',
                  indexLabels: 'GraphPJ!B1:P1',
                  data: 'GraphPJ!B2:P7'
              },
              datalabels: {
                  formatter: (value, ctx) => {
                      return;
                  },
                  backgroundColor: function(context) {
                      return context.dataset.backgroundColor;
                  },
                  borderRadius: 4,
                  //formatter: Math.round,
                  color: 'white',
                  padding: 0
              }
          }
      }
  });
  
  
  /*
  /* Project Per Type
  */
  const ctxpjt = document.getElementById('workforceChartProjectPerTeam');
  new Chart(ctxpjt, {
      type: 'bar',
      displayColors: true,
      interaction: {
          mode: 'index',
          intersect: false
      },
      data: {
          datasets: [
          {
              backgroundColor: 'rgba(68, 115, 196)',
              order: 2,
              stack: 'grouppj'
          }, {
              backgroundColor: 'rgba(237, 126, 49)',
              order: 2,
              stack: 'grouppj'
          }, {
              backgroundColor: 'rgba(165, 165, 165)',
              order: 2,
              stack: 'grouppj'
          }, {
              backgroundColor: 'rgba(254, 192, 2)',
              order: 2,
              stack: 'grouppj'
          }, {
              backgroundColor: 'rgba(91, 155, 213)',
              order: 2,
              stack: 'grouppj'
          }]
      },
      plugins: [ChartDataSource],
      options: {
          title: {
              display: true,
              fontSize: 20,
              text: "Top FTE Planning [Q3'26:Q2'27]",
              padding: 20,
              fontColor: '#616161',
          },
          legend: {
              position: 'bottom',
              labels: {
                  usePointStyle: true
              }
          },
          tooltips: {
              mode: 'index',
              intersect: false,
              titleFontSize: 12,
              position: 'nearest'
          },
          responsive: true,
          scales: {
              x: {
                  stacked: true
              },
              y: {
                  stacked: true,
                  beginAtZero: true
              }
          },
          plugins: {
              datasource: {
                  url: 'workforceresult.xlsx',
                  type: 'sheet',
                  //rowMapping: 'dataset',
                  datasetLabels: 'GraphPJ!A22:A26',
                  indexLabels: 'GraphPJ!B21:G21',
                  data: 'GraphPJ!B22:G26'
              },
              datalabels: {
                  formatter: (value, ctx) => {
                      return;
                  },
                  backgroundColor: function(context) {
                      return context.dataset.backgroundColor;
                  },
                  borderRadius: 4,
                  //formatter: Math.round,
                  color: 'white',
                  padding: 0
              }
          }
      }
  });
  
  
  /*
  /* PLAN vs ACTUAL
  */
  
  const ctxpa = document.getElementById('workforceChartDOPlanActual');
  new Chart(ctxpa, {
      type: 'bar',
      displayColors: true,
      interaction: {
          mode: 'index',
          intersect: false
      },
      data: {
          datasets: [{
              type: 'line',
              borderWidth: 2,
              borderColor: 'rgba(68, 114, 196)',
              backgroundColor: 'rgba(68, 114, 196)',
              fill: false,
              order: 1,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          }, {
              type: 'line',
              borderWidth: 2,
              borderColor: 'rgba(237, 125, 50)',
              backgroundColor: 'rgba(237, 125, 50)',
              fill: false,
              order: 3,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          }, {
              type: 'line',
              borderWidth: 2,
              borderColor: 'rgba(6, 176, 80)',
              backgroundColor: 'rgba(6, 176, 80)',
              fill: false,
              order: 3,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          }, {
              type: 'line',
              borderWidth: 1,
              borderColor: 'rgba(132, 60, 11)',
              backgroundColor: 'rgba(132, 60, 11)',
              borderDash: [5, 5],
              fill: false,
              order: 2,
              pointRadius: 0,
              color: 'red',
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          }]
      },
      plugins: [ChartDataSource],
      options: {
          title: {
              display: true,
              fontSize: 20,
              text: 'Utilization vs Workforce 2026',
              padding: 20,
              fontColor: '#616161',
          },
          legend: {
              position: 'bottom',
              labels: {
                  usePointStyle: true
              }
          },
          tooltips: {
              mode: 'index',
              intersect: false,
              titleFontSize: 12,
              position: 'nearest'
          },
          responsive: true,
          scales: {
              x: {
                  stacked: true
              },
              y: {
                  stacked: true,
                  beginAtZero: true
              }
          },
          plugins: {
              datasource: {
                  url: 'workforceresult.xlsx',
                  type: 'sheet',
                  //rowMapping: 'dataset',
                  datasetLabels: 'GraphAll!A162:A165',
                  indexLabels: 'GraphAll!B161:P161',
                  data: 'GraphAll!B162:P165'
              },
              datalabels: {
                  formatter: (value, ctx) => {
                      return;
                  },
                  backgroundColor: function(context) {
                      return context.dataset.backgroundColor;
                  },
                  borderRadius: 4,
                  formatter: Math.round,
                  color: 'white',
                  padding: 0
              }
          }
      }
  });
  
  
  /*
  /* Project PLAN vs ACTUAL Revenue
  */
  
  const ctxrvn = document.getElementById('workforceChartProjectRevenue');
  new Chart(ctxrvn, {
      type: 'bar',
      displayColors: true,
      interaction: {
          mode: 'index',
          intersect: false
      },
      data: {
          datasets: [{
              type: 'line',
              borderWidth: 2,
              borderColor: 'rgba(237, 125, 50)',
              backgroundColor: 'rgba(237, 125, 50)',
              pointRadius: 0,
              fill: false,
              order: 1,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          }, {
              type: 'line',
              borderWidth: 2,
              borderColor: 'rgba(6, 176, 80)',
              backgroundColor: 'rgba(6, 176, 80)',
              pointRadius: 0,
              fill: false,
              order: 2,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          }, {
              backgroundColor: 'rgba(165, 165, 165)',
              order: 3,
              stack: 'groupplan'
          }, {
              backgroundColor: 'rgba(255, 191, 0)',
              order: 4,
              stack: 'groupactual'
          }, {
              backgroundColor: 'rgba(91, 155, 213)',
              order: 3,
              stack: 'groupplan'
          }, {
              backgroundColor: 'rgba(113, 173, 71)',
              order: 4,
              stack: 'groupactual'
          }]
      },
      plugins: [ChartDataSource],
      options: {
          title: {
              display: true,
              fontSize: 20,
              text: 'Project/Product Revenue 2026',
              padding: 20,
              fontColor: '#616161',
          },
          legend: {
              position: 'bottom',
              labels: {
                  usePointStyle: true
              }
          },
          tooltips: {
              mode: 'index',
              intersect: false,
              titleFontSize: 12,
              position: 'nearest'
          },
          responsive: true,
          scales: {
              x: {
                  stacked: true
              },
              y: {
                  beginAtZero: true
              }
          },
          plugins: {
              datasource: {
                  url: 'workforceresult.xlsx',
                  type: 'sheet',
                  //rowMapping: 'dataset',
                  datasetLabels: 'GraphPJ!A32:A37',
                  indexLabels: 'GraphPJ!B31:M31',
                  data: 'GraphPJ!B32:M37'
              },
              datalabels: {
                  formatter: (value, ctx) => {
                      return;
                  },
                  backgroundColor: function(context) {
                      return context.dataset.backgroundColor;
                  },
                  borderRadius: 4,
                  //formatter: Math.round,
                  color: 'white',
                  padding: 0
              }
          }
      }
  });
  
  
  /*
  /* PS PLAN vs ACTUAL Revenue
  */
  
  const ctxrvnpj = document.getElementById('workforceChartProjectRevenuePS');
  new Chart(ctxrvnpj, {
      type: 'bar',
      displayColors: true,
      interaction: {
          mode: 'index',
          intersect: false
      },
      data: {
          datasets: [{
              type: 'line',
              borderWidth: 2,
              borderColor: 'rgba(237, 125, 50)',
              backgroundColor: 'rgba(237, 125, 50)',
              fill: false,
              order: 1,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          }, 
          {
              type: 'line',
              borderWidth: 2,
              borderColor: 'rgba(6, 176, 80)',
              backgroundColor: 'rgba(6, 176, 80)',
              fill: false,
              order: 1,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          }]
      },
      plugins: [ChartDataSource],
      options: {
          title: {
              display: true,
              fontSize: 14,
              text: 'Project Revenue 2026',
              padding: 20,
              fontColor: '#616161',
          },
          legend: {
              position: 'bottom',
              labels: {
                  usePointStyle: true
              }
          },
          tooltips: {
              mode: 'index',
              intersect: false,
              titleFontSize: 10,
              position: 'nearest'
          },
          responsive: true,
          scales: {
              x: {
                  stacked: true
              },
              y: {
                  stacked: true,
                  beginAtZero: true
              },
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          },
          plugins: {
              datasource: {
                  url: 'workforceresult.xlsx',
                  type: 'sheet',
                  //rowMapping: 'dataset',
                  datasetLabels: 'GraphPJ!A34:A35',
                  indexLabels: 'GraphPJ!B31:M31',
                  data: 'GraphPJ!B34:M35'
              },
              datalabels: {
                  formatter: (value, ctx) => {
                      return;
                  },
                  backgroundColor: function(context) {
                      return context.dataset.backgroundColor;
                  },
                  borderRadius: 4,
                  //formatter: Math.round,
                  color: 'white',
                  padding: 0
              }
          }
      }
  });
  
  
  /*
  /* PD PLAN vs ACTUAL Revenue
  */
  
  const ctxrvnpd = document.getElementById('workforceChartProjectRevenuePD');
  new Chart(ctxrvnpd, {
      type: 'bar',
      displayColors: true,
      interaction: {
          mode: 'index',
          intersect: false
      },
      data: {
          datasets: [{
              type: 'line',
              borderWidth: 2,
              borderColor: 'rgba(237, 125, 50)',
              backgroundColor: 'rgba(237, 125, 50)',
              fill: false,
              order: 1,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 2
              }
          }, 
          {
              type: 'line',
              borderWidth: 2,
              borderColor: 'rgba(6, 176, 80)',
              backgroundColor: 'rgba(6, 176, 80)',
              fill: false,
              order: 1,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 2
              }
          }]
      },
      plugins: [ChartDataSource],
      options: {
          title: {
              display: true,
              fontSize: 14,
              text: 'Product Revenue 2026',
              padding: 20,
              fontColor: '#616161',
          },
          legend: {
              position: 'bottom',
              labels: {
                  usePointStyle: true
              }
          },
          tooltips: {
              mode: 'index',
              intersect: false,
              titleFontSize: 10,
              position: 'nearest'
          },
          responsive: true,
          scales: {
              x: {
                  stacked: true
              },
              y: {
                  stacked: true,
                  beginAtZero: true
              },
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          },
          plugins: {
              datasource: {
                  url: 'workforceresult.xlsx',
                  type: 'sheet',
                  //rowMapping: 'dataset',
                  datasetLabels: 'GraphPJ!A36:A37',
                  indexLabels: 'GraphPJ!B31:M31',
                  data: 'GraphPJ!B36:M37'
              },
              datalabels: {
                  formatter: (value, ctx) => {
                      return;
                  },
                  backgroundColor: function(context) {
                      return context.dataset.backgroundColor;
                  },
                  borderRadius: 4,
                  //formatter: Math.round,
                  color: 'white',
                  padding: 0
              }
          }
      }
  });
  
  
  /*
  /* MONTH
  */
  
  const ctxdv = document.getElementById('workforceChartDV');
  new Chart(ctxdv, {
      type: 'bar',
      displayColors: true,
      interaction: {
          mode: 'index',
          intersect: false
      },
      data: {
          datasets: [{
              type: 'line',
              borderWidth: 2,
              borderColor: 'rgba(68, 114, 196)',
              backgroundColor: 'rgba(68, 114, 196)',
              fill: false,
              order: 1,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          }, {
              type: 'line',
              borderWidth: 1,
              borderColor: 'rgba(68, 114, 196)',
              borderDash: [5, 5],
              fill: false,
              order: 2,
              pointRadius: 0,
              datalabels: {
                  display: false
              }
          }, {
              type: 'line',
              borderWidth: 2,
              borderColor: 'rgba(237, 125, 50)',
              backgroundColor: 'rgba(237, 125, 50)',
              fill: false,
              order: 3,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          }, {
              backgroundColor: 'rgba(165, 165, 165)',
              order: 4,
              stack: 'groupplan'
          }, {
              backgroundColor: 'rgba(255, 191, 0)',
              order: 4,
              stack: 'groupplan'
          }, {
              backgroundColor: 'rgba(91, 155, 213)',
              order: 4,
              stack: 'groupplan'
          }]
      },
      plugins: [ChartDataSource],
      options: {
          title: {
              display: true,
              fontSize: 20,
              text: 'SCG Digital Workforce 2026',
              padding: 20,
              fontColor: '#616161',
          },
          legend: {
              position: 'bottom',
              labels: {
                  usePointStyle: true
              }
          },
          tooltips: {
              mode: 'index',
              intersect: false,
              titleFontSize: 12,
              position: 'nearest'
          },
          responsive: true,
          scales: {
              x: {
                  stacked: true
              },
              y: {
                  stacked: true,
                  beginAtZero: true
              }
          },
          plugins: {
              datasource: {
                  url: 'workforceresult.xlsx',
                  type: 'sheet',
                  //rowMapping: 'dataset',
                  datasetLabels: 'GraphDV!A2:A7',
                  indexLabels: 'GraphDV!B1:P1',
                  data: 'GraphDV!B2:P7'
              },
              datalabels: {
                  formatter: (value, ctxdv) => {
                      return;
                  },
                  backgroundColor: function(context) {
                      return context.dataset.backgroundColor;
                  },
                  borderRadius: 4,
                  //formatter: Math.round,
                  color: 'white',
                  padding: 0
              }
          }
      }
  });
  
  /*
  /* QUARTER
  */
  
  const ctxdvqtr = document.getElementById('workforceChartDVQTR');
  new Chart(ctxdvqtr, {
      type: 'bar',
      displayColors: true,
      interaction: {
          mode: 'index',
          intersect: false
      },
      data: {
          datasets: [{
              type: 'line',
              borderWidth: 2,
              borderColor: 'rgba(68, 114, 196)',
              backgroundColor: 'rgba(68, 114, 196)',
              fill: false,
              order: 1,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          }, {
              type: 'line',
              borderWidth: 1,
              borderColor: 'rgba(68, 114, 196)',
              borderDash: [5, 5],
              fill: false,
              order: 2,
              pointRadius: 0,
              datalabels: {
                  display: false
              }
          }, {
              type: 'line',
              borderWidth: 2,
              borderColor: 'rgba(237, 125, 50)',
              backgroundColor: 'rgba(237, 125, 50)',
              fill: false,
              order: 3,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          }, {
              backgroundColor: 'rgba(165, 165, 165)',
              order: 4,
              stack: 'groupplan'
          }, {
              backgroundColor: 'rgba(255, 191, 0)',
              order: 4,
              stack: 'groupplan'
          }, {
              backgroundColor: 'rgba(91, 155, 213)',
              order: 4,
              stack: 'groupplan'
          }]
      },
      plugins: [ChartDataSource],
      options: {
          title: {
              display: true,
              fontSize: 20,
              text: 'Workforce 2026 per Quarter',
              padding: 20,
              fontColor: '#616161',
          },
          legend: {
              position: 'bottom',
              labels: {
                  usePointStyle: true
              }
          },
          tooltips: {
              mode: 'index',
              intersect: false,
              titleFontSize: 12,
              position: 'nearest'
          },
          responsive: true,
          scales: {
              x: {
                  stacked: true
              },
              y: {
                  stacked: true,
                  beginAtZero: true
              }
          },
          plugins: {
              datasource: {
                  url: 'workforceresult.xlsx',
                  type: 'sheet',
                  //rowMapping: 'dataset',
                  datasetLabels: 'GraphDV!A42:A47',
                  indexLabels: 'GraphDV!B41:F41',
                  data: 'GraphDV!B42:F47'
              },
              datalabels: {
                  formatter: (value, ctxdv) => {
                      return;
                  },
                  backgroundColor: function(context) {
                      return context.dataset.backgroundColor;
                  },
                  borderRadius: 4,
                  //formatter: Math.round,
                  color: 'white',
                  padding: 0
              }
          }
      }
  });

  /*
  /* DEMAND SCENARIO - MONTH : DELIVERY
  */

  const ctxdvDemandScenario = document.getElementById('workforceChartDVDemandScenario');
  new Chart(ctxdvDemandScenario, {
      type: 'line',
      displayColors: true,
      interaction: {
          mode: 'index',
          intersect: false
      },
      data: {
          datasets: [{
              borderWidth: 2,
              borderColor: 'rgba(68, 114, 196)',
              backgroundColor: 'rgba(68, 114, 196)',
              fill: false,
              pointRadius: 3,
              datalabels: {
                  display: false
              }
          }, {
              borderWidth: 2,
              borderColor: 'rgba(237, 125, 50)',
              backgroundColor: 'rgba(237, 125, 50)',
              fill: false,
              pointRadius: 3,
              datalabels: {
                  display: false
              }
          }, {
              borderWidth: 2,
              borderColor: 'rgba(237, 125, 50)',
              backgroundColor: 'rgba(237, 125, 50)',
              borderDash: [6, 4],
              fill: false,
              pointRadius: 2,
              pointStyle: 'rectRot',
              datalabels: {
                  display: false
              }
          }]
      },
      plugins: [ChartDataSource],
      options: {
          title: {
              display: true,
              fontSize: 14,
              text: 'Demand Scenario per Month',
              padding: 20,
              fontColor: '#616161'
          },
          legend: {
              position: 'bottom',
              labels: {
                  usePointStyle: true
              }
          },
          tooltips: {
              mode: 'index',
              intersect: false,
              titleFontSize: 10,
              position: 'nearest'
          },
          responsive: true,
          scales: {
              x: {
                  stacked: false,
                  offset: true,
                  grid: {
                      offset: true
                  }
              },
              y: {
                  stacked: false,
                  beginAtZero: false
              }
          },
          plugins: {
              datasource: {
                  url: 'workforceresult.xlsx',
                  type: 'sheet',
                  datasetLabels: 'Graph-Demand!A12:A14',
                  indexLabels: 'Graph-Demand!B11:P11',
                  data: 'Graph-Demand!B12:P14'
              },
              datalabels: {
                  display: false
              }
          }
      }
  });

  /*
  /* % PLAN DEMAND SCENARIO - QUARTER : DELIVERY
  */

  const ctxdvDemandPlanQtr = document.getElementById('workforceChartDVDemandPlanQtr');
  new Chart(ctxdvDemandPlanQtr, {
      type: 'line',
      displayColors: true,
      interaction: {
          mode: 'index',
          intersect: false
      },
      data: {
          datasets: [{
              borderWidth: 2,
              borderColor: 'rgba(237, 125, 50)',
              backgroundColor: 'rgba(237, 125, 50)',
              fill: false,
              pointRadius: 3,
              datalabels: {
                  align: 'bottom',
                  anchor: 'end',
                  offset: 3,
                  padding: 2
              }
          }, {
              borderWidth: 2,
              borderColor: 'rgba(237, 125, 50)',
              backgroundColor: 'rgba(237, 125, 50)',
              borderDash: [6, 4],
              fill: false,
              pointRadius: 2,
              pointStyle: 'rectRot',
              datalabels: {
                  align: 'top',
                  anchor: 'end',
                  offset: 3,
                  padding: 2
              }
          }]
      },
      plugins: [ChartDataSource],
      options: {
          title: {
              display: true,
              fontSize: 14,
              text: '% Plan Scenario per Quarter',
              padding: 20,
              fontColor: '#616161'
          },
          legend: {
              position: 'bottom',
              labels: {
                  usePointStyle: true
              }
          },
          tooltips: {
              mode: 'index',
              intersect: false,
              titleFontSize: 10,
              position: 'nearest'
          },
          responsive: true,
          scales: {
              x: {
                  stacked: false,
                  offset: true,
                  grid: {
                      offset: true
                  }
              },
              y: {
                  stacked: false,
                  beginAtZero: true
              }
          },
          plugins: {
              datasource: {
                  url: 'workforceresult.xlsx',
                  type: 'sheet',
                  datasetLabels: 'Graph-Demand!AA13:AA14',
                  indexLabels: 'Graph-Demand!AB1:AF1',
                  data: 'Graph-Demand!AB13:AF14'
              },
              datalabels: {
                  formatter: Math.round,
                  color: 'rgba(197, 90, 17)',
                  padding: 0
              }
          }
      }
  });
  
  /*
  /* PAYROLL
  */
  
  const ctxdvpr = document.getElementById('workforceChartDVPR');
  new Chart(ctxdvpr, {
      type: 'bar',
      displayColors: true,
      interaction: {
          mode: 'index',
          intersect: false
      },
      data: {
          datasets: [{
              type: 'line',
              borderWidth: 2,
              borderColor: 'rgba(68, 114, 196)',
              backgroundColor: 'rgba(68, 114, 196)',
              fill: false,
              order: 1,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          }, {
              type: 'line',
              borderWidth: 1,
              borderColor: 'rgba(68, 114, 196)',
              borderDash: [5, 5],
              fill: false,
              order: 2,
              pointRadius: 0,
              datalabels: {
                  display: false
              }
          }, {
              type: 'line',
              borderWidth: 2,
              borderColor: 'rgba(237, 125, 50)',
              backgroundColor: 'rgba(237, 125, 50)',
              fill: false,
              order: 3,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          }]
      },
      plugins: [ChartDataSource],
      options: {
          title: {
              display: true,
              fontSize: 20,
              text: 'Payroll',
              padding: 20,
              fontColor: '#616161',
          },
          legend: {
              position: 'bottom',
              labels: {
                  usePointStyle: true
              }
          },
          tooltips: {
              mode: 'index',
              intersect: false,
              titleFontSize: 12,
              position: 'nearest'
          },
          responsive: true,
          scales: {
              x: {
                  stacked: true
              },
              y: {
                  stacked: true,
                  beginAtZero: true
              },
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          },
          plugins: {
              datasource: {
                  url: 'workforceresult.xlsx',
                  type: 'sheet',
                  //rowMapping: 'dataset',
                  datasetLabels: 'GraphDV!A12:A14',
                  indexLabels: 'GraphDV!B11:P11',
                  data: 'GraphDV!B12:P14'
              },
              datalabels: {
                  formatter: (value, ctxdv) => {
                      return;
                  },
                  backgroundColor: function(context) {
                      return context.dataset.backgroundColor;
                  },
                  borderRadius: 4,
                  //formatter: Math.round,
                  color: 'white',
                  padding: 0
              }
          }
      }
  });
  
  /*
  /* CONTRACTOR
  */
  
  const ctxdvct = document.getElementById('workforceChartDVCT');
  new Chart(ctxdvct, {
      type: 'bar',
      displayColors: true,
      interaction: {
          mode: 'index',
          intersect: false
      },
      data: {
          datasets: [{
              type: 'line',
              borderWidth: 2,
              borderColor: 'rgba(68, 114, 196)',
              backgroundColor: 'rgba(68, 114, 196)',
              fill: false,
              order: 1,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          }, {
              type: 'line',
              borderWidth: 1,
              borderColor: 'rgba(68, 114, 196)',
              borderDash: [5, 5],
              fill: false,
              order: 2,
              pointRadius: 0,
              datalabels: {
                  display: false
              }
          }, {
              type: 'line',
              borderWidth: 2,
              borderColor: 'rgba(237, 125, 50)',
              backgroundColor: 'rgba(237, 125, 50)',
              fill: false,
              order: 3,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          }]
      },
      plugins: [ChartDataSource],
      options: {
          title: {
              display: true,
              fontSize: 20,
              text: 'Contractor',
              padding: 20,
              fontColor: '#616161',
          },
          legend: {
              position: 'bottom',
              labels: {
                  usePointStyle: true
              }
          },
          tooltips: {
              mode: 'index',
              intersect: false,
              titleFontSize: 12,
              position: 'nearest'
          },
          responsive: true,
          scales: {
              x: {
                  stacked: true
              },
              y: {
                  stacked: true,
                  beginAtZero: true
              },
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          },
          plugins: {
              datasource: {
                  url: 'workforceresult.xlsx',
                  type: 'sheet',
                  //rowMapping: 'dataset',
                  datasetLabels: 'GraphDV!A22:A24',
                  indexLabels: 'GraphDV!B21:P21',
                  data: 'GraphDV!B22:P24'
              },
              datalabels: {
                  formatter: (value, ctxdv) => {
                      return;
                  },
                  backgroundColor: function(context) {
                      return context.dataset.backgroundColor;
                  },
                  borderRadius: 4,
                  //formatter: Math.round,
                  color: 'white',
                  padding: 0
              }
          }
      }
  });
  
  /*
  /* OUTSOURCE
  */
  
  const ctxdvos = document.getElementById('workforceChartDVOS');
  new Chart(ctxdvos, {
      type: 'bar',
      displayColors: true,
      interaction: {
          mode: 'index',
          intersect: false
      },
      data: {
          datasets: [{
              type: 'line',
              borderWidth: 2,
              borderColor: 'rgba(68, 114, 196)',
              backgroundColor: 'rgba(68, 114, 196)',
              fill: false,
              order: 1,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          }, {
              type: 'line',
              borderWidth: 1,
              borderColor: 'rgba(68, 114, 196)',
              borderDash: [5, 5],
              fill: false,
              order: 2,
              pointRadius: 0,
              datalabels: {
                  display: false
              }
          }, {
              type: 'line',
              borderWidth: 2,
              borderColor: 'rgba(237, 125, 50)',
              backgroundColor: 'rgba(237, 125, 50)',
              fill: false,
              order: 3,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          }]
      },
      plugins: [ChartDataSource],
      options: {
          title: {
              display: true,
              fontSize: 20,
              text: 'Outsource',
              padding: 20,
              fontColor: '#616161',
          },
          legend: {
              position: 'bottom',
              labels: {
                  usePointStyle: true
              }
          },
          tooltips: {
              mode: 'index',
              intersect: false,
              titleFontSize: 12,
              position: 'nearest'
          },
          responsive: true,
          scales: {
              x: {
                  stacked: true
              },
              y: {
                  stacked: true,
                  beginAtZero: true
              },
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          },
          plugins: {
              datasource: {
                  url: 'workforceresult.xlsx',
                  type: 'sheet',
                  //rowMapping: 'dataset',
                  datasetLabels: 'GraphDV!A32:A34',
                  indexLabels: 'GraphDV!B31:P31',
                  data: 'GraphDV!B32:P34'
              },
              datalabels: {
                  formatter: (value, ctxdv) => {
                      return;
                  },
                  backgroundColor: function(context) {
                      return context.dataset.backgroundColor;
                  },
                  borderRadius: 4,
                  //formatter: Math.round,
                  color: 'white',
                  padding: 0
              }
          }
      }
  });
  
  /*
  /* QUARTER : CPS
  */
  const ctxdvqtrcps = document.getElementById('workforceChartCPSQTR');
  new Chart(ctxdvqtrcps, {
      type: 'bar',
      displayColors: true,
      interaction: {
          mode: 'index',
          intersect: false
      },
      data: {
          datasets: [{
              type: 'line',
              borderWidth: 2,
              borderColor: 'rgba(68, 114, 196)',
              backgroundColor: 'rgba(68, 114, 196)',
              fill: false,
              order: 1,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          }, {
              type: 'line',
              borderWidth: 1,
              borderColor: 'rgba(68, 114, 196)',
              borderDash: [5, 5],
              fill: false,
              order: 2,
              pointRadius: 0,
              datalabels: {
                  display: false
              }
          }, {
              type: 'line',
              borderWidth: 2,
              borderColor: 'rgba(237, 125, 50)',
              backgroundColor: 'rgba(237, 125, 50)',
              fill: false,
              order: 3,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          }, {
              backgroundColor: 'rgba(165, 165, 165)',
              order: 4,
              stack: 'groupplan'
          }, {
              backgroundColor: 'rgba(255, 191, 0)',
              order: 4,
              stack: 'groupplan'
          }, {
              backgroundColor: 'rgba(91, 155, 213)',
              order: 4,
              stack: 'groupplan'
          }]
      },
      plugins: [ChartDataSource],
      options: {
          title: {
              display: true,
              fontSize: 14,
              text: 'CPS',
              padding: 20,
              fontColor: '#616161',
          },
          legend: {
              position: 'bottom',
              labels: {
                  usePointStyle: true
              }
          },
          tooltips: {
              mode: 'index',
              intersect: false,
              titleFontSize: 10,
              position: 'nearest'
          },
          responsive: true,
          scales: {
              x: {
                  stacked: true
              },
              y: {
                  stacked: true,
                  beginAtZero: true
              }
          },
          plugins: {
              datasource: {
                  url: 'workforceresult.xlsx',
                  type: 'sheet',
                  //rowMapping: 'dataset',
                  datasetLabels: 'GraphCPS!A42:A47',
                  indexLabels: 'GraphCPS!B41:F41',
                  data: 'GraphCPS!B42:F47'
              },
              datalabels: {
                  formatter: (value, ctxdv) => {
                      return;
                  },
                  backgroundColor: function(context) {
                      return context.dataset.backgroundColor;
                  },
                  borderRadius: 4,
                  //formatter: Math.round,
                  color: 'white',
                  padding: 0
              }
          }
      }
  });
  
  /*
  /* QUARTER : PSE
  */
  const ctxdvqtrpse = document.getElementById('workforceChartPSEQTR');
  new Chart(ctxdvqtrpse, {
      type: 'bar',
      displayColors: true,
      interaction: {
          mode: 'index',
          intersect: false
      },
      data: {
          datasets: [{
              type: 'line',
              borderWidth: 2,
              borderColor: 'rgba(68, 114, 196)',
              backgroundColor: 'rgba(68, 114, 196)',
              fill: false,
              order: 1,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          }, {
              type: 'line',
              borderWidth: 1,
              borderColor: 'rgba(68, 114, 196)',
              borderDash: [5, 5],
              fill: false,
              order: 2,
              pointRadius: 0,
              datalabels: {
                  display: false
              }
          }, {
              type: 'line',
              borderWidth: 2,
              borderColor: 'rgba(237, 125, 50)',
              backgroundColor: 'rgba(237, 125, 50)',
              fill: false,
              order: 3,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          }, {
              backgroundColor: 'rgba(165, 165, 165)',
              order: 4,
              stack: 'groupplan'
          }, {
              backgroundColor: 'rgba(255, 191, 0)',
              order: 4,
              stack: 'groupplan'
          }, {
              backgroundColor: 'rgba(91, 155, 213)',
              order: 4,
              stack: 'groupplan'
          }]
      },
      plugins: [ChartDataSource],
      options: {
          title: {
              display: true,
              fontSize: 14,
              text: 'PSE',
              padding: 20,
              fontColor: '#616161',
          },
          legend: {
              position: 'bottom',
              labels: {
                  usePointStyle: true
              }
          },
          tooltips: {
              mode: 'index',
              intersect: false,
              titleFontSize: 10,
              position: 'nearest'
          },
          responsive: true,
          scales: {
              x: {
                  stacked: true
              },
              y: {
                  stacked: true,
                  beginAtZero: true
              }
          },
          plugins: {
              datasource: {
                  url: 'workforceresult.xlsx',
                  type: 'sheet',
                  //rowMapping: 'dataset',
                  datasetLabels: 'GraphPSE!A42:A47',
                  indexLabels: 'GraphPSE!B41:F41',
                  data: 'GraphPSE!B42:F47'
              },
              datalabels: {
                  formatter: (value, ctxdv) => {
                      return;
                  },
                  backgroundColor: function(context) {
                      return context.dataset.backgroundColor;
                  },
                  borderRadius: 4,
                  //formatter: Math.round,
                  color: 'white',
                  padding: 0
              }
          }
      }
  });
  
  /*
  /* QUARTER : SD
  */
  const ctxdvqtrsd = document.getElementById('workforceChartSDQTR');
  new Chart(ctxdvqtrsd, {
      type: 'bar',
      displayColors: true,
      interaction: {
          mode: 'index',
          intersect: false
      },
      data: {
          datasets: [{
              type: 'line',
              borderWidth: 2,
              borderColor: 'rgba(68, 114, 196)',
              backgroundColor: 'rgba(68, 114, 196)',
              fill: false,
              order: 1,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          }, {
              type: 'line',
              borderWidth: 1,
              borderColor: 'rgba(68, 114, 196)',
              borderDash: [5, 5],
              fill: false,
              order: 2,
              pointRadius: 0,
              datalabels: {
                  display: false
              }
          }, {
              type: 'line',
              borderWidth: 2,
              borderColor: 'rgba(237, 125, 50)',
              backgroundColor: 'rgba(237, 125, 50)',
              fill: false,
              order: 3,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          }, {
              backgroundColor: 'rgba(165, 165, 165)',
              order: 4,
              stack: 'groupplan'
          }, {
              backgroundColor: 'rgba(255, 191, 0)',
              order: 4,
              stack: 'groupplan'
          }, {
              backgroundColor: 'rgba(91, 155, 213)',
              order: 4,
              stack: 'groupplan'
          }]
      },
      plugins: [ChartDataSource],
      options: {
          title: {
              display: true,
              fontSize: 14,
              text: 'SD',
              padding: 20,
              fontColor: '#616161',
          },
          legend: {
              position: 'bottom',
              labels: {
                  usePointStyle: true
              }
          },
          tooltips: {
              mode: 'index',
              intersect: false,
              titleFontSize: 10,
              position: 'nearest'
          },
          responsive: true,
          scales: {
              x: {
                  stacked: true
              },
              y: {
                  stacked: true,
                  beginAtZero: true
              }
          },
          plugins: {
              datasource: {
                  url: 'workforceresult.xlsx',
                  type: 'sheet',
                  //rowMapping: 'dataset',
                  datasetLabels: 'GraphSD!A42:A47',
                  indexLabels: 'GraphSD!B41:F41',
                  data: 'GraphSD!B42:F47'
              },
              datalabels: {
                  formatter: (value, ctxdv) => {
                      return;
                  },
                  backgroundColor: function(context) {
                      return context.dataset.backgroundColor;
                  },
                  borderRadius: 4,
                  //formatter: Math.round,
                  color: 'white',
                  padding: 0
              }
          }
      }
  });
  
  /*
  /* Available - Month
  */
  const ctxdvavai = document.getElementById('workforceChartDVAvai');
  new Chart(ctxdvavai, {
      type: 'bar',
      displayColors: true,
      interaction: {
          mode: 'index',
          intersect: false
      },
      data: {
          datasets: [{
              type: 'line',
              borderWidth: 2,
              borderColor: 'rgba(112, 173, 71)',
              fill: false,
              order: 1,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          }]
      },
      plugins: [ChartDataSource],
      options: {
          title: {
              display: true,
              fontSize: 14,
              text: 'Available per Month',
              padding: 20,
              fontColor: '#616161',
          },
          legend: {
              position: 'bottom',
              labels: {
                  usePointStyle: true
              }
          },
          tooltips: {
              mode: 'index',
              intersect: false,
              titleFontSize: 10,
              position: 'nearest'
          },
          responsive: true,
          scales: {
              x: {
                  stacked: true
              },
              y: {
                  stacked: true,
                  beginAtZero: true
              },
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          },
          plugins: {
              datasource: {
                  url: 'workforceresult.xlsx',
                  type: 'sheet',
                  //rowMapping: 'dataset',
                  datasetLabels: 'GraphDV!A153:A153',
                  indexLabels: 'GraphDV!B151:P151',
                  data: 'GraphDV!B153:P153'
              },
              datalabels: {
                  formatter: (value, ctxdv) => {
                      return;
                  },
                  backgroundColor: function(context) {
                      return context.dataset.backgroundColor;
                  },
                  borderRadius: 4,
                  formatter: Math.round,
                  color: 'rgba(112, 173, 71)',
                  padding: 0
              }
          }
      }
  });
  
  /*
  /* % PLAN - QTR
  */
  const ctxdvplanqtr = document.getElementById('workforceChartDVPlanQtr');
  new Chart(ctxdvplanqtr, {
      type: 'bar',
      displayColors: true,
      interaction: {
          mode: 'index',
          intersect: false
      },
      data: {
          datasets: [{
              type: 'line',
              borderWidth: 2,
              borderColor: 'rgba(197, 90, 17)',
              fill: false,
              order: 1,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          }]
      },
      plugins: [ChartDataSource],
      options: {
          title: {
              display: true,
              fontSize: 14,
              text: '% Plan per Quarter',
              padding: 20,
              fontColor: '#616161',
          },
          legend: {
              position: 'bottom',
              labels: {
                  usePointStyle: true
              }
          },
          tooltips: {
              mode: 'index',
              intersect: false,
              titleFontSize: 10,
              position: 'nearest'
          },
          responsive: true,
          scales: {
              x: {
                  stacked: true
              },
              y: {
                  stacked: true,
                  beginAtZero: true
              },
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          },
          plugins: {
              datasource: {
                  url: 'workforceresult.xlsx',
                  type: 'sheet',
                  //rowMapping: 'dataset',
                  datasetLabels: 'GraphDV!A156:A156',
                  indexLabels: 'GraphDV!B155:F155',
                  data: 'GraphDV!B156:F156'
              },
              datalabels: {
                  formatter: (value, ctxdv) => {
                      return;
                  },
                  backgroundColor: function(context) {
                      return context.dataset.backgroundColor;
                  },
                  borderRadius: 4,
                  formatter: Math.round,
                  color: 'rgba(197, 90, 17)',
                  padding: 0
              }
          }
      }
  });
  
  /*
  /* % PLAN - QTR : CPS
  */
  const ctxdvplanqtrcps = document.getElementById('workforceChartCPSPlanQtr');
  new Chart(ctxdvplanqtrcps, {
      type: 'bar',
      displayColors: true,
      interaction: {
          mode: 'index',
          intersect: false
      },
      data: {
          datasets: [{
              type: 'line',
              borderWidth: 2,
              borderColor: 'rgba(197, 90, 17)',
              fill: false,
              order: 1,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          }]
      },
      plugins: [ChartDataSource],
      options: {
          title: {
              display: true,
              fontSize: 14,
              text: '% CPS Plan',
              padding: 20,
              fontColor: '#616161',
          },
          legend: {
              position: 'bottom',
              labels: {
                  usePointStyle: true
              }
          },
          tooltips: {
              mode: 'index',
              intersect: false,
              titleFontSize: 10,
              position: 'nearest'
          },
          responsive: true,
          scales: {
              x: {
                  stacked: true
              },
              y: {
                  stacked: true,
                  beginAtZero: true
              },
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          },
          plugins: {
              datasource: {
                  url: 'workforceresult.xlsx',
                  type: 'sheet',
                  //rowMapping: 'dataset',
                  datasetLabels: 'GraphCPS!A156:A156',
                  indexLabels: 'GraphCPS!B155:F155',
                  data: 'GraphCPS!B156:F156'
              },
              datalabels: {
                  formatter: (value, ctxdv) => {
                      return;
                  },
                  backgroundColor: function(context) {
                      return context.dataset.backgroundColor;
                  },
                  borderRadius: 4,
                  formatter: Math.round,
                  color: 'rgba(197, 90, 17)',
                  padding: 0
              }
          }
      }
  });
  
  /*
  /* % PLAN - QTR : PSE
  */
  const ctxdvplanqtrpse = document.getElementById('workforceChartPSEPlanQtr');
  new Chart(ctxdvplanqtrpse, {
      type: 'bar',
      displayColors: true,
      interaction: {
          mode: 'index',
          intersect: false
      },
      data: {
          datasets: [{
              type: 'line',
              borderWidth: 2,
              borderColor: 'rgba(197, 90, 17)',
              fill: false,
              order: 1,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          }]
      },
      plugins: [ChartDataSource],
      options: {
          title: {
              display: true,
              fontSize: 14,
              text: '% PSE Plan',
              padding: 20,
              fontColor: '#616161',
          },
          legend: {
              position: 'bottom',
              labels: {
                  usePointStyle: true
              }
          },
          tooltips: {
              mode: 'index',
              intersect: false,
              titleFontSize: 10,
              position: 'nearest'
          },
          responsive: true,
          scales: {
              x: {
                  stacked: true
              },
              y: {
                  stacked: true,
                  beginAtZero: true
              },
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          },
          plugins: {
              datasource: {
                  url: 'workforceresult.xlsx',
                  type: 'sheet',
                  //rowMapping: 'dataset',
                  datasetLabels: 'GraphPSE!A156:A156',
                  indexLabels: 'GraphPSE!B155:F155',
                  data: 'GraphPSE!B156:F156'
              },
              datalabels: {
                  formatter: (value, ctxdv) => {
                      return;
                  },
                  backgroundColor: function(context) {
                      return context.dataset.backgroundColor;
                  },
                  borderRadius: 4,
                  formatter: Math.round,
                  color: 'rgba(197, 90, 17)',
                  padding: 0
              }
          }
      }
  });
  
  /*
  /* % PLAN - QTR : SD
  */
  const ctxdvplanqtrsd = document.getElementById('workforceChartSDPlanQtr');
  new Chart(ctxdvplanqtrsd, {
      type: 'bar',
      displayColors: true,
      interaction: {
          mode: 'index',
          intersect: false
      },
      data: {
          datasets: [{
              type: 'line',
              borderWidth: 2,
              borderColor: 'rgba(197, 90, 17)',
              fill: false,
              order: 1,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          }]
      },
      plugins: [ChartDataSource],
      options: {
          title: {
              display: true,
              fontSize: 14,
              text: '% SD Plan',
              padding: 20,
              fontColor: '#616161',
          },
          legend: {
              position: 'bottom',
              labels: {
                  usePointStyle: true
              }
          },
          tooltips: {
              mode: 'index',
              intersect: false,
              titleFontSize: 10,
              position: 'nearest'
          },
          responsive: true,
          scales: {
              x: {
                  stacked: true
              },
              y: {
                  stacked: true,
                  beginAtZero: true
              },
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          },
          plugins: {
              datasource: {
                  url: 'workforceresult.xlsx',
                  type: 'sheet',
                  //rowMapping: 'dataset',
                  datasetLabels: 'GraphSD!A156:A156',
                  indexLabels: 'GraphSD!B155:F155',
                  data: 'GraphSD!B156:F156'
              },
              datalabels: {
                  formatter: (value, ctxdv) => {
                      return;
                  },
                  backgroundColor: function(context) {
                      return context.dataset.backgroundColor;
                  },
                  borderRadius: 4,
                  formatter: Math.round,
                  color: 'rgba(197, 90, 17)',
                  padding: 0
              }
          }
      }
  });
  
  
  /*
  /* PLAN vs ACTUAL
  */
  
  const ctxdvpa = document.getElementById('workforceChartDVPlanActual');
  new Chart(ctxdvpa, {
      type: 'bar',
      displayColors: true,
      interaction: {
          mode: 'index',
          intersect: false
      },
      data: {
          datasets: [{
              type: 'line',
              borderWidth: 2,
              borderColor: 'rgba(68, 114, 196)',
              backgroundColor: 'rgba(68, 114, 196)',
              fill: false,
              order: 1,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          }, {
              type: 'line',
              borderWidth: 2,
              borderColor: 'rgba(237, 125, 50)',
              backgroundColor: 'rgba(237, 125, 50)',
              fill: false,
              order: 3,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          }, {
              type: 'line',
              borderWidth: 2,
              borderColor: 'rgba(6, 176, 80)',
              backgroundColor: 'rgba(6, 176, 80)',
              fill: false,
              order: 3,
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          }, {
              type: 'line',
              borderWidth: 1,
              borderColor: 'rgba(132, 60, 11)',
              backgroundColor: 'rgba(132, 60, 11)',
              borderDash: [5, 5],
              fill: false,
              order: 2,
              pointRadius: 0,
              color: 'red',
              datalabels: {
                  align: 'end',
                  anchor: 'end',
                  padding: 4
              }
          }]
      },
      plugins: [ChartDataSource],
      options: {
          title: {
              display: true,
              fontSize: 20,
              text: 'Utilization vs Workforce 2026',
              padding: 20,
              fontColor: '#616161',
          },
          legend: {
              position: 'bottom',
              labels: {
                  usePointStyle: true
              }
          },
          tooltips: {
              mode: 'index',
              intersect: false,
              titleFontSize: 12,
              position: 'nearest'
          },
          responsive: true,
          scales: {
              x: {
                  stacked: true
              },
              y: {
                  stacked: true,
                  beginAtZero: true
              }
          },
          plugins: {
              datasource: {
                  url: 'workforceresult.xlsx',
                  type: 'sheet',
                  //rowMapping: 'dataset',
                  datasetLabels: 'GraphDV!A162:A165',
                  indexLabels: 'GraphDV!B161:P161',
                  data: 'GraphDV!B162:P165'
              },
              datalabels: {
                  formatter: (value, ctxdv) => {
                      return;
                  },
                  backgroundColor: function(context) {
                      return context.dataset.backgroundColor;
                  },
                  borderRadius: 4,
                  formatter: Math.round,
                  color: 'white',
                  padding: 0
              }
          }
      }
  });
  
}

function showLoadError(error) {
  console.error('Chart.js 4 dashboard failed:', error);
  const message = document.createElement('p');
  message.setAttribute('role', 'alert');
  message.style.color = '#b00020';
  message.style.fontFamily = 'sans-serif';
  message.textContent = `Unable to render dashboard charts: ${error.message}`;
  document.body.prepend(message);
}

async function initializeDashboard() {
  try {
    assertBrowserDependency('Chart.js', NativeChart);
    assertBrowserDependency('SheetJS', globalThis.XLSX);
    assertBrowserDependency('chartjs-plugin-datalabels', globalThis.ChartDataLabels);

    NativeChart.defaults.color = '#0000008A';
    NativeChart.defaults.font.family = "'MindSans', sans-serif";
    NativeChart.defaults.font.size = 10;
    NativeChart.register(globalThis.ChartDataLabels);

    const workbook = await loadWorkbook(WORKBOOK_URL);
    renderAllCharts(workbook);
  } catch (error) {
    showLoadError(error);
  }
}

initializeDashboard();
