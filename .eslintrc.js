module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  extends: ["airbnb", "plugin:@typescript-eslint/recommended", "prettier"],
  plugins: ["react", "react-native", "jsx-a11y", "import", "react-hooks"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    "react-native/react-native": true
  },
  ignorePatterns: ["dist", "src/shared/aws/models/*"],
  rules: {
    "no-param-reassign": 0,
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/jsx-filename-extension": ["off"],
    "react/jsx-one-expression-per-line": 0,
    "linebreak-style": ["off"],
    "implicit-arrow-linebreak": 0,
    "no-undef": ["off"], // let TypeScript handle this,
    "react/sort-comp": ["off"],
    "react/prefer-stateless-function": ["off"],
    "react/destructuring-assignment": 1,
    "function-paren-newline": 0,
    semi: ["error", "always"],
    "spaced-comment": 0,
    "comma-dangle": ["error", "never"],
    "react/prop-types": 0,
    "no-extra-boolean-cast": 0,
    "arrow-body-style": 0,
    "quote-props": 0,
    "object-curly-spacing": ["error", "always"],
    camelcase: 0,
    "no-nested-ternary": 0,
    "react/jsx-wrap-multilines": 0,
    "object-curly-newline": 0,
    "operator-linebreak": 0,
    "no-unused-expressions": 0,
    "global-require": 0,
    "max-len": 0,
    "import/no-cycle": 0,
    "no-underscore-dangle": 0,
    "no-return-assign": 0,
    "import/prefer-default-export": 0,
    "jsx-quotes": ["error", "prefer-double"],
    "no-console": "error",
    "arrow-parens": 0,
    "eol-last": 0,
    "react-native/no-unused-styles": 0,
    "react-native/split-platform-components": 0,
    "react-native/no-inline-styles": 0,
    "react-native/no-color-literals": 0,
    "react-native/no-raw-text": 0,
    "consistent-return": 0,
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never"
      }
    ],
    "import/order": 0,
    "import/no-extraneous-dependencies": 0,
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error", { variables: false }],
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],
    "@typescript-eslint/no-non-null-assertion": "off",
    "object-shorthand": ["error", "never"],
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/no-non-null-assertions": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off", // overidden for .ts .tsx files
    "@typescript-eslint/no-explicit-any": "off",
    "no-restricted-imports": [
      "error",
      {
        paths: [
          {
            name: "react-native-gesture-handler",
            message: "You may have accidentally imported this"
          },
          {
            name: "react-native-reanimated",
            message: "You may have accidentally imported this"
          },
          {
            name: "react-native-elements",
            importNames: ["colors"],
            message: "You may have accidentally import this"
          },
          {
            name: "react-native-elements/dist/config",
            importNames: ["fonts"],
            message: "You may have accidentally imported this"
          },
          {
            name: "aws-amplify",
            message:
              "Import only from libraries you are using (eg @aws-amplify/core)"
          },
          {
            name: "@react-native-picker/picker",
            message:
              "Please import the component directly (eg @react-native-picker/picker/js/Picker.web)"
          }
        ]
      }
    ]
  },
  overrides: [
    {
      // enable the rule specifically for TypeScript files
      files: ["*.ts", "*.tsx"],
      rules: {
        "@typescript-eslint/explicit-module-boundary-types": [
          "warn",
          { allowArgumentsExplicitlyTypedAsAny: true }
        ]
      }
    }
  ],
  settings: {
    "import/resolver": {
      node: {
        moduleDirectory: ["src", "node_modules"],
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
      }
    }
  }
};
