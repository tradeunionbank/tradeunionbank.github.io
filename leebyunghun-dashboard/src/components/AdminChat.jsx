import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

const AdminChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() === '') return;
    const messageData = {
      text: input,
      sender: 'admin',
      timestamp: new Date(),
    };
    socket.emit('send_message', messageData);
    setInput('');
  };

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, []);

  return (
    <div className="w-full sm:max-w-md md:max-w-l mx-auto mt-10 border rounded-lg shadow-lg flex flex-col h-[500px] bg-white">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-md max-w-[80%] ${
              msg.sender === 'admin'
                ? 'bg-green-600 text-white self-end ml-auto'
                : 'bg-gray-100 text-black self-start'
            }`}
          >
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="flex border-t p-2">
        <input
          type="text"
          className="flex-1 border text-black rounded-3xl px-3 py-2 mr-2 focus:outline-none"
          placeholder="Reply to user..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-green-700 text-white px-4 py-2 rounded-full hover:bg-green-800"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AdminChat;
