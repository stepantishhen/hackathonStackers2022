import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { apiInstance } from '../api/api';
import { FormControl, InputLabel, Select } from '@mui/material';
import { saveToken } from '../api';

const theme = createTheme();

export default function RegistrationForm() {
	const [age, setAge] = useState(0);

	const handleSubmit = async (event: any) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);

		const response = await apiInstance.post('/auth/signup', {
			email: data.get('email'),
			password: data.get('password'),
			firstName: data.get('firstName'),
			surname: data.get('surname'),
			patronymic: data.get('patronymic'),
			age: Number(data.get('age')),
		});

		saveToken(response.data.data.accessToken);

		console.log({
			api: import.meta.env.VITE_API_URL,
			response: response,
			email: data.get('email'),
			password: data.get('password'),
			firstName: data.get('firstName'),
			surname: data.get('surname'),
			patronymic: data.get('patronymic'),
		});
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
						Зарегистрироваться
					</Typography>
					<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
						<TextField
							margin="normal"
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
							fullWidth
							name="password"
							label="Пароль"
							type="password"
							id="password"
							autoComplete="current-password"
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							id="name"
							label="Имя"
							name="firstName"
							autoComplete="email"
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							id="surname"
							label="Фамилия"
							name="surname"
							autoComplete="surname"
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							id="patronymic"
							label="Отчество"
							name="patronymic"
							autoComplete="patronymic"
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							id="age"
							label="Возраст"
							name="age"
							autoComplete="age"
						/>

						<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
							Войти
						</Button>
						<Grid container>
							<Grid item xs>
								<Link href="#" variant="body2">
									Забыли пароль?
								</Link>
							</Grid>
							<Grid item>
								<Link href="#" variant="body2">
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
