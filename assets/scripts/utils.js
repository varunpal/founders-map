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