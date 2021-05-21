const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  purge: [
    './src/**/*.{js,jsx,ts,tsx,vue}'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    textColor: {
      white: "rgb(var(--text-white))",
      black: "rgb(var(--text-black))",
      "TUCMC-pink": {
        100: "rgba(var(--text-pink-100), var(--tw-bg-opacity, 1))",
        400: "rgba(var(--text-pink-400), var(--tw-bg-opacity, 1))",
        500: "rgba(var(--text-pink-500), var(--tw-bg-opacity, 1))",
        600: "rgba(var(--text-pink-600), var(--tw-bg-opacity, 1))"
      }
    },
    fontFamily: {
      sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      display: [
        'Inter var',
        'Noto Sans Thai',
        ...defaultTheme.fontFamily.sans,
      ],
      texts: [
          'Bai Jamjuree'
      ]
    },
    extend: {
      screens: {
        "minClubs2": "366px",
        "minClubs": "387px",
        "xs": "441px"
      },
      colors: {
        white: "rgb(var(--white))",
        black: "rgb(var(--black))",
        "TUCMC-pink": {
          100: "rgba(var(--pink-100), var(--tw-bg-opacity, 1))",
          400: "rgba(var(--pink-400), var(--tw-bg-opacity, 1))",
          500: "rgba(var(--pink-500), var(--tw-bg-opacity, 1))",
          600: "rgba(var(--pink-600), var(--tw-bg-opacity, 1))"
        },
        "TUCMC-gray": {
          100: "rgba(var(--gray-100), var(--tw-bg-opacity, 1))",
          200: "rgba(var(--gray-200), var(--tw-bg-opacity, 1))",
          300: "rgba(var(--gray-300), var(--tw-bg-opacity, 1))",
          400: "rgba(var(--gray-400), var(--tw-bg-opacity, 1))",
          500: "rgba(var(--gray-500), var(--tw-bg-opacity, 1))",
          600: "rgba(var(--gray-600), var(--tw-bg-opacity, 1))",
          700: "rgba(var(--gray-700), var(--tw-bg-opacity, 1))",
          800: "rgba(var(--gray-800), var(--tw-bg-opacity, 1))",
          900: "rgba(var(--gray-900), var(--tw-bg-opacity, 1))"
        },
        "TUCMC-red": {
          100: "rgba(var(--red-100), var(--tw-bg-opacity, 1))",
          400: "rgba(var(--red-400), var(--tw-bg-opacity, 1))",
          500: "rgba(var(--red-500), var(--tw-bg-opacity, 1))",
          600: "rgba(var(--red-600), var(--tw-bg-opacity, 1))"
        },
        "TUCMC-blue": {
          400: "rgba(var(--blue-400), var(--tw-bg-opacity, 1))"
        },"TUCMC-green": {
          100: "rgba(var(--green-100), var(--tw-bg-opacity, 1))",
          400: "rgba(var(--green-400), var(--tw-bg-opacity, 1))",
          500: "rgba(var(--green-500), var(--tw-bg-opacity, 1))"
        },"TUCMC-orange": {
          100: "rgba(var(--orange-100), var(--tw-bg-opacity, 1))",
          200: "rgba(var(--orange-200), var(--tw-bg-opacity, 1))",
          400: "rgba(var(--orange-400), var(--tw-bg-opacity, 1))",
          500: "rgba(var(--orange-500), var(--tw-bg-opacity, 1))"
        }
      },
    }
  },
  variants: {
    extend: {
      backgroundColor: ['hover'],
      zIndex: ['hover']
    },
  },
  plugins: [
    function ({ addBase, addComponents, theme, variants, addUtilities}) {
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
            fontFamily: 'Noto Sans Thai',
            fontStyle: 'normal',
            fontWeight: '400',
            fontDisplay: 'swap',
            src:
                'local("Noto Sans Thai"), local("NotoSansThai"), url("/assets/fonts/NotoSansThai-Regular.woff2") format("woff2")',
          },
        },
        {
          '@font-face': {
            fontFamily: 'Noto Sans Thai',
            fontStyle: 'normal',
            fontWeight: '900',
            fontDisplay: 'swap',
            src:
                'local("Noto Sans Thai Black"), local("NotoSansThai-Black"), url("/assets/fonts/NotoSansThai-Black.woff2") format("woff2")',
          },
        },
        {
          '@font-face': {
            fontFamily: 'Noto Sans Thai',
            fontStyle: 'normal',
            fontWeight: '500',
            fontDisplay: 'swap',
            src:
                'local("Noto Sans Thai Medium"), local("NotoSansThai-Medium"), url("/assets/fonts/NotoSansThai-Medium.woff2") format("woff2")',
          },
        },
        {
          '@font-face': {
            fontFamily: 'Noto Sans Thai',
            fontStyle: 'normal',
            fontWeight: '600',
            fontDisplay: 'swap',
            src:
                'local("Noto Sans Thai SemiBold"), local("NotoSansThai-SemiBold"), url("/assets/fonts/NotoSansThai-SemiBold.woff2") format("woff2")',
          },
        },
        {
          '@font-face': {
            fontFamily: 'Noto Sans Thai',
            fontStyle: 'normal',
            fontWeight: '700',
            fontDisplay: 'swap',
            src:
                'local("Noto Sans Thai Bold"), local("NotoSansThai-Bold"), url("/assets/fonts/NotoSansThai-Bold.woff2") format("woff2")',
          },
        },
        {
          '@font-face': {
            fontFamily: 'Noto Sans Thai',
            fontStyle: 'normal',
            fontWeight: '800',
            fontDisplay: 'swap',
            src:
                'local("Noto Sans Thai ExtraBold"), local("NotoSansThai-ExtraBold"), url("/assets/fonts/NotoSansThai-ExtraBold.woff2") format("woff2")',
          },
        },
        {
          '@font-face': {
            fontFamily: 'Noto Sans Thai',
            fontStyle: 'normal',
            fontWeight: '100',
            fontDisplay: 'swap',
            src:
                'local("Noto Sans Thai Thin"), local("NotoSansThai-Thin"), url("/assets/fonts/NotoSansThai-Thin.woff2") format("woff2")',
          },
        },
        {
          '@font-face': {
            fontFamily: 'Noto Sans Thai',
            fontStyle: 'normal',
            fontWeight: '200',
            fontDisplay: 'swap',
            src:
                'local("Noto Sans Thai ExtraLight"), local("NotoSansThai-ExtraLight"), url("/assets/fonts/NotoSansThai-ExtraLight.woff2") format("woff2")',
          },
        },
        {
          '@font-face': {
            fontFamily: 'Noto Sans Thai',
            fontStyle: 'normal',
            fontWeight: '300',
            fontDisplay: 'swap',
            src: 'local("Noto Sans Thai Light"), local("NotoSansThai-Light"), url("/assets/fonts/NotoSansThai-Light.woff2") format("woff2")',
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
        {
          '@font-face': {
            fontFamily: 'Bai Jamjuree',
            fontStyle: 'normal',
            fontWeight: '400',
            fontDisplay: 'swap',
            src: 'local("Bai Jamjuree"), local("BaiJamjuree"), url("/assets/fonts/BaiJamjuree-Regular.woff2") format("woff2")',
          },
        },
      ])
    },
    require('@tailwindcss/forms')
  ],
}
