import { commonEnv } from "./environments.common";

const env: Partial<typeof commonEnv> = {}
export const environment = Object.assign(commonEnv, env);
