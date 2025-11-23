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

  const assetsLoader = {
    test: /\.(png|jpe?g|gif|svg)$/i,
    type: "asset/resource",
    generator: {
      filename: "assets/[hash][ext][query]",
    },
  };

  return [assetsLoader, cssLoader, tsLoader];
}

module.exports = { buildLoaders };
