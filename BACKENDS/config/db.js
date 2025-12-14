import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgres://rahmahknits_user:***@dpg-d3r4l8fdiees73aq5kng-a.oregon-postgres.render.com/rahmahknits",
  ssl: {
    rejectUnauthorized: false,
  },

  // 🔧 Stability-focused optimizations
  max: 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

pool
  .query("SELECT 1")
  .then(() => console.log("PostgreSQL pool ready"))
  .catch((err) => console.error("PostgreSQL startup check failed:", err.message));

pool.on("error", (err) => {
  console.error("Unexpected PostgreSQL pool error:", err.message);
});

export default pool;
