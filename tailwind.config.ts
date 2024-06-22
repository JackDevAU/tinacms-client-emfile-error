/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',

        // Or if using `src` directory:
        './src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            screens: {
                xs: '480px',
            },
            colors: {
                'special-green': '#007958',
                't-gray': '#5E5E5E',
            },
            fontFamily: {
                sans: ['Raleway'],
                serif: ['Nexa'],
            },
        },
    },
    plugins: [require('@tailwindcss/forms')],
};
