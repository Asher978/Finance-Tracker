const autoprefixer = require("autoprefixer");
const path = require("path");
const webpack = require("webpack");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CssUrlRelativePlugin = require("css-url-relative-plugin");

module.exports = {
  // Tell webpack the root file of our client side application
  entry: {
    vendor: ["react", "react-dom"],
    main: ["./src/client.js"]
  },
  name: "client",
  mode: "development",
  // Tell webpack where to put the output file that is generated
  devtool: "#eval-source-map",
  output: {
    filename: "[name]-bundle.js",
    path: path.resolve(__dirname, "../public"),
    publicPath: "/"
  },

  devServer: {
    port: 3001,
    contentBase: path.resolve(__dirname, "../public"),
    compress: true,
    watchContentBase: true,
    hot: true,
    historyApiFallback: true,
    watchOptions: {
      ignored: /node_modules/
    },
    overlay: {
      warnings: true,
      errors: true
    },
    stats: "errors-only"
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.(png|ico|jpg|jpeg|gif|svg|eot|otf|ttf|woff|woff2)$/,
        loader: "url-loader?limit=8000",
        options: {
          name: "assets/[name].[ext]"
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "css-hot-loader"
          },
          {
            loader: MiniCSSExtractPlugin.loader
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 2
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              config: {
                path: "./postcss.config.js"
              }
            }
          },
          {
            loader: "sass-loader",
            options: {
              outputStyle: "expanded",
              sourceMap: true,
              sourceMapContents: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: "./src/assets/img", to: "public/assets/img" }
    ]),
    new MiniCSSExtractPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development")
      }
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, "../public/index.html")
      // favicon: path.resolve(__dirname, "../public/favicon.ico")
    }),
    new CssUrlRelativePlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin()
  ]
};
