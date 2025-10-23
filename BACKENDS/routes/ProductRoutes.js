import express from "express";
import multer from "multer";
import ProductController from "../controllers/ProductController.js";

const router = express.Router();

// Memory storage for Cloudinary uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/", ProductController.getAll);
router.get("/:id", ProductController.getById);
router.post("/", upload.single("image"), ProductController.create);
router.put("/:id", upload.single("image"), ProductController.update);
router.delete("/:id", ProductController.delete);

export default router;
