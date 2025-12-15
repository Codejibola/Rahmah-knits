import { getPool, resetPool } from "./db.js";

/**
 * Execute a PostgreSQL query with automatic recovery
 * from terminated connections (Render cold starts)
 */
export async function dbQuery(text, params = []) {
  try {
    return await getPool().query(text, params);
  } catch (err) {
    if (err.message && err.message.includes("terminated")) {
      console.warn("🔄 DB connection terminated. Recreating pool and retrying...");
      resetPool();
      return await getPool().query(text, params);
    }
    throw err;
  }
}
