import { ThemeProvider } from '@emotion/react';
import { Box, Button, Container, CssBaseline, TextField, Typography } from '@mui/material';
import React from 'react';
import theme from '../theme';

const EventCreateForm = ({ handleSubmit }: any) => {
	return (
		<>
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
						<Typography component="h1" variant="h5">
							Создать ивент
						</Typography>
						<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
							<TextField
								margin="normal"
								color="secondary"
								required
								fullWidth
								id="name"
								label="Название"
								name="name"
								autoFocus
							/>
							<TextField
								margin="normal"
								required
								color="secondary"
								fullWidth
								name="description"
								label="Описание"
								type="description"
								id="description"
							/>
							<TextField
								margin="normal"
								required
								color="secondary"
								fullWidth
								name="date"
								type="date"
								id="date"
							/>
							<TextField
								margin="normal"
								required
								color="secondary"
								fullWidth
								name="place"
								label="Место"
								type="place"
								id="place"
							/>

							<Button
								color="secondary"
								type="submit"
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2 }}>
								Создать
							</Button>
						</Box>
					</Box>
				</Container>
			</ThemeProvider>
		</>
	);
};

export default EventCreateForm;
