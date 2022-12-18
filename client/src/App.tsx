import { ThemeProvider, useTheme } from '@emotion/react';
import jwtDecode from 'jwt-decode';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import theme from './theme';

function App() {
	const verifyUser = () => {
		const token = localStorage.getItem('accessToken');
		console.log(token);
		return token ? true : false;
	};

	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route path="/login" element={<Login />}></Route>
					<Route path="/register" element={<Register />}></Route>
					<Route path="/profile" element={<Profile />}></Route>
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
