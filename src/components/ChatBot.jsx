import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Headphones, Send, X } from "lucide-react";

const supportEmail = "support@pacifichorizonbank.com";

const ChatBot = ({ isOpen = true, onClose }) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hello, I'm your Pacific Horizon Bank assistant. How can I help with your banking today?",
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
    }, 700);
  };

  const startComplaintFlow = () => {
    setCollectingComplaint(true);
    setShowQuickReplies(false);
    botReply("Please provide the receiver's full name.");
  };

  const handleQuickReply = (choice) => {
    addMessage("user", choice);

    if (choice === "Complaint") {
      startComplaintFlow();
      return;
    }

    botReply(
      `You selected ${choice}. Open the ${choice} service from your dashboard, or contact ${supportEmail} if you need help.`
    );
  };

  const handleComplaintInput = (text) => {
    if (!complaintInfo.name) {
      setComplaintInfo({ ...complaintInfo, name: text });
      botReply("Please provide the IBAN or account number.");
    } else if (!complaintInfo.iban) {
      setComplaintInfo({ ...complaintInfo, iban: text });
      botReply("Please provide the transaction amount.");
    } else if (!complaintInfo.amount) {
      setComplaintInfo({ ...complaintInfo, amount: text });
      botReply("Please provide the bank name.");
    } else if (!complaintInfo.bank) {
      setComplaintInfo({ name: "", iban: "", amount: "", bank: "" });
      setCollectingComplaint(false);
      setShowQuickReplies(true);
      botReply(
        `Thank you. Pacific Horizon Bank support will review the details. For urgent assistance, email ${supportEmail}.`
      );
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

      if (lowerMsg.includes("complaint") || lowerMsg.includes("problem") || lowerMsg.includes("issue")) {
        startComplaintFlow();
      } else if (lowerMsg.includes("pending") || lowerMsg.includes("not processed") || lowerMsg.includes("unprocessed")) {
        botReply(`For pending transaction support, please contact ${supportEmail} with your transaction reference.`);
        setShowQuickReplies(true);
      } else if (
        lowerMsg.includes("transfer") ||
        lowerMsg.includes("top up") ||
        lowerMsg.includes("loan") ||
        lowerMsg.includes("savings") ||
        lowerMsg.includes("card") ||
        lowerMsg.includes("request")
      ) {
        botReply("You can open that service from the dashboard action buttons. I can also help collect complaint details if something is not working.");
        setShowQuickReplies(true);
      } else {
        botReply("Please choose one of the options below or describe your banking question, such as transfers, loans, cards, or pending transactions.");
        setShowQuickReplies(true);
      }
    }

    setInput("");
  };

  const closeChat = () => {
    if (onClose) {
      onClose();
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={onClose ? "fixed bottom-6 right-4 z-50 flex h-[520px] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-lg bg-white shadow-2xl dark:bg-slate-950 sm:right-6" : "mx-auto flex min-h-screen max-w-3xl flex-col bg-white dark:bg-slate-950"}
          initial={{ y: onClose ? 80 : 0, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: onClose ? 80 : 0, opacity: 0 }}
        >
          <div className="flex items-center justify-between bg-sky-700 p-4 text-white">
            <div className="flex items-center gap-3">
              <Headphones className="h-5 w-5" />
              <div>
                <h2 className="font-bold">Pacific Horizon Bank Support</h2>
                <p className="text-xs text-sky-100">Secure customer assistance</p>
              </div>
            </div>
            <button type="button" onClick={closeChat} className="rounded-md p-1 hover:bg-white/10" aria-label="Close support">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4 text-sm dark:bg-slate-900">
            {messages.map((msg, i) => (
              <div
                key={`${msg.from}-${i}`}
                className={`max-w-[84%] rounded-lg px-3 py-2 leading-6 ${
                  msg.from === "bot"
                    ? "bg-white text-slate-800 shadow-sm dark:bg-slate-800 dark:text-slate-100"
                    : "ml-auto bg-sky-600 text-white"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {isTyping && (
              <div className="w-fit rounded-lg bg-white px-3 py-2 text-slate-500 shadow-sm dark:bg-slate-800 dark:text-slate-300">
                Typing...
              </div>
            )}

            {showQuickReplies && !collectingComplaint && (
              <div className="flex flex-wrap gap-2 pt-1">
                {["Transfers", "Top Up", "Loans", "Savings", "Cards", "Requests", "Complaint"].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleQuickReply(opt)}
                    className="rounded-full border border-sky-200 bg-white px-3 py-1 text-xs font-semibold text-sky-800 hover:bg-sky-50 dark:border-slate-700 dark:bg-slate-800 dark:text-sky-200 dark:hover:bg-slate-700"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex gap-2 border-t border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-950">
            <input
              type="text"
              className="min-w-0 flex-1 rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:ring-sky-900"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
            />
            <button type="button" onClick={handleSend} className="rounded-md bg-sky-600 px-3 text-white hover:bg-sky-700" aria-label="Send message">
              <Send className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatBot;
