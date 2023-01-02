import {Dimensions} from "react-native";

const {width, height} = Dimensions.get("window");

export const COLORS = {
    primary: '#111827',
    secondary: '#4f46e5',
    default: '#1E293B',
    white: '#FFFFFF',
    gray: '#F1F5F9',
}

export const SIZES = {
    width,
    height
}

const appTheme = {COLORS, SIZES};

export default appTheme;

