import pool from "./db.js";

export async function dbQuery(text, params = []) {
  try {
    return await pool.query(text, params);
  } catch (err) {
    if (err.message === "Connection terminated unexpectedly") {
      console.warn("DB connection dropped. Retrying once...");
      return await pool.query(text, params);
    }
    throw err;
  }
}
