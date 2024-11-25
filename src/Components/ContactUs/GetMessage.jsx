import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/axiosConfig";

const MessagesList = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axiosInstance.get("/contact/messages");
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="container mx-auto my-8 p-4">
      <h2 className="text-2xl font-bold mb-4">Messages</h2>
      {messages.length === 0 ? (
        <p>No messages to display.</p>
      ) : (
        <ul className="space-y-4">
          {messages.map((msg) => (
            <li key={msg._id} className="bg-gray-100 p-4 rounded shadow">
              <h3 className="font-semibold">{msg.name}</h3>
              <p className="text-gray-600">{msg.email}</p>
              <p>{msg.message}</p>
              <p className="text-gray-500 text-sm">
                {new Date(msg.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MessagesList;