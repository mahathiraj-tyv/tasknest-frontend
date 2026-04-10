import { useState } from "react";
import API from "../services/api";
import "./Chat.css";

function Chat({ onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await API.post(
        "/chat",
        { message: input },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const botMsg = { sender: "bot", text: res.data.reply };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
    }

    setInput("");
  };

  return (
    <div className="chat-container">
      {/* HEADER */}
    <div className="chat-header">
      <span>TaskNest Assistant</span>
      <button className="chat-close" onClick={onClose}>✖</button>
    </div>

    <div className="chat-box">
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`chat-bubble ${
            msg.sender === "user" ? "user" : "bot"
          }`}
        >
          {msg.text}
        </div>
      ))}
    </div>

    <div className="chat-input">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask about your tasks..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  </div>
);
}

export default Chat;