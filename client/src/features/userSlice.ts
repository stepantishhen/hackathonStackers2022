import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';

export interface UserState {
	id: string;
	firstName: string;
	surname: string;
	patronymic: string;
	type: string;
	age: number;
}

const initialState: UserState = {
	id: '',
	firstName: '',
	surname: '',
	patronymic: '',
	type: '',
	age: 0,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<UserState>) => {
			state.id = action.payload.id;
			state.firstName = action.payload.firstName;
			state.surname = action.payload.surname;
			state.patronymic = action.payload.patronymic;
			state.type = action.payload.type;
			state.age = action.payload.age;
		},
		getUser: () => {
			const token = localStorage.getItem('accessToken');
			if (token) {
				const user: UserState = jwtDecode(token);
				console.log(user);
				return user;
			}
		},
	},
});

// Action creators are generated for each case reducer function
export const { setUser, getUser } = userSlice.actions;

export default userSlice.reducer;
