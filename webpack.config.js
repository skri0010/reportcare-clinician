/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// Obfuscator to obfuscate production bundle
const WebpackObfuscator = require("webpack-obfuscator");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

/**
 * References
 * 1. https://necolas.github.io/react-native-web/docs/multi-platform/
 * 2. https://arry.medium.com/how-to-add-react-native-web-to-an-existing-react-native-project-eb98c952c12f
 * 3. https://github.com/oblador/react-native-vector-icons#web-with-webpack
 * 4. NODE_ENV: https://github.com/webpack/webpack-cli/issues/2362#issuecomment-771776945
 *
 * Warnings
 * 1. react-native-reanimated >=2.0.0 will break @react-navigation/drawer
 * 2. NEVER include source maps in the production bundle
 *
 * Optimizations
 * 1. Import specific packages from aws-amplify
 *
 */

const production = process.env.NODE_ENV === "production";
const appDirectory = path.resolve(__dirname);

const compileNodeModules = [
  // Add every react-native package that needs compiling
  "@react-native-community/masked-view",
  "@react-navigation/drawer",
  "@react-navigation/material-top-tabs",
  "@react-navigation/native",
  "@react-navigation/stack",
  "react-native-elements",
  "react-native-gesture-handler",
  "react-native-pager-view",
  "react-native-reanimated",
  "react-native-safe-area-context",
  "react-native-screens",
  "react-native-size-matters",
  "react-native-tab-view",
  "react-native-ratings",
  "react-native-vector-icons"
].map((moduleName) => path.resolve(appDirectory, `node_modules/${moduleName}`));

const babelLoaderConfiguration = {
  test: /\.(jsx?|tsx?)$/,
  // Add every directory that needs to be compiled by Babel during the build.
  include: [
    path.resolve(appDirectory, "index.web.ts"), // Entry to app,
    path.resolve(appDirectory, "App.web.tsx"), // Main App file
    path.resolve(appDirectory, "src"), // Source
    ...compileNodeModules
  ],
  use: {
    loader: "babel-loader",
    options: {
      cacheDirectory: true,
      presets: ["module:metro-react-native-babel-preset"],
      // Re-write paths to import only the modules needed by the app
      plugins: ["react-native-web"]
    }
  }
};

// This is needed for webpack to import static images in JavaScript files.
const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|svg|ico)$/,
  use: {
    loader: "url-loader",
    options: {
      name: "[name].[ext]",
      esModule: false
    }
  }
};

// This is needed for webpack to import fonts (icons) from  react-native-vector-icons.
const ttfLoaderConfiguration = {
  test: /\.ttf$/,
  use: [
    {
      loader: "file-loader",
      options: {
        name: "./fonts/[hash].[ext]"
      }
    }
  ],
  include: [
    // path.resolve(appDirectory, './src/assets/fonts'),
    path.resolve(appDirectory, "node_modules/react-native-vector-icons")
  ]
};

// This is needed for webpack to import svg files
const svgLoaderConfiguration = {
  test: /\.svg$/,
  use: [
    {
      loader: "@svgr/webpack"
    }
  ]
};

// Set to true to analyze bundle
const analyzeBundle = false;

module.exports = {
  entry: [path.resolve(appDirectory, "index.web.ts")],
  output: {
    filename: "bundle.web.js",
    path: path.resolve(appDirectory, "dist")
  },
  resolve: {
    alias: {
      "react-native$": "react-native-web",
      shared: path.resolve(appDirectory, "src/shared"),
      actions: path.resolve(appDirectory, "src/shared/ic-redux/actions"),
      aws: path.resolve(appDirectory, "src/shared/aws"),
      components: path.resolve(appDirectory, "src/shared/components"),
      "ic-redux": path.resolve(appDirectory, "src/shared/ic-redux"),
      models: path.resolve(appDirectory, "src/shared/models"),
      reducers: path.resolve(appDirectory, "src/shared/ic-redux/reducers"),
      store: path.resolve(appDirectory, "src/shared/ic-redux/store"),
      util: path.resolve(appDirectory, "src/shared/util"),
      screens: path.resolve(appDirectory, "src/screens"),
      mock: path.resolve(appDirectory, "src/mock")
    },
    fallback: {
      crypto: require.resolve("crypto-browserify"),
      util: require.resolve("util/"),
      stream: require.resolve("stream-browserify")
    },
    extensions: [
      ".js",
      ".jsx",
      ".ts",
      ".tsx",
      ".web.js",
      ".web.jsx",
      ".web.ts",
      ".web.tsx",
      ".json"
    ]
  },
  module: {
    rules: [
      babelLoaderConfiguration,
      imageLoaderConfiguration,
      ttfLoaderConfiguration,
      svgLoaderConfiguration,
      // This is required to resolve graphql imports
      // See: https://github.com/graphql/graphql-js/issues/2721
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      // See: https://github.com/necolas/react-native-web/issues/349
      __DEV__: !production
    }),

    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public/index.html"),
      manifest: "./public/manifest",
      favicon: "./public/favicon.ico"
    }),
    ...(production
      ? [
          new WebpackObfuscator({
            rotateStringArray: true
          })
        ]
      : []),
    ...(production && analyzeBundle ? [new BundleAnalyzerPlugin()] : [])
  ]
};
