import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import ProductController from "../controllers/ProductController.js";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer configuration (same as in server.js)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp/;
    const ext = path.extname(file.originalname).toLowerCase();
    allowed.test(ext) ? cb(null, true) : cb(new Error("Invalid file type"));
  },
});

// Routes
router.get("/", ProductController.getAll);
router.get("/:id", ProductController.getById);
router.post("/", upload.single("image"), ProductController.create);
router.put("/:id", upload.single("image"), ProductController.update);
router.delete("/:id", ProductController.delete);

export default router;
