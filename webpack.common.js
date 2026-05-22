const path = require('path');

module.exports = {
  entry: {
    app: './js/app.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: 'js/app.js', // Removed the leading './'
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        exclude: /index\.html$/,
        type: 'asset/source',
      },
    ],
  },
};
