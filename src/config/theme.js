/**
 * theme.js
 * This file will contain the constants for fontSizes, colors, padding and others
 */

const layouts = {
    horizontalPadding: 16,
    verticalPadding: 20,
    horizontalSpacing: 8,
    verticalSpacing: 8,
    inputFieldHeight: 24,
    keyRowHeight: 64,
    headerHeight: 48,
    iconSize: 24,
    iconSizeSmall: 16,
    iconSizeLarge: 32,
    buttonHeight: 48,
};

const fontSizes = {
    small: 13,
    medium: 16,
    large: 24,
    xLarge: 30,
    xxLarge: 36,
    xxxLarge: 48,
};

const fields = {
    inputLabelSize: 10,
    inputHeight: 44,
    inputFontSize: 16,
};

const fontFamily = {
    sans: {
        bold: "Roboto_Bold",
        extraBold: "Roboto_ExtraBold",
        light: "Roboto_Bold",
        medium: "Roboto_Medium",
        regular: "Roboto",
        thin: "Roboto_Thin",
    },
};

const colors = {
    background: "#FFFFFF",
    text: "#000000",
    // textGray: "#9292B0",
    // lightGray: "#eff1f1",
    backgroundGray: "#f8f8f8",
    borderGray: "#DADDE3",
    // green: "rgba(0,190,0,0.75)",
    // transluscentGreen: "rgba(0,190,0,0.05)",
    // red: "rgba(217,48,37,1)",
    transluscentRed: "rgba(217,48,37,0.05)",
    // yellow: "rgba(255,200,56,1)",
    // primary: "rgba(62, 22, 90, 1)",
    // secondary: "rgba(62, 22, 90, 0.5)",
    // transluscentPrimary: "rgba(246, 239, 251, 0.75)",
    white: "rgba(255, 255, 255, 1)",
    black: "#060f21",
    // transparent: "transparent",
    black: "rgba(6,15,33, 1)",
    transluscentPrimary: "rgba(237, 47, 89, 0.05)",
    white: "white",
    transluscentGreen: "rgba(0,190,0,0.05)",
    primary_: "#ffffff",
    primary: "#899499",
    wavyNav:"#D3D3D3",
    textGray: "#9292B0",
    lightGray: "#eff1f1",
    // backgroundGray: "#f8f8f8",
    green: "rgba(0,190,0,1)",
    red: "rgba(217,48,37,1)",
    yellow: "rgba(255,200,56,1)",
    amber: "rgba(255,191,0, 1)",
    transparent: "transparent",
    borderColor: "#CACDD3",
    slider_4:"#708238", //#a1e3a1
    slider_1:"#a1e3a1",
    slider_2:"",
    slider_3:"",
    blue:"#0000FF",
    transluscent: {
        grey: "rgba(145,150,170,0.2)",
        green: "#f2fff2",
        red: "rgba(217,48,37,0.2)",
        yellow: "rgba(255,200,56,0.1)",
        primary: "rgba(237, 47, 89, 0.05)",
        darkBlue: "rgba(35,67,97, 0.4)",
        black: "rgba(6,15,33, 0.1)",
        white: "rgba(255, 255, 255, 0.2)",
        blue:"rgba(0, 136, 220, 0.6)"
    },
};

const text = {
    default: {
        fontFamily: fontFamily.sans.regular,
        fontSize: fontSizes.medium,
        color: colors.black,
    },
};

const buttons = {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    horizontalPadding: 16,
    verticalPadding: 16,
    backgroundColor: '#818589',
    textColor: "white",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 0.75,
};

const theme = {
    layouts,
    colors,
    text,
    fields,
    fontSizes,
    buttons,
    fontFamily,
};

export default theme;
