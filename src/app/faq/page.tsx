"use client";
import { useState, useEffect, useRef } from "react";
import { Send, Bot, ArrowLeft, MessageCircle } from "lucide-react";
import Link from "next/link";

interface Message {
  id: string;
  text: string;
  sender: "bot" | "user";
  timestamp: Date;
  showWhatsApp?: boolean;
  userQuestion?: string;
  showRegisterButton?: boolean;
  showContactWhatsApp?: boolean;
}

const predefinedQuestions = [
  { id: 1, text: "What are the eligibility criteria?", icon: "🎓" },
  { id: 2, text: "Tell me about courses & program details", icon: "📚" },
  { id: 3, text: "What is the fee structure?", icon: "💰" },
  { id: 4, text: "How do I apply for admissions?", icon: "📝" },
  { id: 5, text: "Where is the campus located?", icon: "📍" },
  { id: 6, text: "Tell me more about ISL Academy", icon: "🏛️" },
];

const faqResponses: Record<string, string> = {
  "eligibility": `This program is ideal for:

• Intermediate students (AEC | CEC | MEC)
• Students pursuing higher education
• Aspiring entrepreneurs
• Working professionals

We welcome anyone passionate about business, leadership, and personal growth! 🚀`,

  "courses": `We offer a 2-Year Integrated Program (IPE + Business & Leadership Training) focused on:

✔ Communication Skills
✔ Business & Entrepreneurial Thinking
✔ Leadership Development
✔ Personality & Life Skills

Not just education - a transformation journey. 🌟`,

  "fees": `We offer a high-value program at an affordable fee structure.

For detailed fee information, please connect with our advisor.

📞 8897860944

Our team will guide you through flexible payment options! 💼`,

  "admissions": `Admissions are open now for the 2026–28 batch!

Steps:
1️⃣ Enquiry
2️⃣ Counselling
3️⃣ Registration
4️⃣ Confirmation

⚡ Only 30 seats – first batch exclusive

Don't miss this opportunity! Apply now! 🎯`,

  "location": `📍 ISL Academy
Bandlaguda Campus, Hyderabad

🕒 Timings will be shared during counselling.

Our campus is equipped with modern facilities to support your learning journey! 🏫`,

  "about": `ISL Academy is dedicated to transforming students into future leaders and entrepreneurs.

🎯 Our Mission: Empower youth with business acumen, leadership skills, and entrepreneurial mindset.

🌟 What Makes Us Different:
• Industry-expert faculty
• Practical, real-world training
• Small batch sizes for personalized attention
• Focus on holistic development

Join us in shaping tomorrow's leaders! 💪`,

  "contact": `📞 Contact ISL Academy

Phone: 8897860944
📍 Location: Bandlaguda Campus, Hyderabad

📧 We're here to help you!

Our team is available to answer all your questions about admissions, courses, and more. 

Feel free to reach out anytime! 😊`,
};

export default function FAQPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "👋 Welcome to ISL Academy! I'm here to help you with any questions about our programs. Click on any question below or type your own!",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showQuestions, setShowQuestions] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Only scroll to bottom when new messages are added, not on initial load
    if (messages.length > 1 || isTyping) {
      scrollToBottom();
    }
  }, [messages, isTyping]);

  const getBotResponse = (userMessage: string): { text: string; showRegister?: boolean } => {
    const lowerMessage = userMessage.toLowerCase();

    // Registration intent detection
    if (lowerMessage.includes("i want to register") || lowerMessage.includes("i want to join") ||
        lowerMessage.includes("want to enroll") || lowerMessage.includes("register me") ||
        lowerMessage.includes("sign me up") || lowerMessage.includes("i want to apply")) {
      return {
        text: `That's wonderful! 🎉 We're excited to have you join ISL Academy!\n\nClick the button below to start your registration process. Our team will guide you through every step.`,
        showRegister: true
      };
    }

    // Contact details
    if (lowerMessage.includes("contact") || lowerMessage.includes("phone") || 
        lowerMessage.includes("number") || lowerMessage.includes("call") ||
        lowerMessage.includes("reach") || lowerMessage.includes("email") ||
        lowerMessage.includes("how to contact") || lowerMessage.includes("get in touch")) {
      return { text: faqResponses.contact };
    }

    // Eligibility related
    if (lowerMessage.includes("eligib") || lowerMessage.includes("who can join") || 
        lowerMessage.includes("can i join") || lowerMessage.includes("qualification") ||
        lowerMessage.includes("criteria") || lowerMessage.includes("requirement")) {
      return { text: faqResponses.eligibility };
    } 
    
    // Courses and program related
    else if (lowerMessage.includes("course") || lowerMessage.includes("program") || 
             lowerMessage.includes("detail") || lowerMessage.includes("curriculum") ||
             lowerMessage.includes("what do you teach") || lowerMessage.includes("syllabus") ||
             lowerMessage.includes("subject") || lowerMessage.includes("module")) {
      return { text: faqResponses.courses };
    } 
    
    // Fee related
    else if (lowerMessage.includes("fee") || lowerMessage.includes("cost") || 
             lowerMessage.includes("price") || lowerMessage.includes("payment") ||
             lowerMessage.includes("how much") || lowerMessage.includes("expensive") ||
             lowerMessage.includes("afford") || lowerMessage.includes("scholarship")) {
      return { text: faqResponses.fees };
    } 
    
    // Admissions related
    else if (lowerMessage.includes("admission") || lowerMessage.includes("apply") || 
             lowerMessage.includes("enroll") || lowerMessage.includes("register") ||
             lowerMessage.includes("join") || lowerMessage.includes("seat") ||
             lowerMessage.includes("batch") || lowerMessage.includes("intake")) {
      return { text: faqResponses.admissions, showRegister: true };
    } 
    
    // Location and timing related
    else if (lowerMessage.includes("location") || lowerMessage.includes("campus") || 
             lowerMessage.includes("where") || lowerMessage.includes("timing") ||
             lowerMessage.includes("address") || lowerMessage.includes("time") ||
             lowerMessage.includes("schedule") || lowerMessage.includes("when") ||
             lowerMessage.includes("bandlaguda") || lowerMessage.includes("hyderabad")) {
      return { text: faqResponses.location };
    } 
    
    // About ISL Academy - expanded keywords
    else if (lowerMessage.includes("about") || lowerMessage.includes("isl") || 
             lowerMessage.includes("academy") || lowerMessage.includes("who are you") ||
             lowerMessage.includes("what is isl") || lowerMessage.includes("tell me about") ||
             lowerMessage.includes("mission") || lowerMessage.includes("vision") ||
             lowerMessage.includes("founder") || lowerMessage.includes("chairman") ||
             lowerMessage.includes("director") || lowerMessage.includes("history") ||
             lowerMessage.includes("established") || lowerMessage.includes("started")) {
      return { text: faqResponses.about };
    } 
    
    // Greetings
    else if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || 
             lowerMessage.includes("hey") || lowerMessage.includes("good morning") ||
             lowerMessage.includes("good afternoon") || lowerMessage.includes("good evening")) {
      return { text: `Hello! 👋 Welcome to ISL Academy!\n\nI'm here to help you learn about our programs. Feel free to ask me anything about:\n\n• Eligibility & Requirements\n• Courses & Programs\n• Fees & Payment\n• Admissions Process\n• Campus Location\n• About ISL Academy\n\nHow can I assist you today? 😊` };
    }
    
    // Thank you
    else if (lowerMessage.includes("thank") || lowerMessage.includes("thanks")) {
      return { text: `You're welcome! 😊\n\nIf you have any more questions, feel free to ask. We're here to help!\n\nYou can also reach us at:\n📞 8897860944` };
    }
    
    // Unknown questions - trigger WhatsApp
    else {
      return { text: "fallback" };
    }
  };

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputValue.trim();
    if (!textToSend) return;

    // Hide questions after first interaction
    if (!hasInteracted) {
      setHasInteracted(true);
      setShowQuestions(false);
    }

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: textToSend,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = getBotResponse(textToSend);
      
      // Check if it's a fallback response (unknown question)
      const isFallback = botResponse.text === "fallback";
      
      // Check if response contains contact number
      const hasContactNumber = botResponse.text.includes("8897860944") || botResponse.text.includes("📞");
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: isFallback 
          ? `I don't have a specific answer for that question right now. 🤔\n\nBut don't worry! Our team is ready to help you personally.`
          : botResponse.text,
        sender: "bot",
        timestamp: new Date(),
        showWhatsApp: isFallback,
        userQuestion: isFallback ? textToSend : undefined,
        showRegisterButton: botResponse.showRegister || false,
        showContactWhatsApp: hasContactNumber && !isFallback,
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleQuestionClick = (question: string) => {
    handleSendMessage(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleWhatsAppClick = (question: string) => {
    const phoneNumber = "918897860944"; // WhatsApp number with country code (no + or spaces)
    const message = encodeURIComponent(`Hi! I have a question: ${question}`);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleContactWhatsAppClick = () => {
    const phoneNumber = "918897860944";
    const message = encodeURIComponent(`Hi! I'd like to know more about ISL Academy.`);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#0d1b2e] via-[#1a2332] to-[#0d1b2e] flex flex-col">
      {/* Back Button - Smaller on mobile */}
      <Link href="/">
        <button className="fixed top-2 left-2 md:top-4 md:left-4 z-50 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full p-1.5 md:p-2.5 transition-all duration-300 hover:scale-110 shadow-lg border border-white/10">
          <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
        </button>
      </Link>
      
      {/* Compact Chat Header - Much smaller on mobile */}
      <div className="bg-gradient-to-r from-coral via-[#e94560] to-coral-dark py-2 px-4 md:py-3 md:px-6 shadow-2xl flex-shrink-0 border-b border-white/10">
        <div className="flex items-center justify-center gap-2 md:gap-3 max-w-4xl mx-auto">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center shadow-lg ring-2 ring-white/30">
            <Bot className="w-5 h-5 md:w-6 md:h-6 text-coral" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-sm md:text-lg font-bold text-white tracking-tight">ISL Academy Assistant</h1>
            <p className="text-white/80 text-[10px] md:text-xs font-medium">AI-Powered Support 24/7</p>
          </div>
        </div>
      </div>

      {/* Messages Area - Reduced padding on mobile */}
      <div className="flex-1 overflow-y-auto p-3 md:p-6 pt-4 md:pt-6">
        <div className="max-w-4xl mx-auto space-y-3 md:space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} animate-fadeIn`}
            >
              <div
                className={`max-w-[85%] md:max-w-[60%] rounded-3xl p-3 md:p-4 shadow-2xl backdrop-blur-sm ${
                  message.sender === "user"
                    ? "bg-gradient-to-br from-coral via-[#e94560] to-coral-dark text-white rounded-br-md"
                    : "bg-white/95 text-gray-800 rounded-bl-md border border-gray-100"
                }`}
              >
                <p className="whitespace-pre-line text-xs md:text-base leading-relaxed font-medium">
                  {message.text}
                </p>
                
                {/* Register Button for registration intent */}
                {message.showRegisterButton && (
                  <Link href="/#register">
                    <button
                      className="mt-3 md:mt-4 w-full bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FF8C00] hover:from-[#FFA500] hover:to-[#FF6347] text-white font-bold py-2.5 md:py-3 px-3 md:px-4 rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg text-sm md:text-base"
                    >
                      <span className="text-lg md:text-xl">🎓</span>
                      <span>Register Now</span>
                    </button>
                  </Link>
                )}
                
                {/* WhatsApp Button for contact number responses */}
                {message.showContactWhatsApp && (
                  <button
                    onClick={handleContactWhatsAppClick}
                    className="mt-3 md:mt-4 w-full bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#128C7E] hover:to-[#075E54] text-white font-semibold py-2.5 md:py-3 px-3 md:px-4 rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg text-sm md:text-base"
                  >
                    <MessageCircle className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2.5} />
                    <span>Contact us on WhatsApp</span>
                  </button>
                )}
                
                {/* WhatsApp Button for unknown questions */}
                {message.showWhatsApp && message.userQuestion && (
                  <button
                    onClick={() => handleWhatsAppClick(message.userQuestion!)}
                    className="mt-3 md:mt-4 w-full bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#128C7E] hover:to-[#075E54] text-white font-semibold py-2.5 md:py-3 px-3 md:px-4 rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg text-sm md:text-base"
                  >
                    <MessageCircle className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2.5} />
                    <span>Chat with us on WhatsApp</span>
                  </button>
                )}
                
                <span className={`text-[10px] md:text-xs mt-1.5 md:mt-2 block font-semibold ${message.sender === "user" ? "text-white/60" : "text-gray-400"}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start animate-fadeIn">
              <div className="bg-white/95 rounded-3xl rounded-bl-md p-3 md:p-4 shadow-2xl border border-gray-100">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 md:w-2.5 md:h-2.5 bg-coral rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                  <span className="w-2 h-2 md:w-2.5 md:h-2.5 bg-coral rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                  <span className="w-2 h-2 md:w-2.5 md:h-2.5 bg-coral rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                </div>
              </div>
            </div>
          )}

          {/* Predefined Questions - Show only once */}
          {showQuestions && !hasInteracted && !isTyping && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 pt-3 md:pt-4 animate-fadeIn">
              {predefinedQuestions.map((q) => (
                <button
                  key={q.id}
                  onClick={() => handleQuestionClick(q.text)}
                  className="group relative bg-gradient-to-br from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 backdrop-blur-md border border-white/20 hover:border-coral/50 rounded-2xl p-3 md:p-4 text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-coral/20"
                >
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-coral to-coral-dark rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-base md:text-xl">{q.icon}</span>
                    </div>
                    <span className="text-white text-xs md:text-base font-semibold group-hover:text-coral transition-colors flex-1">
                      {q.text}
                    </span>
                  </div>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-coral/0 via-coral/5 to-coral/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              ))}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area - Smaller on mobile */}
      <div className="bg-gradient-to-r from-coral via-[#e94560] to-coral-dark p-2.5 md:p-4 shadow-2xl flex-shrink-0 border-t border-white/20">
        <div className="flex gap-2 md:gap-3 items-center max-w-4xl mx-auto">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 bg-white/95 backdrop-blur-sm border-2 border-white/30 focus:border-white rounded-full px-4 md:px-6 py-2.5 md:py-3.5 focus:outline-none focus:ring-4 focus:ring-white/30 text-gray-800 placeholder-gray-500 font-medium shadow-lg transition-all duration-200 text-sm md:text-base"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim()}
            className="bg-white text-coral rounded-full p-2.5 md:p-3.5 hover:shadow-2xl hover:shadow-white/40 hover:scale-110 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-none"
          >
            <Send className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
