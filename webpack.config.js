const { join, resolve } = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ringUiWebpackConfig = require("@jetbrains/ring-ui/webpack.config");

const pkgConfig = require("./package.json").config;

const componentsPath = join(__dirname, pkgConfig.components);

const webpackConfig = () => ({
  entry: `${componentsPath}/app/index.tsx`,
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    mainFields: ["module", "browser", "main"],
    alias: {
      react: resolve("./node_modules/react"),
      "react-dom": resolve("./node_modules/react-dom"),
      "@jetbrains/ring-ui": resolve("./node_modules/@jetbrains/ring-ui"),
    },
  },
  output: {
    path: resolve(__dirname, pkgConfig.dist),
    filename: "[name].js",
    devtoolModuleFilenameTemplate: "[absolute-resource-path]",
  },
  module: {
    rules: [
      ...ringUiWebpackConfig.config.module.rules,
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.svg$/,
        loader: require.resolve("svg-inline-loader"),
        options: { removeSVGTagAttrs: false },
        include: [require("@jetbrains/logos")],
      },

      {
        test: /\.css$/,
        exclude: [ringUiWebpackConfig.componentsPath],
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                auto: true,
                localIdentName: "[local]_[hash:3]",
              },
            },
          },
        ],
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto'
      },
      {
        test: /(\.js|\.mjs)$/,
        exclude: /(bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [
              "@babel/plugin-proposal-object-rest-spread",
              "@babel/plugin-proposal-nullish-coalescing-operator",
              "@babel/plugin-proposal-optional-chaining",
            ],
          },
        },
      },
      {
        test: /\.po$/,
        include: componentsPath,
        use: [
          "json-loader",
          {
            loader: "angular-gettext-loader",
            options: { format: "json" },
          },
        ],
      },
    ],
  },
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    disableHostCheck: true,
    stats: {
      assets: false,
      children: false,
      chunks: false,
      hash: false,
      version: false,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "html-loader?interpolate!src/index.html",
    }),
    new CopyWebpackPlugin(["manifest.json"], {}),
  ],
});

module.exports = webpackConfig;
