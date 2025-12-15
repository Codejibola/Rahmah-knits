import pkg from "pg";
const { Pool } = pkg;

let pool;

function createPool() {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false, // Required for Render
    },
    max: 5,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
  });

  pool.on("error", (err) => {
    console.error("⚠️ PostgreSQL pool error:", err.message);
  });

  console.log("✅ PostgreSQL pool created");
  return pool;
}

// Create initial pool
createPool();

export function getPool() {
  return pool;
}

export function resetPool() {
  console.warn("♻️ Resetting PostgreSQL pool...");
  if (pool) {
    pool.end().catch(() => {});
  }
  createPool();
}
