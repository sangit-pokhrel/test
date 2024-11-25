const ContactMessage = require("../models/contactModel");

// Controller function to handle saving a contact message
const createMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Check if all required fields are present
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create a new message
    const newMessage = new ContactMessage({
      name,
      email,
      message,
    });

    // Save the message to the database
    await newMessage.save();

    // Send a success response
    res.status(201).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { createMessage };
// Controller function to fetch all contact messages (for admin dashboard)
const getMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Failed to retrieve messages." });
  }
};

module.exports = {
  createMessage,
  getMessages,
};
