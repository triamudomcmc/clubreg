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
                'Noto Sans Thai',
                ...defaultTheme.fontFamily.sans,
            ],
            texts: [
                'Bai Jamjuree'
            ]
        },
        extend: {
            cursor: {
                magnify: "zoom-in"
            },
            screens: {
                "minClubs2": "366px",
                "marg": "405px",
                "minClubs": "387px",
                "xs": "441px",
                "pic": "448px"
            },
            colors: {
                "TUCMC-pink": {
                    100: "#FFF5F7",
                    400: "#F687B3",
                    500: "#ED64A6",
                    600: "#D53F8C"
                },
                "TUCMC-gray": {
                    100: "#f7fafc",
                    200: "#EDF2F7",
                    300: "#E2E8F0",
                    400: "#CBD5E0",
                    500: "#A0AEC0",
                    600: "#718096",
                    700: "#4A5568",
                    800: "#2D3748",
                    900: "#1A202C"
                },
                "TUCMC-red": {
                    100: "#FFF5F5",
                    400: "#FC8181",
                    500: "#F56565",
                    600: "#E53E3E",
                },
                "TUCMC-blue": {
                    400: "#63B3ED"
                }, "TUCMC-green": {
                    100: "#F0FFF4",
                    400: "#68D391",
                    500: "#48BB78",
                }, "TUCMC-orange": {
                    100: "#FFFAF0",
                    200: "#FEEBC8",
                    400: "#F6AD55",
                    500: "#ED8936",
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
        function ({addBase, addComponents, theme, variants, addUtilities}) {
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
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography')
    ],
}
