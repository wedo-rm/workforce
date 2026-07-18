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

function appendMarkdownLinks(parent, value) {
  const protectedText = String(value ?? '')
    .replace(/\\\[/g, '\uE000')
    .replace(/\\\]/g, '\uE001');
  const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  let cursor = 0;
  let match;

  while ((match = linkPattern.exec(protectedText)) !== null) {
    if (match.index > cursor) {
      parent.append(document.createTextNode(
        restoreEscapedBrackets(protectedText.slice(cursor, match.index))
      ));
    }

    const href = safeHref(match[2]);
    const label = restoreEscapedBrackets(match[1]);
    if (href) {
      const link = document.createElement('a');
      link.href = href;
      link.textContent = label;
      parent.append(link);
    } else {
      parent.append(document.createTextNode(label));
    }
    cursor = linkPattern.lastIndex;
  }

  if (cursor < protectedText.length) {
    parent.append(document.createTextNode(
      restoreEscapedBrackets(protectedText.slice(cursor))
    ));
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
    appendMarkdownLinks(wrapper, value);
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

  const populatedFields = ['label', 'data', 'highlight']
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

  if (normalizeText(row.type).toLowerCase() === 'text-inline') {
    const title = document.createElement('div');
    title.className = 'chartsubbodytitle';
    appendBullet(title, '\u2022');
    appendInlineFields(title, row, ['label']);
    container.append(title);

    const data = document.createElement('div');
    data.className = 'chartsubbodydata';
    appendInlineFields(data, row, ['data', 'highlight', 'note']);
    container.append(data);
    parent.append(container);
    return;
  }

  appendBullet(container, '\u2022');
  appendInlineFields(container, row);
  parent.append(container);
}

function appendGridBlock(parent, titleRow, itemRows) {
  const container = document.createElement('div');
  container.className = 'chartsubbodycontainer';

  if (titleRow) {
    const title = document.createElement('div');
    title.className = 'chartsubbodytitle';
    appendBullet(title, '\u2022');
    appendInlineFields(title, titleRow);
    container.append(title);
  }

  const data = document.createElement('div');
  data.className = 'chartsubbodydata';
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
      body.className = 'chartbody';
      appendBullet(body, '\u2023');
      appendInlineFields(body, row);
      container.append(body);
    }

    if (childRows.length) {
      const subbody = document.createElement('div');
      subbody.className = 'chartsubbody';
      renderChildren(subbody, childRows);
      container.append(subbody);
    }
  }
}

async function loadSummaryRows() {
  const response = await fetch(SUMMARY_WORKBOOK_URL, { cache: 'no-store' });
  if (!response.ok) throw new Error(`Unable to load ${SUMMARY_WORKBOOK_URL} (${response.status})`);

  const workbook = XLSX.read(await response.arrayBuffer(), { type: 'array' });
  const worksheet = workbook.Sheets[SUMMARY_SHEET_NAME];
  if (!worksheet) throw new Error(`Worksheet "${SUMMARY_SHEET_NAME}" was not found.`);

  return XLSX.utils.sheet_to_json(worksheet, { defval: '', raw: false });
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
