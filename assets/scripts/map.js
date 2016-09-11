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