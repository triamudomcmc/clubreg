const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  purge: [
    './src/**/*.{js,jsx,ts,tsx,vue}'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      display: [
        'Inter var',
        'IBM Plex Sans Thai',
        ...defaultTheme.fontFamily.sans,
      ],
    },
    extend: {
      screens: {
        "minClubs2": "366px",
        "minClubs": "387px"
      },
      colors: {
        "TUCMC-pink": {
          100: "#FFF5F7",
          400: "#F687B3",
          500: "#ED64A6"
        },
        "TUCMC-gray": {
          100: "#f7fafc",
          400: "#CBD5E0",
          500: "#A0AEC0",
          600: "#718096",
          700: "#4A5568",
          800: "#2D3748",
          900: "#1A202C"
        },
        "TUCMC-red": {
          400: "#FC8181"
        },
        "TUCMC-blue": {
          400: "#63B3ED"
        },"TUCMC-green": {
          100: "#F0FFF4",
          400: "#68D391"
        },"TUCMC-orange": {
          200: "#FEEBC8",
          400: "#F6AD55",
          500: "#ED8936"
        }
      },
    }
  },
  variants: {
    extend: {
      backgroundColor: ['hover']
    },
  },
  plugins: [
    function ({ addBase, addComponents, theme }) {
      addBase([
        {
          '@font-face': {
            fontFamily: 'Inter var',
            fontWeight: '100 900',
            fontStyle: 'normal',
            fontNamedInstance: 'Regular',
            fontDisplay: 'swap',
            src: 'url("/assets/fonts/Inter-roman.var.woff2") format("woff2")',
          },
        },
        {
          '@font-face': {
            fontFamily: 'Inter var',
            fontWeight: '100 900',
            fontStyle: 'italic',
            fontNamedInstance: 'Italic',
            fontDisplay: 'swap',
            src: 'url("/assets/fonts/Inter-italic.var.woff2") format("woff2")',
          },
        },
        {
          '@font-face': {
            fontFamily: 'IBM Plex Sans Thai',
            fontStyle: 'normal',
            fontWeight: '400',
            fontDisplay: 'swap',
            src:
                'local("IBM Plex Sans Thai"), local("IBMPlexSansThai"), url("/assets/fonts/IBMPlexSansThai-Regular.woff2") format("woff2")',
          },
        },
        {
          '@font-face': {
            fontFamily: 'IBM Plex Sans Thai',
            fontStyle: 'normal',
            fontWeight: '450',
            fontDisplay: 'swap',
            src:
                'local("IBM Plex Sans Thai Text"), local("IBMPlexSansThai-Text"), url("/assets/fonts/IBMPlexSansThai-Text.woff2") format("woff2")',
          },
        },
        {
          '@font-face': {
            fontFamily: 'IBM Plex Sans Thai',
            fontStyle: 'normal',
            fontWeight: '500',
            fontDisplay: 'swap',
            src:
                'local("IBM Plex Sans Thai Medium"), local("IBMPlexSansThai-Medium"), url("/assets/fonts/IBMPlexSansThai-Medium.woff2") format("woff2")',
          },
        },
        {
          '@font-face': {
            fontFamily: 'IBM Plex Sans Thai',
            fontStyle: 'normal',
            fontWeight: '600',
            fontDisplay: 'swap',
            src:
                'local("IBM Plex Sans Thai SemiBold"), local("IBMPlexSansThai-SemiBold"), url("/assets/fonts/IBMPlexSansThai-SemiBold.woff2") format("woff2")',
          },
        },
        {
          '@font-face': {
            fontFamily: 'IBM Plex Sans Thai',
            fontStyle: 'normal',
            fontWeight: '700',
            fontDisplay: 'swap',
            src:
                'local("IBM Plex Sans Thai Bold"), local("IBMPlexSansThai-Bold"), url("/assets/fonts/IBMPlexSansThai-Bold.woff2") format("woff2")',
          },
        },
        {
          '@font-face': {
            fontFamily: 'IBM Plex Sans Thai',
            fontStyle: 'normal',
            fontWeight: '100',
            fontDisplay: 'swap',
            src:
                'local("IBM Plex Sans Thai Thin"), local("IBMPlexSansThai-Thin"), url("/assets/fonts/IBMPlexSansThai-Thin.woff2") format("woff2")',
          },
        },
        {
          '@font-face': {
            fontFamily: 'IBM Plex Sans Thai',
            fontStyle: 'normal',
            fontWeight: '200',
            fontDisplay: 'swap',
            src:
                'local("IBM Plex Sans Thai ExtraLight"), local("IBMPlexSansThai-ExtraLight"), url("/assets/fonts/IBMPlexSansThai-ExtraLight.woff2") format("woff2")',
          },
        },
        {
          '@font-face': {
            fontFamily: 'IBM Plex Sans Thai',
            fontStyle: 'normal',
            fontWeight: '300',
            fontDisplay: 'swap',
            src:
                'local("IBM Plex Sans Thai Light"), local("IBMPlexSansThai-Light"), url("/assets/fonts/IBMPlexSansThai-Light.woff2") format("woff2")',
          },
        },
        {
          '@font-face': {
            fontFamily: 'Sukhumvit Set',
            fontDisplay: 'swap',
            src: "local('Sukhumvit Set')",
            unicodeRange: 'U+0E01-0E5B, U+200C-200D, U+25CC',
          },
        },
      ])
    },
    require('@tailwindcss/forms')
  ],
}
