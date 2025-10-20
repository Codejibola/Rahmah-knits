import express from "express";
import MessagesController from "../controllers/MessagesController.js";

const router = express.Router();

// POST → /api/messages
router.post("/", MessagesController.createMessage);

// GET → /api/messages
router.get("/", MessagesController.getMessages);

export default router;
