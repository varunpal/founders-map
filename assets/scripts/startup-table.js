(function (window) {
  function StartupTable () {
    var context = this;
    this.container = document.getElementById('tableContainer');
    this.data = null;
    this.container.addEventListener('change', function (event) {
      var index = parseInt(event.target.value, 10);
      switch (event.target.id) {
        case 'sort':
          context.sortData(index);
          break;
        case 'filter':
          context.filterIndex = index;

      }
    });
    this.container.addEventListener('keyup', function (event) {
      if (event.target.id === 'filterText') {
        context.filterData(event.target.value);
      }
    });
  }
  
  StartupTable.prototype.render = function (data) {
    this.data = data;
    this.container.className = 'show';
    this.renderSortFilter();
    this.renderTable();
  }

  StartupTable.prototype.renderTable = function () {
    var context = this,
      table = document.getElementById('startupTable'),
      data = this.filteredData || this.data;
    table.innerHTML = '';
    data.forEach(function (item, index) {
      var row = context.renderRow(item, index);
      table.appendChild(row);
    });
  }

  StartupTable.prototype.sortData = function (index) {
    var headers = this.data[0],
      rows = this.data.slice(1);
    this.data = rows.sort(function (a, b) {
      return a[index].toUpperCase() > b[index].toUpperCase() ? 1 : -1;
    });
    this.data = [headers].concat(this.data);
    this.renderTable();
  }

  StartupTable.prototype.renderSortFilter = function () {
    this.renderSort();
    this.renderFilters();
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

  StartupTable.prototype.renderFilters = function () {
    var filterColumns = document.getElementById('filter'),
      columns = this.data[0];
    filterColumns.innerHTML = '<option selected disabled>Select</option>';
    columns.forEach(function (column, index) {
      var option = document.createElement('option');
      option.value = index;
      option.innerText = column;
      filterColumns.appendChild(option);
    });
  }

  StartupTable.prototype.filterData = function (filter) {
    var filterText = filter.trim(),
      context = this;
    if (filterText && this.filterIndex >= 0) {
      this.filteredData = this.data.filter(function (row, index) {
        if (index === 0) {
          return true;
        }
        return row[context.filterIndex].toLowerCase().indexOf(filterText.toLowerCase()) > -1;
      });
    } else {
      this.filteredData = null;
    }
    this.renderTable();
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
      content = null;
    if (rowIndex === 0) {
      cell = document.createElement('th');
    } else {
      cell = document.createElement('td');
    }
    if (window.utils.isImage(data)) {
      content = document.createElement('img');
      content.src = data;
      content.className = 'thumb';
      cell.appendChild(content);
    } else {
      cell.textContent = data;
    }
    return cell;
  }

  StartupTable.prototype.hide = function () {
    var container = document.getElementById('tableContainer');
    container.className = 'hide';
  }

  window.StartupTable = StartupTable;
})(window);