import { AppRegistry } from "react-native";
import App from "./src/web/App.web";
import "util/language/i18n"; // DO NOT REMOVE: This is necessary for translation

// This block of code generates required CSS to use fonts (icons) from react-native-vector-icons
// Generate required css
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import FA from "react-native-vector-icons/Fonts/FontAwesome.ttf";
// @ts-ignore
import MCI from "react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf";
// @ts-ignore
import MI from "react-native-vector-icons/Fonts/MaterialIcons.ttf";

const iconFontStyles = `
  @font-face {
    src: url(${FA});
    font-family: FontAwesome;
  }
  @font-face {
    src: url(${MCI});
    font-family: MaterialCommunityIcons;
  }
  @font-face {
    src: url(${MI});
    font-family: MaterialIcons;
  }
`;

// Disables error message in development when navigating between screens causing Redux to update unmounted components
// Source: https://github.com/wix/react-native-navigation/issues/2618
// eslint-disable-next-line no-console
const backupConsoleError = console.error;
// eslint-disable-next-line no-console
console.error = function filterWarnings(message) {
  const supressedWarnings = [
    "Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in %s.%s"
  ];

  if (!supressedWarnings.some((entry) => message.includes(entry))) {
    // @ts-ignore
    backupConsoleError.apply(console, arguments);
  }
};

// Create and inject stylesheet
const style = document.createElement("style");
const textNode = document.createTextNode(iconFontStyles);
style.appendChild(textNode);
document.head.appendChild(style);

const appName = "ClinicianWeb";
// Register the app
AppRegistry.registerComponent(appName, () => App);

AppRegistry.runApplication(appName, {
  initialProps: {},
  rootTag: document.getElementById("root")
});
