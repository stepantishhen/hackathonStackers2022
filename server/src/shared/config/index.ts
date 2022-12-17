import { TConfig } from 'src/shared/types';

const getEnvVar = (key: string) => {
  if (process.env[key] === undefined) {
    throw new Error(`Env variable ${key} is required`);
  }
  return process.env[key] || '';
};

const isProd = getEnvVar('NODE_ENV') === 'production';

export default (): TConfig => ({
  isProd,
  PORT: Number(getEnvVar('PORT')),
  DATABASE_URL: getEnvVar('DATABASE_URL'),
  TOKEN_ACCESS_KEY: getEnvVar('TOKEN_ACCESS_KEY'),
  TOKEN_REFRESH_KEY: getEnvVar('TOKEN_REFRESH_KEY'),
  cookieRefreshTokenKey: 'refreshToken',
  httpOnlyCookieAge: 30 * 24 * 60 * 60 * 1000,
});
