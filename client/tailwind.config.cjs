/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#FFFFFF',
				primaryContrast: '#000000',
				secondary: '#3b82f6',
				secondaryContrast: '#FFFFFF',
				danger: '#D80032',
				dangerContrast: '#FFFFFF',
				accent: '#fca311',

				accentContrast: '#000000',
			},
		},
		fontFamily: {
			inter: ['Inter', 'sans-serif'],
			montserrat: ['Montserrat', 'sans-serif'],
		},
		gridTemplateRows: {
			eventLayout: '2fr auto',
			profileLayout: '1fr 1fr',
		},
		gridTemplateColumns: {
			profileLayout: '1fr 1fr 1fr',
			eventLayout: 'minmax(200px, 325px) auto ',
		},
	},
	plugins: [require('@tailwindcss/line-clamp')],
};
