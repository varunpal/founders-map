(function (window) {
  function StartupTable () {
    this.data = data;
  }
  
  StartupTable.prototype.render = function (data) {
    var context = this,
      table = document.createElement('table'),
      container = document.getElementById('tableContainer');
    data.forEach(function (item, index) {
      var row = context.renderRow(item, index);
      table.appendChild(row);
    });
    container.innerHTML = '';
    container.appendChild(table);
  }

  StartupTable.prototype.renderRow = function (data, index) {
    var row = document.createElement('tr'),
      isHeader = index === 0,
      context = this;
    data.forEach(function (item) {
      var column = context.renderColumn(item, index);
      row.appendChild(column);
    });
    return row;
  }

  StartupTable.prototype.renderColumn = function (data, rowIndex) {
    var column = null;
    if (rowIndex === 0) {
      column = document.createElement('th');
    } else {
      column = document.createElement('td');
    }
    column.textContent = data;
    return column;
  }

  window.StartupTable = StartupTable;
})(window);