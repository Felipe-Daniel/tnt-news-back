import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema.js';

export function createDb(databaseUrl: string) {
  const sql = neon(databaseUrl);
  return drizzle(sql, { schema });
}

export type Database = ReturnType<typeof createDb>;

let dbInstance: Database | null = null;

export function getDb(): Database {
  if (!dbInstance) {
    const url = process.env.DATABASE_URL;
    if (!url) {
      throw new Error('DATABASE_URL is not set');
    }
    dbInstance = createDb(url);
  }
  return dbInstance;
}

export function setDb(db: Database) {
  dbInstance = db;
}

export function resetDb() {
  dbInstance = null;
}
