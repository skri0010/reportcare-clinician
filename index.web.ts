import { AppRegistry } from "react-native";
import App from "./src/App.web";
import { name as appName } from "./app.json";
import "util/language/i18n"; // DO NOT REMOVE: This is necessary for translation

// This block of code generates required CSS to use fonts (icons) from react-native-vector-icons
// Generate required css
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import FA from "react-native-vector-icons/Fonts/FontAwesome.ttf";
// @ts-ignore
import MCI from "react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf";

const iconFontStyles = `
  @font-face {
    src: url(${FA});
    font-family: FontAwesome;
  }
  @font-face {
    src: url(${MCI});
    font-family: MaterialCommunityIcons;
  }
`;

// Create and inject stylesheet
const style = document.createElement("style");
const textNode = document.createTextNode(iconFontStyles);
style.appendChild(textNode);
document.head.appendChild(style);

// Register the app
AppRegistry.registerComponent(appName, () => App);

AppRegistry.runApplication(appName, {
  initialProps: {},
  rootTag: document.getElementById("root")
});
