import { ApiSuccessResponse, AuthResponseType, UserAuthType } from './types';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const accessTokenKey = 'accessToken';
const API_URL = import.meta.env.VITE_API_URL;

export const saveToken = (token: string) => {
	window.localStorage.setItem(accessTokenKey, token);
	const user: UserAuthType = jwtDecode(token);
	// const userStore = useUserStore();
	console.log('user', user);
	// userStore.setUser(user);
};

export const getNewToken = async () => {
	return axios.get<ApiSuccessResponse<AuthResponseType>>(`${API_URL}auth/refresh`, {
		withCredentials: true,
	});
};

export const getToken = () => window.localStorage.getItem(accessTokenKey);

export const checkAuth = async () => {
	try {
		const tokenInStorage = window.localStorage.getItem(accessTokenKey);
		if (!tokenInStorage) return;

		const response = await getNewToken();
		saveToken(response.data.data.accessToken);
	} catch (e) {
		if (axios.isAxiosError(e)) {
			console.log(e.response?.data['message']);
		}
	}
};

export const clearToken = () => window.localStorage.removeItem(accessTokenKey);
