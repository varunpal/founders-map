(function (window) {
  function Foundry() {
    this.data = null;
    this.separator = null;
  }
  Foundry.prototype.setup = function () {
    var generator = document.getElementById('generator'),
      context = this;
    generator.addEventListener('submit', function (event) {
      event.preventDefault();
      var data = event.target.data.value,
        separator = event.target.separator.value;
      console.log(window.utils.parse(data, separator), separator);
    });
  }
  window.Foundry = Foundry;
})(window);