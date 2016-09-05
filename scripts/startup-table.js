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
      var column = context.renderCell(item, index);
      row.appendChild(column);
    });
    return row;
  }

  StartupTable.prototype.renderCell = function (data, rowIndex) {
    var cell = null,
      content = null,
      imageExpression = /\.(jpg|png|jpeg)$/,
      isImage = imageExpression.test(data);
    if (rowIndex === 0) {
      cell = document.createElement('th');
    } else {
      cell = document.createElement('td');
    }
    if (isImage) {
      content = document.createElement('img');
      content.src = data;
      content.className = 'thumb';
      cell.appendChild(content);
    } else {
      cell.textContent = data;
    }
    return cell;
  }

  window.StartupTable = StartupTable;
})(window);