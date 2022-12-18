export type ApiSuccessResponse<T> = {
	success: true;
	statusCode: number;
	message?: string;
	data: T;
};

export type ApiErrorResponse = {
	success: false;
	error: string;
	statusCode: number;
};

export type CreateUserType = {
	email: string;
	password: string;
};

export type AuthResponseType = {
	accessToken: string;
};

export type UserAuthType = {
	id: string;
	iat: number;
	exp: number;
};
