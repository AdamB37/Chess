const path = require('path')

module.exports = {
  entry: "./index.js",
  output: {
    path: path.join(__dirname, './build'),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)?$/,
        loaders: 'babel-loader',
        query: {
          presets:['env','react']
        },
        exclude: /node_modules/,
      },

      {
        test: /\.scss$/,
        use:
        [
            {
            loader: "style-loader"
            },
            {
            loader: "css-loader"
            },
            {
            loader: "sass-loader"
            }
        ],
        exclude: /node_modules/
      },
    ]
  }
}
