/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,jsx,ts,tsx}',
        './src/**/*.{js,jsx,ts,tsx}',
    ],
    presets: [require('nativewind/preset')],
    theme: {
        extend: {
            colors: {
                primary: '#18181B',
                surface: '#FFFFFF',
                accent: '#4F46E5',
                border: '#E4E4E7',
                muted: '#71717A',
                danger: '#EF4444',
                warning: '#F59E0B',
                success: '#10B981',
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