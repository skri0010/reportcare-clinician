import { Dimensions } from "react-native";

// These are fixed on load
const { height, width } = Dimensions.get("window");

export const isMobile = height / width > 0.8;
