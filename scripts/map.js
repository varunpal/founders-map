(function (window) {
  function FoundersMap() {
    this.data = null;
    this.hiddenRows = [];
    this.titleColumn = null;
    this.latitudeColumn = null;
    this.longitudeColumn = null;
    this.map = null;
    var mapContainer = document.getElementById('mapContainer'),
      context = this;
    mapContainer.addEventListener('submit', function (event) {
      event.preventDefault();
      var latitude = event.target.latitude.value,
        longitude = event.target.longitude.value,
        markerTitle = event.target.markerTitle.value;
      if (latitude >=0 && longitude >= 0 && markerTitle >= 0) {
        context.titleColumn = markerTitle;
        context.longitudeColumn = longitude;
        context.latitudeColumn = latitude;
        context.renderMap();
      }
    });
  }

  FoundersMap.prototype.init = function (data) {
    this.data = data;
    this.renderForm();
  }

  FoundersMap.prototype.renderForm = function () {
    this.renderMapForm();
    this.renderHiddenRows();
  }

  FoundersMap.prototype.renderMap = function () {
    var rows = this.data.slice(1),
      context = this,
      bounds = new google.maps.LatLngBounds();
    this.map = new google.maps.Map(document.getElementById("map"));
    rows.forEach(function (row) {
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

  FoundersMap.prototype.renderMapForm = function () {
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

  FoundersMap.prototype.renderHiddenRows = function () {

  }

  window.FoundersMap = FoundersMap;

})(window);