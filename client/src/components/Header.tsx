import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer } from '@mui/material';
import { Close } from '@mui/icons-material';
import { Route, Routes, useNavigate } from 'react-router-dom';

export default function Header() {
	const [isOpen, setIsOpen] = React.useState(false);
	const navigate = useNavigate();

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};
	const anchor = 'left';

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Drawer anchor={anchor} open={isOpen} onClose={toggleMenu}>
					<IconButton
						onClick={toggleMenu}
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}>
						<Close />
					</IconButton>
				</Drawer>

				<Toolbar>
					<IconButton
						onClick={toggleMenu}
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" fontWeight={'xl'} component="div" sx={{ flexGrow: 1 }}>
						Мероприятия
					</Typography>
					<Button onClick={() => navigate('/login')} color="inherit">
						Войти
					</Button>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
