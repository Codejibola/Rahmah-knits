import express from "express";
import ProductController from "../controllers/ProductController.js";
import upload from "../config/multer.js";

const router = express.Router();

router.get("/", ProductController.getAll);
router.get("/:id", ProductController.getById);
router.post("/", upload.single("image"), ProductController.create);
router.put("/:id", upload.single("image"), ProductController.update);
router.delete("/:id", ProductController.delete);

export default router;
