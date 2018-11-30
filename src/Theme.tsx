import * as React from 'react'
import injectStylesheet, { ThemeProvider, StyleCreator } from 'react-jss'

const theme = {
    palette: {
        primary: '#56BA89',
        primaryShade: {
            50: '#ebf7f1',
            100: '#cceadc',
            200: '#abddc4',
            300: '#89cfac',
            400: '#6fc49b',
            500: '#56BA89',
            600: '#4fb381',
            700: '#45ab76',
            800: '#3ca36c',
            900: '#2b9459',
            A100: '#d8ffe8',
            A200: '#a5ffca',
            A400: '#72ffac',
            A700: '#58ff9e',
        },

        secondary: '#ff5252',
        secondaryShade: {
            50: '#ffeaea',
            100: '#ffcbcb',
            200: '#ffa9a9',
            300: '#ff8686',
            400: '#ff6c6c',
            500: '#ff5252',
            600: '#ff4b4b',
            700: '#ff4141',
            800: '#ff3838',
            900: '#ff2828',
            A100: '#ffffff',
            A200: '#ffffff',
            A400: '#ffd5d5',
            A700: '#ffbcbc',
            contrastDefaultColor: 'dark',
        },

        black: '#000000',
        white: '#ffffff',
        grey: '#cfd8dc',
    },
    spacing: {},
}

const Theme : React.FunctionComponent = ({ children }) => (
    <ThemeProvider theme={theme}>{React.Children.only(children)}</ThemeProvider>
)

function createStyles<TClasses extends string>(styles : StyleCreator<TClasses, typeof theme>) {
    return styles
}

const globalStyles = {
    '@global': {
        'html, body, #root': {
            height: '100%',
            width: '100%',
            margin: 0,
            padding: 0,
        },
        '*': {
            boxSizing: 'border-box' as 'border-box',
        },
        html: {
            fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
            fontSize: '8px',
        },
        body: {
            fontSize: '1.5rem',
        },
        a: {
            color: theme.palette.secondary,
        },
        // remove the url/title/page from the print vie
        // https://stackoverflow.com/a/2780518/3736051
        '@page': {
            size: 'auto',
            margin: '5mm',
        },
    },
}
const ThemeWithGlobalStyles = injectStylesheet(globalStyles)(Theme)

export default ThemeWithGlobalStyles
export { createStyles }
export { default as injectSheet, WithSheet } from 'react-jss'
