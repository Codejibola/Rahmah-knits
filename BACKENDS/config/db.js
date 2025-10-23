import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgres://rahmahknits_user:pVQ6EvLNKjbMvM4F9wcq8Cbbhx25ZS5M@dpg-d3r4l8fdiees73aq5kng-a.oregon-postgres.render.com/rahmahknits",
  ssl: {
    rejectUnauthorized: false, // Required for Render SSL
  },
});

pool.connect()
  .then(() => console.log("✅ Connected to Render PostgreSQL successfully"))
  .catch((err) => console.error("❌ PostgreSQL connection error:", err));

export default pool;

