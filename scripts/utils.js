window.utils = {
  parse: function (str, separator) {
    var data = null,
      rows = str.split(/\n/g);
    data = rows.map(function (row) {
      var columns = row.split(separator);
      return columns;
    });
    return data;
  },

  isImage: function (url) {
    var imageExpression = /\.(jpg|png|jpeg)$/;
    return imageExpression.test(url);
  }
}