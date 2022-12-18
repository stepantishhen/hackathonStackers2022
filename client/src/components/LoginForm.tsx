import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { apiInstance } from '../api/api';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { saveToken } from '../api';
import { useNavigate } from 'react-router-dom';
import theme from '../theme';
import { useDispatch } from 'react-redux';
import { UserAuthType } from '../api/types';
import jwtDecode from 'jwt-decode';
import { setUser, UserState } from '../features/userSlice';

export default function LoginForm() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleSubmit = async (event: any) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);

		const response = await apiInstance.post('/auth/login', {
			email: data.get('email'),
			password: data.get('password'),
		});

		console.log({
			response: response,
			email: data.get('email'),
			password: data.get('password'),
		});
		saveToken(response.data.data.accessToken);
		const token = localStorage.getItem('accessToken');
		if (token) {
			const user: UserState = jwtDecode(token);
			dispatch(setUser(user));
		}

		navigate('/');
	};

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Вход
					</Typography>
					<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
						<TextField
							margin="normal"
							color="secondary"
							required
							fullWidth
							id="email"
							label="Электронная почта"
							name="email"
							autoComplete="email"
							autoFocus
						/>
						<TextField
							margin="normal"
							required
							color="secondary"
							fullWidth
							name="password"
							label="Пароль"
							type="password"
							id="password"
							autoComplete="current-password"
						/>

						<Button
							color="secondary"
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}>
							Войти
						</Button>
						<Grid container>
							<Grid item xs>
								<Link color="secondary" href="forgot" variant="body2">
									Забыли пароль?
								</Link>
							</Grid>
							<Grid item>
								<Link color="secondary" href="register" variant="body2">
									{'Зарегистрироваться'}
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
}
