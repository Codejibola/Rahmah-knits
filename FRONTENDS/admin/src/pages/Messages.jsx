import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

/**
 * Messages are read from localStorage key: 'rahmah_messages'
 * structure: [{ name, email, message, createdAt }]
 * NOTE: If you want contact submissions to appear here, when sending via frontend,
 * push them to localStorage in addition to sending via EmailJS.
 */

export default function Messages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const m = JSON.parse(localStorage.getItem("rahmah_messages") || "[]");
    setMessages(m.reverse()); // newest first
  }, []);

  const handleDelete = (idx) => {
    if (!confirm("Delete this message?")) return;
    const m = JSON.parse(localStorage.getItem("rahmah_messages") || "[]");
    m.splice(idx, 1);
    localStorage.setItem("rahmah_messages", JSON.stringify(m));
    setMessages(m.reverse());
  };

  return (
    <div className="flex min-h-screen bg-black text-yellow-200">
      <Sidebar />
      <div className="flex-1">
        <Header title="Messages" subtitle="Customer contact submissions" />
        <main className="p-6 md:p-10">
          <div className="space-y-4">
            {messages.length === 0 && <div className="text-yellow-100/60">No messages yet</div>}
            {messages.map((m, i) => (
              <div key={i} className="p-4 bg-zinc-900 border border-yellow-400/10 rounded-2xl">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold">{m.from_name || m.name}</div>
                    <div className="text-sm text-yellow-100/60">{m.from_email || m.email}</div>
                    <div className="text-xs text-yellow-100/50 mt-1">{new Date(m.createdAt || Date.now()).toLocaleString()}</div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button onClick={() => handleDelete(messages.length - 1 - i)} className="text-red-400 text-sm">Delete</button>
                  </div>
                </div>
                <p className="mt-3 text-yellow-100/80">{m.message}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
