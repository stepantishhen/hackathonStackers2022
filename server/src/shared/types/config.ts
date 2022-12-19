export type TConfig = {
  isProd: boolean;
  PORT: number;
  DATABASE_URL: string;
  TOKEN_ACCESS_KEY: string;
  TOKEN_REFRESH_KEY: string;
  httpOnlyCookieAge: number;
  cookieRefreshTokenKey: 'refreshToken';
  BOT_TOKEN: string;
  TG_USER_ID: string;
};
