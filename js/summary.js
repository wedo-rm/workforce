const SUMMARY_WORKBOOK_URL = 'workforceresult.xlsx';
const SUMMARY_SHEET_NAME = 'Summary';

const normalizeText = (value) => String(value ?? '').trim();

function normalizePage(value) {
  return normalizeText(value)
    .toLowerCase()
    .replace(/\.md$/, '')
    .replace(/-v4(?:-full|-summary)?$/, '');
}

function isEnabled(value) {
  const normalized = normalizeText(value).toLowerCase();
  return !['0', 'false', 'no', 'off', 'disabled'].includes(normalized);
}

function orderValue(value) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : Number.MAX_SAFE_INTEGER;
}

function safeHref(value) {
  const href = normalizeText(value);
  if (!href || /^(?:javascript|data|vbscript):/i.test(href)) return '';
  return href;
}

function restoreEscapedBrackets(value) {
  return value.replaceAll('\uE000', '[').replaceAll('\uE001', ']');
}

function appendPlainText(parent, value) {
  const lines = restoreEscapedBrackets(String(value ?? '')).split(/\r?\n/);
  lines.forEach((line, index) => {
    if (index > 0) parent.append(document.createElement('br'));
    if (line) parent.append(document.createTextNode(line));
  });
}

function appendMarkdown(parent, value) {
  const protectedText = String(value ?? '')
    .replace(/\\\[/g, '\uE000')
    .replace(/\\\]/g, '\uE001');
  const tokenPattern = /(\*\*([\s\S]+?)\*\*|\[([^\]]+)\]\(([^)]+)\)|\[([^\]]+)\]\{(plan|available|avai|shortage)\})/g;
  let cursor = 0;
  let match;

  while ((match = tokenPattern.exec(protectedText)) !== null) {
    if (match.index > cursor) {
      appendPlainText(parent, protectedText.slice(cursor, match.index));
    }

    if (match[2] !== undefined) {
      const strong = document.createElement('strong');
      appendMarkdown(strong, match[2]);
      parent.append(strong);
    } else if (match[3] !== undefined) {
      const href = safeHref(match[4]);
      const label = restoreEscapedBrackets(match[3]);
      if (!href) {
        parent.append(document.createTextNode(label));
        cursor = tokenPattern.lastIndex;
        continue;
      }
      const link = document.createElement('a');
      link.href = href;
      link.textContent = label;
      parent.append(link);
    } else {
      const styled = document.createElement('span');
      styled.className = {
        plan: 'text-plan',
        available: 'text-avai',
        avai: 'text-avai',
        shortage: 'text-shortage'
      }[match[6]] || '';
      styled.textContent = restoreEscapedBrackets(match[5]);
      parent.append(styled);
    }
    cursor = tokenPattern.lastIndex;
  }

  if (cursor < protectedText.length) {
    appendPlainText(parent, protectedText.slice(cursor));
  }
}

function noteTokens(row) {
  return normalizeText(row.note)
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
}

function hasNote(row, token) {
  return noteTokens(row).includes(token);
}

function addNoteClasses(element, row) {
  for (const token of noteTokens(row)) {
    if (/^[a-z0-9-]+$/.test(token)) element.classList.add(`summary-${token}`);
  }
}

function fieldClass(field, row) {
  if (field !== 'highlight') return '';
  const style = normalizeText(row.highlight_style).toLowerCase();
  return {
    plan: 'text-plan',
    available: 'text-avai',
    avai: 'text-avai',
    shortage: 'text-shortage'
  }[style] || '';
}

function appendField(parent, row, field) {
  const value = normalizeText(row[field]);
  if (!value) return false;

  const wrapper = document.createElement('span');
  const className = fieldClass(field, row);
  if (className) wrapper.classList.add(className);

  const href = safeHref(row.href);
  const linkTarget = normalizeText(row.link_target).toLowerCase();
  const wholeFieldIsLinked = href && (linkTarget === field || linkTarget === 'all');

  if (wholeFieldIsLinked) {
    const link = document.createElement('a');
    link.href = href;
    link.textContent = value;
    wrapper.append(link);
  } else {
    appendMarkdown(wrapper, value);
  }

  parent.append(wrapper);
  return true;
}

function appendInlineFields(parent, row, selectedFields = null) {
  let hasContent = false;
  const fields = selectedFields || ['label', 'data', 'highlight'];
  if (!selectedFields && normalizeText(row.type).toLowerCase() === 'text-inline') fields.push('note');

  for (const field of fields) {
    if (!normalizeText(row[field])) continue;
    if (hasContent) parent.append(document.createTextNode(' '));
    appendField(parent, row, field);
    hasContent = true;
  }
}

function appendBullet(parent, symbol) {
  parent.append(document.createTextNode(`${symbol}\u2002`));
}

function isGridItem(row) {
  return ['label-data', 'grid-item'].includes(normalizeText(row.type).toLowerCase());
}

function makeGridItem(row) {
  const gridRow = document.createElement('div');
  gridRow.className = 'grid-row';
  addNoteClasses(gridRow, row);

  const fieldOrder = hasNote(row, 'percent-middle')
    ? ['label', 'highlight', 'data']
    : ['label', 'data', 'highlight'];
  const populatedFields = fieldOrder
    .filter((field) => normalizeText(row[field]));
  gridRow.classList.add(`grid-row--${populatedFields.length}-column`);

  for (const field of populatedFields) {
    const cell = document.createElement('span');
    cell.className = `grid-cell grid-cell--${field}`;
    appendField(cell, row, field);
    gridRow.append(cell);
  }
  return gridRow;
}

function appendStandaloneChild(parent, row) {
  const container = document.createElement('div');
  container.className = 'chartsubbodycontainer';
  addNoteClasses(container, row);
  const suppressBullet = hasNote(row, 'no-bullet') || hasNote(row, 'methodology-item');

  if (normalizeText(row.type).toLowerCase() === 'text-inline') {
    container.classList.add('chartsubbodycontainer--label-data');
    const title = document.createElement('div');
    title.className = 'chartsubbodytitle';
    if (!suppressBullet) appendBullet(title, '\u2022');
    appendInlineFields(title, row, ['label']);
    container.append(title);

    const data = document.createElement('div');
    data.className = 'chartsubbodydata';
    appendInlineFields(data, row, ['data', 'highlight']);
    container.append(data);
    parent.append(container);
    return;
  }

  if (!suppressBullet) {
    container.replaceChildren();
    container.classList.add('chartsubbodycontainer--standalone');

    const bullet = document.createElement('span');
    bullet.className = 'summary-bullet';
    appendBullet(bullet, '\u2022');

    const content = document.createElement('span');
    content.className = 'chartsubbodytext';
    appendInlineFields(content, row);

    container.append(bullet, content);
  } else {
    appendInlineFields(container, row);
  }
  parent.append(container);
}

function appendGridBlock(parent, titleRow, itemRows) {
  const container = document.createElement('div');
  container.className = 'chartsubbodycontainer chartsubbodycontainer--grid-block';
  if (!titleRow) container.classList.add('chartsubbodycontainer--grid-only');

  if (titleRow) {
    const title = document.createElement('div');
    title.className = 'chartsubbodytitle';
    appendBullet(title, '\u2022');
    appendInlineFields(title, titleRow);
    container.append(title);
  }

  const data = document.createElement('div');
  data.className = 'chartsubbodydata';
  if (!titleRow) data.classList.add('chartsubbodydata--grid-only');
  for (const item of itemRows) data.append(makeGridItem(item));
  container.append(data);
  parent.append(container);
}

function renderChildren(parent, rows) {
  let index = 0;
  while (index < rows.length) {
    const row = rows[index];
    const nextRow = rows[index + 1];
    const explicitGridTitle = normalizeText(row.type).toLowerCase() === 'grid-title';
    const implicitGridTitle = !isGridItem(row) && nextRow && isGridItem(nextRow);

    if (explicitGridTitle || implicitGridTitle) {
      const items = [];
      index += 1;
      while (index < rows.length && isGridItem(rows[index])) {
        items.push(rows[index]);
        index += 1;
      }
      appendGridBlock(parent, row, items);
      continue;
    }

    if (isGridItem(row)) {
      const items = [];
      while (index < rows.length && isGridItem(rows[index])) {
        items.push(rows[index]);
        index += 1;
      }
      appendGridBlock(parent, null, items);
      continue;
    }

    appendStandaloneChild(parent, row);
    index += 1;
  }
}

function renderSummary(container, rows) {
  container.replaceChildren();

  const header = document.createElement('div');
  header.className = container.dataset.summaryHeaderClass || 'chartheaderleft';
  header.textContent = rows.find((row) => normalizeText(row.summary_title))?.summary_title || 'Summary';
  container.append(header);

  const groups = new Map();
  for (const row of rows) {
    const key = normalizeText(row.group_order) || '1';
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(row);
  }

  const sortedGroups = [...groups.entries()].sort((a, b) => {
    return orderValue(a[0]) - orderValue(b[0]);
  });

  for (const [, groupRows] of sortedGroups) {
    groupRows.sort((a, b) => orderValue(a.item_order) - orderValue(b.item_order));
    const mainRows = groupRows.filter((row) => Number(row.level) === 1);
    const childRows = groupRows.filter((row) => Number(row.level) !== 1);

    for (const row of mainRows) {
      const body = document.createElement('div');
      body.className = 'chartbody chartbody--with-bullet';

      const bullet = document.createElement('span');
      bullet.className = 'summary-bullet';
      appendBullet(bullet, '\u2023');

      const content = document.createElement('span');
      content.className = 'chartbodycontent';
      appendInlineFields(content, row);

      body.append(bullet, content);
      container.append(body);
    }

    if (childRows.length) {
      const subbody = document.createElement('div');
      subbody.className = 'chartsubbody';
      if (childRows.some((row) => hasNote(row, 'methodology-item'))) {
        subbody.classList.add('summary-methodology-section');
      }
      renderChildren(subbody, childRows);
      container.append(subbody);
    }
  }
}

async function loadSummaryRows() {
  const workbookUrl = new URL(SUMMARY_WORKBOOK_URL, window.location.href).href;
  const sheetJsUrl = [...document.scripts]
    .map((script) => script.src)
    .find((src) => /xlsx(?:\.full)?\.min\.js(?:\?|$)/.test(src))
    || 'https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js';
  const workerSource = `
    self.onmessage = async ({ data }) => {
      try {
        importScripts(data.sheetJsUrl);
        const response = await fetch(data.workbookUrl, { cache: 'no-store' });
        if (!response.ok) throw new Error('Unable to load workbook (' + response.status + ')');
        const workbook = XLSX.read(await response.arrayBuffer(), { type: 'array' });
        const worksheet = workbook.Sheets[data.sheetName];
        if (!worksheet) throw new Error('Worksheet "' + data.sheetName + '" was not found.');
        const rows = XLSX.utils.sheet_to_json(worksheet, { defval: '', raw: false });
        self.postMessage({ ok: true, rows });
      } catch (error) {
        self.postMessage({ ok: false, error: error instanceof Error ? error.message : String(error) });
      }
    };
  `;
  const workerUrl = URL.createObjectURL(new Blob([workerSource], { type: 'text/javascript' }));
  const worker = new Worker(workerUrl);

  try {
    return await new Promise((resolve, reject) => {
      worker.onmessage = ({ data }) => data.ok
        ? resolve(data.rows)
        : reject(new Error(data.error));
      worker.onerror = (event) => reject(new Error(event.message || 'Summary worker failed.'));
      worker.postMessage({ workbookUrl, sheetJsUrl, sheetName: SUMMARY_SHEET_NAME });
    });
  } finally {
    worker.terminate();
    URL.revokeObjectURL(workerUrl);
  }
}

async function initializeSummaries() {
  const containers = [...document.querySelectorAll('[data-summary-page]')];
  if (!containers.length) return;

  try {
    const allRows = await loadSummaryRows();
    for (const container of containers) {
      const page = normalizePage(container.dataset.summaryPage);
      const rows = allRows
        .filter((row) => normalizePage(row.page) === page && isEnabled(row.enabled))
        .sort((a, b) => {
          return orderValue(a.group_order) - orderValue(b.group_order)
            || orderValue(a.item_order) - orderValue(b.item_order);
        });

      if (!rows.length) {
        throw new Error(`No enabled Summary rows were found for page "${page}".`);
      }
      renderSummary(container, rows);
    }
  } catch (error) {
    console.error('Summary renderer:', error);
    for (const container of containers) {
      container.replaceChildren();
      const message = document.createElement('div');
      message.className = container.dataset.summaryHeaderClass || 'chartheaderleft';
      message.textContent = 'Summary data could not be loaded.';
      container.append(message);
    }
  }
}

initializeSummaries();
