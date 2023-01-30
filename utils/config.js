// Load dotenv over Deno.env
import { load } from "$std/dotenv/mod.ts";
import { cleanEnv, port, str, url } from "envalid";

const ENV = cleanEnv(await load(), {
  API_URL: url(),
  BASE_URL: url(),
  DENO_ENV: str({ choices: ["development", "testing", "production"] }),
  PORT: port(),
});

export const {
  API_URL,
  BASE_URL,
  DENO_ENV,
  PORT,
} = ENV;

export default ENV;
