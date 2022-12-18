/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#FFFFFF',
				contrast: '#000000',
				secondary: '#2B2D42',
				danger: '#D80032',
				accent: '#8D99AE',
			},
		},
		fontFamily: {
			inter: ['Inter', 'sans-serif'],
			montserrat: ['Montserrat', 'sans-serif'],
		},
		gridTemplateRows: {
			eventLayout: 'auto',
		},
		gridTemplateColumns: {
			eventLayout: 'minmax(250px, 1fr) 2fr',
		},
	},
	plugins: [require('@tailwindcss/line-clamp')],
};
