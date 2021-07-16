// Used for ClinicianMobile
// For ClinicianWeb's babel configuration, refer to src/web/webpack.config.js

module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./src"],
        extensions: [
          "ios.js",
          "android.js",
          "ios.tsx",
          "android.tsx",
          ".js",
          ".jsx",
          ".ts",
          ".tsx",
          ".json"
        ],
        alias: {
          agents_implementation: "./src/agents_implementation",
          aws: "./src/aws",
          components: "./src/components",
          "ic-redux": "./src/ic-redux",
          mock: "./src/mock",
          models: "./src/models",
          util: "./src/util",
          mobile: "./src/mobile"
        }
      }
    ]
  ]
};
