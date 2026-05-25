/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,jsx,ts,tsx}',
        './components/**/*.{js,jsx,ts,tsx}',
        './features/**/*.{js,jsx,ts,tsx}',
    ],
    presets: [require('nativewind/preset')],
    theme: {
        extend: {
            colors: {
                primary: '#1E2A3A',
                surface: '#F7F8FA',
                accent: '#3B6FD4',
                border: '#CBD2DC',
                muted: '#8A8E94',
                danger: '#D94F4F',
                warning: '#D4A017',
                success: '#2E9E5B',
            },
            fontFamily: {
                sans: ['GoogleSansFlex-Regular'],
                'sans-bold': ['GoogleSansFlex-Bold'],
                serif: ['Lato-Regular'],
                'serif-bold': ['Lato-Bold'],
                'serif-italic': ['Lato-Italic'],
            },
        },
    },
    plugins: [],
};