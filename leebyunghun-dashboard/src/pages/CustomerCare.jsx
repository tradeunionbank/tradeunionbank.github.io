import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001'); // Point to your backend

const CustomerCare = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isAdminActive, setIsAdminActive] = useState(false); // Track if admin is active

  // Send initial bot message when the component mounts
  useEffect(() => {
    socket.emit('send_message', {
      text: "Hello! How may I be of assistance to you?",
      sender: 'bot',
      timestamp: new Date(),
    });
    
    // Listen for incoming messages
    socket.on('receive_message', (data) => {
      setMessages((prev) => [...prev, data]);
      if (data.sender === 'user' && !isAdminActive) {
        // Send admin bot message after user input
        setTimeout(() => {
          socket.emit('send_message', {
            text: "Your request is in process as you're being directed to our admin. Replying in a few minutes...",
            sender: 'bot',
            timestamp: new Date(),
          });
          setIsAdminActive(true); // Admin is now active
        }, 1000); // Slight delay before sending bot message
      }
    });

    return () => {
      socket.off('receive_message');
    };
  }, [isAdminActive]);

  const handleSend = () => {
    if (input.trim() === '') return;
    const messageData = {
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };
    socket.emit('send_message', messageData);
    setInput('');
  };

  return (
    <div className="w-full sm:max-w-md md:max-w-l mx-auto p-4 mt-10 border rounded-lg shadow-lg flex flex-col h-[500px]">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-md max-w-[80%] ${
              msg.sender === 'user'
                ? 'bg-blue-500 text-white self-end ml-auto'
                : msg.sender === 'bot'
                ? 'bg-gray-300 text-black self-start'
                : 'bg-green-100 text-black self-start'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex border-t rounded p-2">
        <input
          type="text"
          className="flex-1 text-black border rounded-3xl px-3 py-2 mr-2 focus:outline-none"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default CustomerCare;
