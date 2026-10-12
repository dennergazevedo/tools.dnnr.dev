import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

let client: NeonQueryFunction<false, false> | null = null;

// Lazily created so `next build` can import route modules without DATABASE_URL.
function getClient() {
  if (!client) {
    if (!process.env.DATABASE_URL) {
      throw new Error(
        "DATABASE_URL is not defined in the environment variables."
      );
    }
    client = neon(process.env.DATABASE_URL);
  }
  return client;
}

export const sql: NeonQueryFunction<false, false> = ((
  strings: TemplateStringsArray,
  ...params: unknown[]
) => getClient()(strings, ...params)) as NeonQueryFunction<false, false>;
