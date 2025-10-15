"use client";
import { useState } from "react";

export default function Home() {
  const questions = [
    "Hi, what's your name?",
    "What type of product do you need?",
    "Please select a product from the list (e.g., Shirt, Mug, Cap, etc.)",
    "Please upload your design or image file.",
    "What size do you need?",
    "What quantity do you need?",
    "Please enter your phone number with country code.",
    "Please enter your email address.",
    "Please enter your shipping address.",
  ];

  const [messages, setMessages] = useState([
    { role: "bot", content: "Hi, I'm your order assistant. Let's get started!" },
    { role: "bot", content: questions[0] },
  ]);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input && !file) return;

    const currentQuestion = questions[step];
    const userResponse = file ? file.name : input;
    setMessages((prev) => [...prev, { role: "user", content: userResponse }]);

    // Save answer
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: input || file?.name || "",
    }));

    setInput("");
    setFile(null);

    const nextStep = step + 1;

    if (nextStep < questions.length) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: questions[nextStep] },
      ]);
      setStep(nextStep);
    } else {
      // All questions done → send email
      setLoading(true);
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers),
      });

      const data = await res.json();
      setLoading(false);

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: data.success
            ? "Thank you! Your details have been sent successfully 🎉"
            : "Sorry, something went wrong. Please try again later.",
        },
      ]);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white border shadow-lg rounded-2xl w-80 p-4 text-sm">
      <div className="h-80 overflow-y-auto mb-2 space-y-2">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`${
              m.role === "bot" ? "text-blue-600" : "text-gray-800 text-right"
            }`}
          >
            {m.content}
          </div>
        ))}
      </div>

      {step === 3 ? (
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="border p-2 w-full rounded"
        />
      ) : (
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your answer..."
          className="border p-2 w-full rounded"
        />
      )}

      <button
        onClick={handleSend}
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded w-full"
        disabled={loading}
      >
        {loading ? "Sending..." : "Send"}
      </button>
    </div>
  );
}
