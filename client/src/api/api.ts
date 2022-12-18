import { getNewToken, getToken, saveToken } from './index';
import axios, { AxiosRequestConfig } from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const apiInstance = axios.create({
	withCredentials: true,
	baseURL: API_URL as string,
});

apiInstance.interceptors.request.use((config) => {
	const token = getToken();
	if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
	return config;
});

apiInstance.interceptors.response.use(
	(config) => {
		return config;
	},
	async (e) => {
		if (!axios.isAxiosError(e)) return;

		//@ts-ignore
		const originRequest: AxiosRequestConfig<any> & {
			_isRetry?: boolean;
		} = e.config;

		if (e.response?.status === 401 && !originRequest._isRetry) {
			originRequest._isRetry = true;
			try {
				const response = await getNewToken();
				saveToken(response.data.data.accessToken);
				return apiInstance.request(originRequest);
			} catch (e) {
				console.log(e);
			}
		}

		throw e;
	},
);

export { apiInstance };
