import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
    palette: {
        mode: 'light',
        common: {
            black: '#000000',
            white: '#FFFFFF',
            transparent: 'transparent',
        },
        primary: {
            main: '#657ef8',
            light: '#657ef8',
            dark: '#657ef8',
        },
        secondary: {
            main: '#282828',
            light: '#ffffff',
            dark: '#282828',
        },
        error: {
            main: '#ff5d6c',
            light: '#ff5d6c',
            dark: '#ff5d6c',
        }
    },
    typography: {
        fontFamily: 'Mulish',
        fontSize: 16,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
    },
    border: {
      radius: '4px',
    }
};