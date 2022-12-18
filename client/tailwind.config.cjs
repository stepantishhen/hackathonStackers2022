/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#FFFFFF',
				secondary: '#2B2D42',
				danger: '#D80032',
				accent: '#8D99AE',
			},
			fontFamily: {
				primary: ['Roboto', 'sans-serif'],
			},
		},
	},
	plugins: [],
};
