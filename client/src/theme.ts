import { createTheme } from '@mui/material';
import Garamond from './fonts/garamond/Garamond.ttf';
import NeueHass from './fonts/neueHass/NeueHaasUnicaPro-Medium.ttf';

const theme = createTheme({
	palette: {
		primary: {
			main: '#FFFFFF',
			contrastText: '#000000',
		},
		secondary: {
			main: '#000000',
			contrastText: '#FFFFFF',
		},
	},
	typography: {
		fontFamily: [NeueHass, Garamond].join(','),
	},
});

export default theme;
