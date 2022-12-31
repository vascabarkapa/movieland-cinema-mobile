import {Dimensions} from "react-native";

const {width, height} = Dimensions.get("window");

export const COLORS = {
    // base colors
    primary: '#1E293B',
    secondary: '#4f46e5',
    default: '#111827',
    white: '#FFFFFF'
}

export const SIZES = {
    // global

    // font

    // app
    width,
    height
}

const appTheme = {COLORS, SIZES};

export default appTheme;

