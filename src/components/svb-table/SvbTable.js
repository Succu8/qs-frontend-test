import './styles/svb-table.scss'

export default class SvbTable {

  _activeRow = '';

  renderTable(tableData) {
    const {settings, columns, rows} = tableData;

    const table = SvbTable.createElement('table', 'doc-list-table', 'svb-table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    const tfoot = document.createElement('tfoot');

    // THEAD && TFOOT
    const headerRow = document.createElement('tr');
    const footerRow = document.createElement('tr');

    // header order column
    const numberTh = document.createElement('th');
    numberTh.textContent = '№';
    numberTh.dataset.name = 'order';
    headerRow.appendChild(numberTh);
    footerRow.appendChild(document.createElement('th'));

    columns.forEach((column) => {
      if (column === 'uuid') return;

      const th = document.createElement('th');
      th.textContent = settings[column]?.represent || column;
      th.dataset.name = column;
      th.style.minWidth = settings[column]?.columnWidth + 'px' || 'auto';
      th.style.maxWidth = settings[column]?.columnWidth + 'px' || 'auto';
      th.style.textAlign = settings[column]?.textAlign;

      headerRow.appendChild(th);
      footerRow.appendChild(document.createElement('th'));
    });

    thead.appendChild(headerRow);
    tfoot.appendChild(footerRow);


    // TBODY
    rows.forEach((row, i) => {
      const tr = document.createElement('tr');
      tr.dataset.uuid = row[0];

      tr.addEventListener('click', (event) => this.handleRowClick(event, row[0], rows, tbody));

      // row order column
      const numberTd = document.createElement('td');
      numberTd.textContent = i + 1;
      tr.appendChild(numberTd);


      row.forEach((cellData, j) => {
        if (columns[j] === 'uuid') return;

        const td = document.createElement('td');
        td.dataset.name = columns[j];
        td.style.minWidth = settings[columns[j]]?.columnWidth + 'px' || 'auto';
        td.style.maxWidth = settings[columns[j]]?.columnWidth + 'px' || 'auto';
        td.style.textAlign = settings[columns[j]]?.textAlign;

        if (typeof cellData === 'object' && cellData !== null && 'r' in cellData) {
          td.textContent = cellData.r;
        } else {
          td.textContent = cellData;
        }

        tr.appendChild(td);
      });

      tbody.appendChild(tr);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    table.appendChild(tfoot);

    return table;
  }

  /**
   *
   * @param {string} tagname
   * @param {string | null} id
   * @param {string | null} classList
   * @param {string | null} innerHTML
   * @returns {HTMLElement}
   */
  static createElement(tagname, id = null, classList = null, innerHTML = null) {
    const element = document.createElement(tagname);

    if (id) element.id = String(id);

    if (classList) {
      const classNames = classList.split(' ');
      classNames.forEach((name) => element.classList.add(name));
    }

    if (innerHTML) element.innerHTML = innerHTML;

    return element;
  }

  handleRowClick(event, rowId, rows, tbody) {
    event.stopPropagation();
    event.preventDefault();

    if (this._activeRow) {
      const prevActiveRowIdx = rows.findIndex(x => x[0] === this._activeRow);
      const prevActiveRowEl = tbody.rows.item(prevActiveRowIdx);
      if (prevActiveRowEl && prevActiveRowEl.classList.contains('active-tr')) {
        prevActiveRowEl.classList.remove('active-tr');
      }
    }

    this._activeRow = rowId;
    const currentRow = event.currentTarget;
    currentRow.classList.add('active-tr');
  }

  loadRows() {
  }

  addRow(rowData) {
  }

  removeRow() {
  }

  getActiveRow() {
    return this._activeRow;
  }

  setValue(args) {
  }

  getValue() {
  }
}
