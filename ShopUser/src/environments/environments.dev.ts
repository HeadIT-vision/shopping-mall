import { commonEnv } from "./environments.common";

const env: Partial<typeof commonEnv> = {
  production: true,
  environmentName: 'development',
  REST_API_ADDR: 'http://localhost:8080/api',
}
export const environment = Object.assign(commonEnv, env);
