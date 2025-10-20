import MessagesModel from "../models/MessagesModel.js";

class MessagesController {
  static async createMessage(req, res) {
    try {
      const { name, email, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const newMessage = await MessagesModel.create({ name, email, message });

      res.status(201).json({
        success: true,
        message: "Message saved successfully",
        data: newMessage,
      });
    } catch (error) {
      console.error("Error creating message:", error);
      res.status(500).json({ error: "Failed to save message" });
    }
  }

  static async getMessages(req, res) {
    try {
      const messages = await MessagesModel.getAll();
      res.json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  }
}

export default MessagesController;
