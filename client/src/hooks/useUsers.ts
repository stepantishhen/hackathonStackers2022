import React from 'react';
import jwtDecode from 'jwt-decode';

type Token = {
	email: string;
	firstName: string;
	surname: string;
	patronymic: string;
	age: number;
	type: string;
};

export default function useUser() {
	const token = localStorage.getItem('accessToken');
	const [user, setUser] = React.useState<Token | null>(null);

	if (token) {
		const decodedToken: Token = jwtDecode(token);
		const user = {
			...decodedToken,
		};
		setUser(user);
	}

	return { user };
}
