/* Theme.config.js */

const light = {
    bg: {
        primary: "#FFFFFF",
        secondary: "#F8F8F8",
        border: "#EAEAEA",
    },
    text: {
        primary: "#000000",
        secondary: "rgba(0,0,0,0.5)",
    }
}

const dark = {
    bg: {
        primary: "#000000",
        secondary: "#111111",
        border: "#333333",
    },
    text: {
        primary: "#FFFFFF",
        secondary: "rgba(255,255,255,0.5)",
    }
}

export const lightTheme = { ...light }
export const darkTheme = { ...dark }
