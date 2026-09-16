import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl || !databaseUrl.startsWith("postgres")) {
	throw new Error("DATABASE_URL não configurada ou inválida");
}

const sql = neon(databaseUrl);

const db = drizzle({ client: sql });

export default db;