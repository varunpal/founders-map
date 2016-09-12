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