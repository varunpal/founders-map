(function (window) {
  function StartupTable () {
    var context = this,
      tableContainer = document.getElementById('tableContainer');
    this.data = null;
    tableContainer.addEventListener('change', function (event) {
      if (event.target.id === 'sort') {
        context.sortData(parseInt(event.target.value, 10));
      }
    });
  }
  
  StartupTable.prototype.render = function (data) {
    this.data = data;
    this.renderSortFilter();
    this.renderTable();
  }

  StartupTable.prototype.renderTable = function () {
    var context = this,
      table = document.getElementById('startupTable');
    table.innerHTML = '';
    this.data.forEach(function (item, index) {
      var row = context.renderRow(item, index);
      table.appendChild(row);
    });
  }

  StartupTable.prototype.sortData = function (index) {
    var headers = this.data.splice(0, 1);
    this.data = this.data.sort(function (a, b) {
      return a[index].toUpperCase() > b[index].toUpperCase() ? 1 : -1;
    });
    this.data = headers.concat(this.data);
    this.renderTable();
  }

  StartupTable.prototype.renderSortFilter = function () {
    this.renderSort();
  }

  StartupTable.prototype.renderSort = function () {
    var sort = document.getElementById('sort'),
      columns = this.data[0];
    sort.innerHTML = '<option selected disabled>Select</option>';
    columns.forEach(function (column, index) {
      var option = document.createElement('option');
      option.value = index;
      option.innerText = column;
      sort.appendChild(option);
    });
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