import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Drawer } from '@mui/material';
import { Close } from '@mui/icons-material';
import { Route, Routes, Search, useNavigate } from 'react-router-dom';

import jwtDecode from 'jwt-decode';

export type Token = {
	email: string;
	firstName: string;
	surname: string;
	patronymic: string;
	age: number;
	type: string;
};

export default function Header() {
	const [isOpen, setIsOpen] = React.useState(false);
	const [searchQuery, setSearchQuery] = React.useState('');
	const [user, setUser] = React.useState<Token | null>(null);
	const navigate = useNavigate();

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	React.useEffect(() => {
		const token = localStorage.getItem('accessToken');
		if (token) {
			const decodedToken: Token = jwtDecode(token);
			const user = {
				...decodedToken,
			};
			setUser(user);
		}
	}, []);

	//decode token
	const anchor = 'left';

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static" color="secondary">
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
					<Typography variant="h6">Разделы</Typography>
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
					<Typography
						variant="h6"
						fontWeight={'xl'}
						onClick={() => navigate('/')}
						component="div"
						sx={{ flexGrow: 1 }}>
						Stackers <span className="underline underline-offset-4 text-blue-300 ">Events</span>
					</Typography>
					{/* <Search>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase
							placeholder={searchQuery ? searchQuery : 'Поиск...'}
							inputRef={(ref) => {
								setSearchQuery(ref?.value);
							}}
							inputProps={{ 'aria-label': 'search' }}
						/>
					</Search> */}

					<Button onClick={() => navigate(user ? '/profile' : '/login')} color="inherit">
						<span className="ml-2 font-bold font-montserrat">
							{user ? user.firstName + ' ' + user.surname : 'Войти'}
						</span>
					</Button>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
{
	/*  */
}
