(function (window) {
  function Foundry() {
    this.data = null;
    this.separator = null;
    this.table = new window.StartupTable();
  }
  Foundry.prototype.setup = function () {
    var generator = document.getElementById('generator'),
      context = this;
    generator.addEventListener('submit', function (event) {
      event.preventDefault();
      var data = event.target.data.value,
        separator = event.target.separator.value;
      context.data = window.utils.parse(data, separator);
      context.separator = separator;
      context.table.render(context.data);
      console.log(window.utils.parse(data, separator), separator);
    });
  }
  window.Foundry = Foundry;
})(window);