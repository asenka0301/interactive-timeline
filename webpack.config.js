const path = require("path");
const { buildLoaders } = require("./config/build/buildLoaders");
const { buildPlugins } = require("./config/build/buildPlugins");

module.exports = (env = {}) => {
  const mode = env.mode || "development";
  const isDev = mode === "development";
  const port = env.port || 3000;

  const paths = {
    entry: path.resolve(__dirname, "src", "index.tsx"),
    output: path.resolve(__dirname, "build"),
    html: path.resolve(__dirname, "public", "index.html"),
  };

  return {
    mode,
    entry: paths.entry,
    output: {
      path: paths.output,
      filename: "[name].[contenthash].js",
      publicPath: "/",
      clean: true,
    },

    devtool: isDev ? "inline-source-map" : false,

    module: {
      rules: buildLoaders({ mode }),
    },

    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
    },

    plugins: buildPlugins({ mode, paths }),

    devServer: isDev
      ? {
          port,
          historyApiFallback: true,
          open: true,
          hot: true,
        }
      : false,
  };
};
