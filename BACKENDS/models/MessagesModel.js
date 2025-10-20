import pool from "../config/db.js";

export default class MessagesModel {
  static async create({ name, email, message }) {
    const result = await pool.query(
      `INSERT INTO messages (name, email, message)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [name, email, message]
    );
    return result.rows[0];
  }

  static async getAll() {
    const result = await pool.query(
      `SELECT * FROM messages ORDER BY created_at DESC`
    );
    return result.rows;
  }
}
