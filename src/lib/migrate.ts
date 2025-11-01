import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";
import * as schema from "./schema";

const runMigrations = async () => {
  const connectionString = process.env.DATABASE_URL || "postgresql://user:password@localhost:5432/kwork_db";
  const pool = new Pool({
    connectionString,
  });

  const db = drizzle(pool, { schema });

  console.log("Running migrations...");

  try {
    await migrate(db, { migrationsFolder: "./drizzle" });
    console.log("Migrations completed successfully!");
  } catch (error) {
    console.error("Migration error:", error);
    throw error;
  } finally {
    await pool.end();
  }
};

export default runMigrations;
