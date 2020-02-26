const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: { main: "./src/index.js" },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js"
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./src/pug/index.pug"
    })
  ],
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader?name=[name].[ext]&outputPath=images/&publicPath=images/"]
      },
      {
        test: /\.pug$/,
        use: [
          "pug-loader"
        ]
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: function() {
                return [require("autoprefixer")];
              }
            }
          },
          {
            loader: "sass-loader"
          }
        ]
      },
    ]
  }
};
