import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: "./db/migrations",
  dialect: "sqlite",
  schema: "./db/schema.ts",
  migrations: {
    prefix: "timestamp",
    table: "__drizzle_migrations__",
    schema: "public",
  },
});
