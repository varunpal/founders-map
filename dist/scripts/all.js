window.utils = {
  parse: function (str, separator) {
    var data = null,
      rows = str.split(/\n/g);
    if (separator === 'tab') {
      separator = /\t+/g;
    }
    data = rows.map(function (row) {
      var columns = row.split(separator);
      return columns;
    });
    return data;
  },

  isImage: function (url) {
    var imageExpression = /\.(jpg|png|jpeg)$/;
    return imageExpression.test(url);
  },

  isLink: function (str) {
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    return expression.test(str);
  }
};
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
    } else if(window.utils.isLink(data)) {
      content = document.createElement('a');
      content.href = data;
      content.innerText = 'Link';
      content.className = 'link';
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
(function (window) {
  function FoundersMap() {
    this.data = null;
    this.hiddenRows = [];
    this.titleColumn = null;
    this.latitudeColumn = null;
    this.longitudeColumn = null;
    this.map = null;
  }

  FoundersMap.prototype.init = function (data, latitude, longitude, title, hidden) {
    this.data = data;
    this.latitudeColumn = latitude;
    this.longitudeColumn = longitude;
    this.titleColumn = title;
    this.hiddenRows = hidden;
    if (this.validate()) {
      this.renderMap();
    }
  }

  FoundersMap.prototype.validate = function () {
    if (!(this.data && this.data.length)) {
      alert('Please enter valid data');
      return false;
    }
    if (this.hiddenRows.length === (this.data.length - 1)) {
      alert('All rows are hidden, there is nothing to render :(');
      return false;
    }
    if (!(parseInt(this.latitudeColumn, 10) >= 0)) {
      alert('Please specify a column for latitude.');
      return false;
    }
    if (!(parseInt(this.longitudeColumn, 10) >= 0)) {
      alert('Please specify a column for longitude.');
      return false;
    }
    if (!(parseInt(this.titleColumn, 10) >= 0)) {
      alert('Please specify a column for marker titles.');
      return false;
    }
    return true;
  }

  FoundersMap.prototype.renderMap = function () {
    var rows = this.data.slice(1),
      context = this,
      container = document.getElementById("mapContainer"),
      bounds = new google.maps.LatLngBounds();
    container.className = '';
    this.map = new google.maps.Map(document.getElementById("map"));
    rows.forEach(function (row, index) {
      if (context.hiddenRows.some(function(hiddenRow, hiddenIndex) { return index == hiddenIndex; })) {
        return;
      }
      var position = new google.maps.LatLng(row[context.latitudeColumn], row[context.longitudeColumn]);
      var marker = new google.maps.Marker({
          position: position,
          map: context.map,
          title: row[context.titleColumn]
      });
      bounds.extend(marker.getPosition());
    });
    context.map.fitBounds(bounds);
  }

  FoundersMap.prototype.hide = function () {
    var container = document.getElementById('mapContainer');
    container.className = 'hide';
  }

  window.FoundersMap = FoundersMap;

})(window);
(function (window) {
  function Foundry() {
    this.rawData = '';
    this.data = null;
    this.separator = null;
    this.format = 'table';
    this.table = new window.StartupTable();
    this.map = new window.FoundersMap();
  }
  Foundry.prototype.setup = function () {
    var generator = document.getElementById('generator');
    generator.addEventListener('submit', this.onSubmit.bind(this));
    generator.addEventListener('change', this.onChange.bind(this));
    generator.addEventListener('input', this.onInput.bind(this));
  }

  Foundry.prototype.onInput = function (event) {
    var separator = document.querySelector('.separator-section');
    switch (event.target.name) {
      case 'data':
        this.rawData = event.target.value;
        if (this.separator) {
          this.data = window.utils.parse(this.rawData.trim(), this.separator);
        }
        separator.className = 'section separator-section';
        break;
    }
  }

  Foundry.prototype.onChange = function (event) {
    var format = document.querySelector('.format-section');
    switch (event.target.name) {
      case 'format':
        if (event.target.value === 'map') {
          this.setupMapOptions();
          this.format = 'map';
        } else {
          this.format = 'table';
          this.hideMapOptions();
        }
        break;
      case 'separator':
        format.className = "section format-section";
        this.data = window.utils.parse(this.rawData.trim(), event.target.value);
        this.separator = event.target.value;
        if (this.format === 'map') {
          this.setupMapOptions();
        }
        break;
    }
  }

  Foundry.prototype.onSubmit = function (event) {
    event.preventDefault();
    var data = event.target.data.value,
      separator = event.target.separator.value,
      latitude = event.target.latitude.value,
      longitude = event.target.longitude.value,
      marker = event.target.marker.value,
      hiddenRows = [],
      selectedOptions = event.target.hide.selectedOptions || [],
      index;
      for (index = 0; index < selectedOptions.length; index ++) {
        hiddenRows.push(selectedOptions[index].value);
      }
    if (!data.trim()) {
      alert('Please enter valid csv data');
      return;
    } 
    this.data = window.utils.parse(data.trim(), separator);
    this.separator = separator;
    if (this.format === 'table') {
      this.table.render(this.data);
      this.map.hide();
      window.scrollTo(0,document.body.scrollHeight);
    } else {
      this.map.init(this.data, latitude, longitude, marker, hiddenRows);
      this.table.hide();
      window.scrollTo(0,document.body.scrollHeight);
    }
  }

  Foundry.prototype.setupMapOptions = function () {
    var mapSection = document.querySelector('.map-section');
    mapSection.className = 'section map-section';
    this.setupMapSelectors();
    this.setupMapHideOptions();
  }

  Foundry.prototype.setupMapSelectors = function () {
    var latitudeSelector = document.getElementById('latitude'),
      longitudeSelector = document.getElementById('longitude'),
      markerTitle = document.getElementById('markerTitle'),
      columns = this.data[0],
      context = this;
    if (this.data.length > 1) {
      latitudeSelector.innerHTML = '<option selected disabled>Select</option>';
      longitudeSelector.innerHTML = '<option selected disabled>Select</option>';
      markerTitle.innerHTML = '<option selected disabled>Select</option>';

      columns.forEach(function (column, index) {
        var isNumber = Math.abs(context.data[1][index]) >= 0,
          latitudeOption = document.createElement('option'),
          longitudeOption = document.createElement('option'),
          markerOption = document.createElement('option');
          hideOption = document.createElement('option');
        if (isNumber) {
          latitudeOption.value = index;
          latitudeOption.innerText = column;
          latitudeSelector.appendChild(latitudeOption);

          longitudeOption.value = index;
          longitudeOption.innerText = column;
          longitudeSelector.appendChild(longitudeOption);
        }
        markerOption.value = index;
        markerOption.innerText = column;
        markerTitle.appendChild(markerOption);
      });
    }
  }

  Foundry.prototype.setupMapHideOptions = function () {
    var rows = this.data.slice(1),
      context = this,
      hide = document.getElementById('hide');
      hide.innerHTML = '';

    rows.forEach(function (row, index) {
      var hideOption = document.createElement('option');
      hideOption.innerText = row.join(' ' + context.separator + ' ');
      hideOption.value = index;
      hide.appendChild(hideOption);
    });
  }

  Foundry.prototype.hideMapOptions = function () {
    var mapSection = document.querySelector('.map-section');
    mapSection.className += ' hide';
  }
  window.Foundry = Foundry;
})(window);
(function (window) {
  var foundry = new window.Foundry();
  foundry.setup();
})(window);