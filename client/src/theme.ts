import { createTheme } from '@mui/material';
import Garamond from './fonts/garamond/Garamond.ttf';
import NeueHass from './fonts/neueHass/NeueHaasUnicaPro-Medium.ttf';

export const theme = createTheme({
	palette: {
		primary: {
			main: '#FFFFFF',
			contrastText: '#000000',
		},
		secondary: {
			main: '#D80032',
			contrastText: '#FFFFFF',
		},
	},
	typography: {
		fontFamily: [NeueHass, Garamond].join(','),
	},
});
