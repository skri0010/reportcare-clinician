/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackObfuscator = require("webpack-obfuscator");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

// Set to true to analyze bundle
const analyzeBundle = false;

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
 * 3. The order of items in resolver.extensions matter. When files have the same name,
 *    the file with the first extension will be chosen.
 *
 * Optimizations
 * 1. Import specific packages from aws-amplify
 *
 */

const production = process.env.NODE_ENV === "production";
const appDirectory = path.resolve(__dirname, "../../");

const compileNodeModules = [
  // Add every react-native package that needs compiling
  "@react-native-community/masked-view",
  "@react-navigation/drawer",
  "@react-navigation/material-top-tabs",
  "@react-navigation/native",
  "@react-navigation/stack",
  "@react-native-picker/picker",
  "react-native-web",
  "react-native-elements",
  "react-native-gesture-handler",
  "react-native-pager-view",
  "react-native-reanimated",
  "react-native-safe-area-context",
  "react-native-screens",
  "react-native-size-matters",
  "react-native-tab-view",
  "react-native-ratings",
  "react-native-vector-icons",
  "react-native-chart-kit",
  "@react-native-picker/picker",
  "react-native-web",
  "agents-framework",
  "react-native-sound"
].map((moduleName) => path.resolve(appDirectory, `node_modules/${moduleName}`));

// Loader for react-native packages to be compiled
// Add every directory that needs to be compiled by Babel during the build
const babelLoaderConfiguration = {
  test: /\.(jsx?|tsx?)$/,
  exclude: [path.resolve(appDirectory, "src/mobile")],
  include: [
    path.resolve(appDirectory, "index.web.ts"), // Entry to app,
    path.resolve(appDirectory, "src"), // Source files
    ...compileNodeModules
  ],
  use: {
    loader: "babel-loader",
    options: {
      cacheDirectory: true,
      presets: ["module:metro-react-native-babel-preset"],
      // Re-write paths to import only the modules needed by the app
      plugins: [
        "react-native-web",
        "@babel/plugin-proposal-export-namespace-from"
      ]
    }
  }
};

// Loader for static images in JavaScript files.
const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|ico)$/,
  use: {
    loader: "url-loader",
    options: {
      name: "[name].[ext]",
      esModule: false
    }
  }
};

// Loader for fonts (icons) from `react-native-vector-icons`.
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
    path.resolve(appDirectory, "node_modules/react-native-vector-icons")
  ]
};

// Loader for svg files
const svgLoaderConfiguration = {
  test: /\.svg$/,
  use: ["@svgr/webpack", "url-loader"]
};

// Loader for html tags (https://webpack.js.org/loaders/html-loader/#sources)
const htmlLoaderConfiguration = {
  test: /\.html$/,
  loader: "html-loader",
  options: {
    sources: {
      list: [
        // All default supported tags and attributes
        "..."
      ]
    }
  }
};

const cssLoaderConfiguration = {
  test: /\.css$/i,
  use: [MiniCssExtractPlugin.loader, "css-loader"]
};

const mp3LoaderConfiguration = {
  test: /\.(mp3|wav)$/,
  loader: "file-loader"
};

// Map key-value pairs of all alias paths
const srcFolderAliasPaths = {};
const srcFolderAliasKeys = [
  "aws",
  "components",
  "ic-redux",
  "mock",
  "models",
  "rc_agents",
  "util",
  "web"
];
srcFolderAliasKeys.forEach((srcFolder) => {
  srcFolderAliasPaths[srcFolder] = path.resolve(
    appDirectory,
    `src/${srcFolder}`
  );
});

module.exports = {
  entry: {
    app: path.resolve(appDirectory, "index.web.ts")
  },
  output: {
    filename: "[name].bundle.web.js",
    path: path.resolve(appDirectory, "build")
  },
  target: "web", // Enable live reload
  resolve: {
    alias: {
      "react-native$": "react-native-web",
      "react-native-svg": "react-native-svg-web",
      [path.resolve(
        appDirectory,
        "src/repos/management/MobileAgentManagement"
      )]: path.resolve(appDirectory, "src/repos/management/WebAgentManagement"),
      ...srcFolderAliasPaths
    },
    fallback: {
      crypto: require.resolve("crypto-browserify"),
      util: require.resolve("util/"),
      stream: require.resolve("stream-browserify")
    },
    extensions: [
      // Warning: Order matters
      ".web.ts",
      ".web.tsx",
      ".web.js",
      ".web.jsx",
      ".ts",
      ".tsx",
      ".js",
      ".jsx",
      ".json",
      ".mp3"
    ]
  },
  module: {
    rules: [
      babelLoaderConfiguration,
      imageLoaderConfiguration,
      ttfLoaderConfiguration,
      svgLoaderConfiguration,
      htmlLoaderConfiguration,
      cssLoaderConfiguration,
      mp3LoaderConfiguration,
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
      template: path.join(appDirectory, "public/index.html"),
      filename: "index.html",
      favicon: "public/favicon.ico",
      chunks: ["app"] // Refers to above entry js files
    }),
    new MiniCssExtractPlugin(),
    // Use web obfuscator in production
    ...(production
      ? [
          new WebpackObfuscator({
            rotateStringArray: true
          })
        ]
      : []),
    // Analyze bundle in production
    ...(production && analyzeBundle ? [new BundleAnalyzerPlugin()] : [])
  ],
  devServer: {
    port: 8080,
    watchOptions: {
      poll: true
    }
  }
};
