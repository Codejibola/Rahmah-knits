import {dbQuery} from "../config/db.js";

class ProductModel {
  static async getAll() {
    const result = await pool.query("SELECT * FROM products ORDER BY id DESC");
    return result.rows;
  }

  static async getById(id) {
    const result = await dbQuery("SELECT * FROM products WHERE id = $1", [id]);
    return result.rows[0];
  }

  static async create({ name, price, description, image }) {
    const result = await pool.query(
      "INSERT INTO products (name, price, description, image) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, price, description, image]
    );
    return result.rows[0];
  }

  static async update(id, { name, price, description, image }) {
    const result = await pool.query(
      "UPDATE products SET name = $1, price = $2, description = $3, image = $4 WHERE id = $5 RETURNING *",
      [name, price, description, image, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    await pool.query("DELETE FROM products WHERE id = $1", [id]);
    return true;
  }
}

export default ProductModel;
