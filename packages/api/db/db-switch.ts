import { drizzle as drizzlePg } from 'drizzle-orm/node-postgres';
import { drizzle as drizzleSqlite } from 'drizzle-orm/better-sqlite3';
import * as pgSchema from './schema/postgres';
import * as sqliteSchema from './schema/sqlite';
import { Pool } from 'pg';
import Database from 'better-sqlite3';


export function getDb() {
  const isPostgres = process.env.DATABASE_URL?.startsWith('postgres');

  if (isPostgres) {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    return drizzlePg(pool, { schema: pgSchema });
  } else {
    const sqlite = new Database(process.env.DATABASE_URL || 'dev.db');
    return drizzleSqlite(sqlite, { schema: sqliteSchema });
  }
}


export function createDb(env: Environment) {
    return drizzle({
        connection: env.DATABASE_URL,
        casing: 'snake_case',
        schema,
    });
}
