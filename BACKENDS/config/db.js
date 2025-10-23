import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgres://rahmahknits_user:pVQ6EvLNKjbMvM4F9wcq8Cbbhx25ZS5M@dpg-d3r4l8fdiees73aq5kng-a.oregon-postgres.render.com/rahmahknits",
  ssl: {
    rejectUnauthorized: false, // ✅ Required for Render
  },
});

// ✅ Only log once when pool is created — don’t call pool.connect()
pool
  .query("SELECT NOW()")
  .then(() => console.log("✅ PostgreSQL pool ready"))
  .catch((err) => console.error("❌ PostgreSQL connection error:", err.message));

// Optional: handle idle connection errors gracefully
pool.on("error", (err) => {
  console.error("⚠️ Unexpected PostgreSQL error", err.message);
});

export default pool;
