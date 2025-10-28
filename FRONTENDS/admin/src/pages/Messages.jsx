import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function Messages() {
  // ✅ Holds all fetched messages
  const [messages, setMessages] = useState([]);

  // ✅ Controls loading state (to show spinner or “loading…”)
  const [loading, setLoading] = useState(true);

  // ✅ Fetch messages from backend when component mounts
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // Fetch all messages from your Render backend API
        const res = await fetch("https://rahmah-knits.onrender.com/api/messages");
        if (!res.ok) throw new Error(`Error ${res.status}`);

        const data = await res.json();

        // Load any previously stored “attended” states from localStorage
        const attendedMap = JSON.parse(localStorage.getItem("attended_messages") || "{}");

        // Merge fetched messages with local attended state
        const merged = data.map((msg) => ({
          ...msg,
          attended: attendedMap[msg.id] || false,
        }));

        // Reverse list to show newest first
        setMessages(merged.reverse());
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      } finally {
        // Hide loading indicator once done
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  // ✅ Helper: Save attended states to localStorage for persistence
  const updateAttendedStorage = (list) => {
    const attendedMap = {};
    list.forEach((m) => {
      if (m.attended) attendedMap[m.id] = true;
    });
    localStorage.setItem("attended_messages", JSON.stringify(attendedMap));
  };

  // ✅ Toggle attended/unattended state for a message
  const toggleAttended = (id) => {
    const updated = messages.map((m) =>
      m.id === id ? { ...m, attended: !m.attended } : m
    );
    setMessages(updated);
    updateAttendedStorage(updated);
  };

  // ✅ Delete a message both locally and on the backend
  const handleDelete = async (id) => {
    if (!confirm("Delete this message?")) return;

    try {
      const res = await fetch(`https://rahmah-knits.onrender.com/api/messages/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete message");

      // Remove deleted message from UI
      const updated = messages.filter((m) => m.id !== id);
      setMessages(updated);

      // Update localStorage to reflect current list
      updateAttendedStorage(updated);
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete message");
    }
  };

  // ✅ Split messages into two groups for display
  const pendingMessages = messages.filter((m) => !m.attended);
  const attendedMessages = messages.filter((m) => m.attended);

  return (
    <div className="flex min-h-screen bg-black text-yellow-200">
      {/* Sidebar navigation */}
      <Sidebar />

      <div className="flex-1">
        {/* Header with title and subtitle */}
        <Header title="Messages" subtitle="Customer contact submissions" />

        {/* Main content area */}
        <main className="p-6 md:p-10 space-y-10">
          {/* ---------- PENDING ISSUES SECTION ---------- */}
          <section>
            <h3 className="text-xl font-semibold mb-4 text-yellow-300">
              Pending Issues
            </h3>

            {loading ? (
              // While fetching data
              <div className="text-yellow-100/60 animate-pulse">
                Loading messages...
              </div>
            ) : pendingMessages.length === 0 ? (
              // When there are no pending messages
              <div className="text-yellow-100/60">No pending issues</div>
            ) : (
              // Display list of pending messages
              <div className="space-y-4">
                {pendingMessages.map((m) => (
                  <div
                    key={m.id}
                    className="p-4 bg-zinc-900 border border-yellow-400/10 rounded-2xl"
                  >
                    <div className="flex justify-between items-start">
                      {/* Left side: checkbox + details */}
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={m.attended}
                          onChange={() => toggleAttended(m.id)}
                          className="w-5 h-5 accent-yellow-400 cursor-pointer"
                        />
                        <div>
                          <div className="font-semibold">{m.name}</div>
                          <div className="text-sm text-yellow-100/60">
                            {m.email}
                          </div>
                          <div className="text-xs text-yellow-100/50 mt-1">
                            {new Date(m.created_at).toLocaleString()}
                          </div>
                        </div>
                      </div>

                      {/* Delete button */}
                      <button
                        onClick={() => handleDelete(m.id)}
                        className="text-red-400 text-sm hover:text-red-300"
                      >
                        Delete
                      </button>
                    </div>

                    {/* Message content */}
                    <p className="mt-3 text-yellow-100/80">{m.message}</p>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* ---------- ATTENDED ISSUES SECTION ---------- */}
          <section>
            <h3 className="text-xl font-semibold mb-4 text-green-400">
              Attended Issues
            </h3>

            {attendedMessages.length === 0 ? (
              // When no attended messages yet
              <div className="text-yellow-100/60">No attended issues yet.</div>
            ) : (
              // Display attended messages
              <div className="space-y-4">
                {attendedMessages.map((m) => (
                  <div
                    key={m.id}
                    className="p-4 bg-zinc-900 border border-green-400/20 rounded-2xl"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={m.attended}
                          onChange={() => toggleAttended(m.id)}
                          className="w-5 h-5 accent-green-400 cursor-pointer"
                        />
                        <div>
                          <div className="font-semibold">{m.name}</div>
                          <div className="text-sm text-yellow-100/60">
                            {m.email}
                          </div>
                          <div className="text-xs text-yellow-100/50 mt-1">
                            {new Date(m.created_at).toLocaleString()}
                          </div>
                        </div>
                      </div>

                      {/* Delete button */}
                      <button
                        onClick={() => handleDelete(m.id)}
                        className="text-red-400 text-sm hover:text-red-300"
                      >
                        Delete
                      </button>
                    </div>

                    {/* Message content */}
                    <p className="mt-3 text-yellow-100/80">{m.message}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
