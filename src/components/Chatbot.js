import { useState } from "react";
import { PaperAirplaneIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! I'm AskAI 🤖. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: "user", text: input }]);
    setInput("");

    // Simulated bot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Thanks for your message! AskAI will assist you shortly." },
      ]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {/* Chat toggle button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center space-x-2 bg-blue-600 p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
        >
          <img
            src="/chatbot-logo.png" // Place a small AI bot logo in public folder
            alt="AskAI Logo"
            className="h-6 w-6 rounded-full"
          />
          <span className="text-white font-semibold text-sm">AskAI</span>
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div className="flex flex-col w-80 h-96 bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center bg-blue-600 p-3">
            <div className="flex items-center space-x-2">
              <img
                src="/chatbot-logo.png"
                alt="AskAI Logo"
                className="h-6 w-6 rounded-full"
              />
              <h2 className="text-white font-bold">AskAI</h2>
            </div>
            <button onClick={() => setIsOpen(false)}>
              <XMarkIcon className="h-5 w-5 text-white" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2 bg-gray-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-lg max-w-[75%] ${
                  msg.from === "bot"
                    ? "bg-gray-200 self-start flex items-center space-x-2"
                    : "bg-blue-600 text-white self-end"
                }`}
              >
                {msg.from === "bot" && (
                  <img
                    src="/chatbot-logo.png"
                    alt="AskAI Logo"
                    className="h-5 w-5 rounded-full"
                  />
                )}
                <span>{msg.text}</span>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex p-2 border-t">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              className="flex-1 border rounded-l px-2 focus:outline-none"
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 px-3 rounded-r hover:bg-blue-700 transition"
            >
              <PaperAirplaneIcon className="h-5 w-5 text-white rotate-90" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
