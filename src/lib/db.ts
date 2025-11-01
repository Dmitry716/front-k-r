import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

// Создаём подключение к PostgreSQL
const connectionString = process.env.DATABASE_URL || "postgresql://user:password@localhost:5432/kwork_db";
const pool = new Pool({
  connectionString,
});

export const db = drizzle(pool, { schema });

export { pool };
