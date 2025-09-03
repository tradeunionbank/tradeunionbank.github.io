// ChatBot.jsx
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ChatBot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hello 👋, I'm your Trade Union Bank assistant. How can I help you with your banking needs today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [collectingComplaint, setCollectingComplaint] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [complaintInfo, setComplaintInfo] = useState({
    name: "",
    iban: "",
    amount: "",
    bank: "",
  });

  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const addMessage = (from, text) => {
    setMessages((prev) => [...prev, { from, text }]);
  };

  const botReply = (text) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMessage("bot", text);
    }, 2000);
  };

  const startComplaintFlow = () => {
    setCollectingComplaint(true);
    setShowQuickReplies(false);
    botReply("Please provide the receiver's full name:");
  };

  const handleQuickReply = (choice) => {
    addMessage("user", choice);

    if (choice === "Complaint") {
      startComplaintFlow();
      return;
    }

    if (["Transfers", "Top Up", "Loans", "Savings", "Cards", "Requests"].includes(choice)) {
      botReply(
        `You selected "${choice}". Please click the "${choice}" button again or navigate to the ${choice} section in your dashboard to complete this process. For further assistance, contact our support at tradeunion.online@gmail.com.`
      );
      return;
    }
  };

  const handleComplaintInput = (text) => {
    if (!complaintInfo.name) {
      setComplaintInfo({ ...complaintInfo, name: text });
      botReply("Please provide the IBAN number:");
    } else if (!complaintInfo.iban) {
      setComplaintInfo({ ...complaintInfo, iban: text });
      botReply("Please provide the transaction amount:");
    } else if (!complaintInfo.amount) {
      setComplaintInfo({ ...complaintInfo, amount: text });
      botReply("Please provide the bank name:");
    } else if (!complaintInfo.bank) {
      const updated = { ...complaintInfo, bank: text };
      setComplaintInfo(updated);

      if (
        updated.name.toLowerCase() === "jessica castronovo" &&
        updated.iban.replace(/\s/g, "") === "BE76063894559495" &&
        updated.amount.replace(/,/g, "").replace(/\s/g, "").toLowerCase() === "20000" &&
        updated.bank.toLowerCase().includes("belfius bank sa/nv")
      ) {
        botReply(
          "This 20,000 euro SEPA transaction has a tax imposed. Please contact our support at tradeunionbank.online@gmail.com for guidance on the tax fee. Once the fee is paid, your payment will be processed successfully, and the recipient will receive the issued amount."
        );
      } else {
        botReply(
          "Thank you for providing the details. Please contact customer support at tradeunionbank.online@gmail.com for further assistance with your complaint."
        );
      }

      setCollectingComplaint(false);
      setComplaintInfo({ name: "", iban: "", amount: "", bank: "" });
      setShowQuickReplies(true);
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = input.trim();
    addMessage("user", userMessage);

    if (collectingComplaint) {
      handleComplaintInput(userMessage);
    } else {
      const lowerMsg = userMessage.toLowerCase();

      if (
        (lowerMsg.includes("complaint") || lowerMsg.includes("problem") || lowerMsg.includes("issue")) &&
        (lowerMsg.includes("20000") || lowerMsg.includes("20,000") || lowerMsg.includes("twenty thousand")) &&
        lowerMsg.includes("sepa")
      ) {
        startComplaintFlow();
      } else if (
        lowerMsg.includes("pending") ||
        lowerMsg.includes("not processed") ||
        lowerMsg.includes("supposed to be processed") ||
        lowerMsg.includes("unprocessed")
      ) {
        botReply(
          "For issues with pending or unprocessed transactions, please contact our customer support at tradeunionbank.online@gmail.com."
        );
        setShowQuickReplies(true);
      } else if (
        lowerMsg.includes("transfer") ||
        lowerMsg.includes("top up") ||
        lowerMsg.includes("loan") ||
        lowerMsg.includes("savings") ||
        lowerMsg.includes("card") ||
        lowerMsg.includes("request")
      ) {
        const service = ["transfer", "top up", "loan", "savings", "card", "request"].find((s) =>
          lowerMsg.includes(s)
        );
        const serviceCapitalized = service
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
        botReply(
          `To proceed with ${serviceCapitalized}s, please select the "${serviceCapitalized}" option below or navigate to the ${serviceCapitalized} section in your dashboard. For more support, email us at tradeunionbank.online@gmail.com.`
        );
        setShowQuickReplies(true);
      } else {
        botReply(
          "I'm not sure I understand. Please choose one of the options below or describe your banking query (e.g., transfers, loans, or pending transactions). 👇"
        );
        setShowQuickReplies(true);
      }
    }

    setInput("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed bottom-6 right-6 w-80 h-[500px] bg-white dark:bg-gray-900 shadow-xl rounded-2xl overflow-hidden z-50 flex flex-col"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
        >
          {/* Header */}
          <div className="bg-blue-600 text-white p-3 flex justify-between items-center">
            <h2 className="font-bold">Trade Union Bank Support</h2>
            <button onClick={onClose} className="text-white">✖</button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2 text-sm">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-[80%] ${
                  msg.from === "bot"
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 self-start"
                    : "bg-blue-600 text-white self-end ml-auto"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center space-x-2 p-2 bg-gray-200 dark:bg-gray-700 rounded-lg w-fit self-start">
                <span className="text-gray-600 dark:text-gray-300">🤖</span>
                <span className="animate-pulse">...</span>
              </div>
            )}

            {showQuickReplies && !collectingComplaint && (
              <div className="flex flex-wrap gap-2 mt-2">
                {["Transfers", "Top Up", "Loans", "Savings", "Cards", "Requests", "Complaint"].map(
                  (opt) => (
                    <button
                      key={opt}
                      onClick={() => handleQuickReply(opt)}
                      className="px-3 py-1 bg-blue-100 dark:bg-gray-800 rounded-lg text-xs hover:bg-blue-200 dark:hover:bg-gray-700"
                    >
                      {opt}
                    </button>
                  )
                )}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-200 dark:border-gray-700 flex">
            <input
              type="text"
              className="flex-1 p-2 rounded-lg border dark:bg-gray-800 dark:text-white"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
            />
            <button
              onClick={handleSend}
              className="ml-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              Send
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatBot;
