import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import pool from "./config/db.js";
import ProductRoutes from "./routes/ProductRoutes.js";
import messageRoutes from "./routes/MessagesRoutes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class App {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 5000;

    this.middlewares();
    this.routes();
    this.database();
  }

  middlewares() {
    this.app.use(
      cors({
        origin: "*", // ✅ Allow all origins (adjust for production)
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
      })
    );

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  routes() {
    this.app.use("/api/products", ProductRoutes);
    this.app.use("/api/messages", messageRoutes);

    // Root route
    this.app.get("/", (req, res) => {
      res.send("Welcome to RahmahKnits API 🧶");
    });
  }

  async database() {
  console.log("✅ PostgreSQL initialized");
}


  start() {
    this.app.listen(this.port, () => {
      console.log(`🚀 Server running on http://localhost:${this.port}`);
    });
  }
}

const server = new App();
server.start();
