const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

function buildPlugins({ mode, paths }) {
  const isProd = mode === "production";

  const plugins = [
    new HtmlWebpackPlugin({
      template: paths.html,
    }),
  ];

  if (isProd) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash:8].css",
        chunkFilename: "css/[id].[contenthash:8].css",
      })
    );
  }

  return plugins;
}

module.exports = { buildPlugins };
