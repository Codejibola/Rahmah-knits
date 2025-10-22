import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // ✅ import cors
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import pool from "./config/db.js";
import ProductRoutes from "./routes/ProductRoutes.js";
import messageRoutes from "./routes/MessagesRoutes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ===== Multer Configuration =====
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Max 5MB
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp/;
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.test(ext)) cb(null, true);
    else cb(new Error("Only image files are allowed (jpeg, jpg, png, webp)!"));
  },
});

class App {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 5000;

    this.middlewares();
    this.routes();
    this.database();
  }

  middlewares() {
    // Enable CORS for frontend
    this.app.use(
      cors({
        origin: " * ", 
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
      })
    );
    


    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // Serve uploaded files publicly
    this.app.use("/uploads", express.static(path.join(__dirname, "uploads")));
  }

  routes() {
    this.app.use("/api/products", ProductRoutes);
    this.app.use("/api/messages", messageRoutes);

    // File upload endpoint
    this.app.post("/api/upload", upload.single("image"), (req, res) => {
      try {
        res.status(200).json({
          message: "File uploaded successfully",
          imageUrl: `/uploads/${req.file.filename}`,
        });
      } catch (error) {
        res.status(500).json({ message: "Upload failed", error: error.message });
      }
    });

    // Root route
    this.app.get("/", (req, res) => {
      res.send("Welcome to RahmahKnits API 🧶");
    });
  }

  async database() {
    try {
      await pool.connect();
      console.log("Connected to PostgreSQL successfully");
    } catch (error) {
      console.error(" Database connection failed:", error.message);
    }
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`✅ Server running on http://localhost:${this.port}`);
    });
  }
}

const server = new App();
server.start();
