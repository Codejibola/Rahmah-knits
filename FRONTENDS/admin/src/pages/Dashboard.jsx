import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch products from backend API
        const res = await fetch("https://rahmah-knits.onrender.com/api/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("❌ Error fetching products:", err);
      }

      try {
        // Fetch messages from backend API instead of localStorage
        const resMsg = await fetch("https://rahmah-knits.onrender.com/api/messages");
        if (!resMsg.ok) throw new Error("Failed to fetch messages");
        const dataMsg = await resMsg.json();
        setMessages(dataMsg.reverse()); // show newest first
      } catch (err) {
        console.error("❌ Error fetching messages:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen bg-black text-yellow-200">
      <Sidebar />
      <div className="flex-1">
        <Header title="Dashboard" subtitle="Overview & quick stats" />
        <main className="p-6 md:p-10">
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Products Count */}
            <div className="p-6 rounded-2xl bg-zinc-900 border border-yellow-400/10">
              <h3 className="text-sm text-yellow-100/60">Products</h3>
              <p className="mt-4 text-3xl font-semibold">
                {loading ? "..." : products.length}
              </p>
            </div>

            {/* Messages Count */}
            <div className="p-6 rounded-2xl bg-zinc-900 border border-yellow-400/10">
              <h3 className="text-sm text-yellow-100/60">Messages</h3>
              <p className="mt-4 text-3xl font-semibold">
                {loading ? "..." : messages.length}
              </p>
            </div>
          </div>

          {/* Recent Messages Section */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Recent Messages</h3>
            <div className="space-y-3">
              {loading ? (
                <div className="text-yellow-100/60">Loading...</div>
              ) : messages.length === 0 ? (
                <div className="text-yellow-100/60">No messages yet</div>
              ) : (
                messages.slice(0, 5).map((m, i) => (
                  <div
                    key={m.id || i}
                    className="p-4 rounded-lg bg-zinc-900 border border-yellow-400/10"
                  >
                    <div className="flex justify-between">
                      <div>
                        <div className="font-medium">{m.name}</div>
                        <div className="text-sm text-yellow-100/60">{m.email}</div>
                      </div>
                      <div className="text-sm text-yellow-100/60">
                        {new Date(m.created_at).toLocaleString()}
                      </div>
                    </div>
                    <p className="mt-2 text-yellow-100/70 text-sm">{m.message}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
