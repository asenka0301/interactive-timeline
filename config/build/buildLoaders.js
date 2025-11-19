const MiniCssExtractPlugin = require("mini-css-extract-plugin");

function buildLoaders({ mode }) {
  const isDev = mode === "development";

  const styleLoaders = [
    isDev ? "style-loader" : MiniCssExtractPlugin.loader,
    "css-loader",
  ];

  const cssLoader = {
    test: /\.css$/i,
    use: styleLoaders,
  };

  const tsLoader = {
    test: /\.tsx?$/,
    use: "ts-loader",
    exclude: /node_modules/,
  };

  return [cssLoader, tsLoader];
}

module.exports = { buildLoaders };
