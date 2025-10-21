import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

// Use Render's DATABASE_URL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // required for Render
  },
});

pool
  .connect()
  .then(() => console.log("✅ Connected to Render PostgreSQL successfully"))
  .catch((err) => console.error("❌ PostgreSQL connection error:", err));

export default pool;
