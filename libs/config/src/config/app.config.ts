import { registerAs } from '@nestjs/config';

export enum ConfigKeys {
  App = 'App',
}

const AppConfig = registerAs(ConfigKeys.App, () => ({
  AUTH_SERVER: 3000,
  EDUCATION_SERVER: 3001,
  ENROLL_SERVER: 3002,
  USER_MICROSERVICE: 5002
}));

export const configurations = [AppConfig];
