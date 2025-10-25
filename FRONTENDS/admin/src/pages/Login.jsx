import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [showPw, setShowPw] = useState(false);

  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (pw.trim() === ADMIN_PASSWORD.trim()) {
      sessionStorage.setItem("rahmah_admin_auth", "true");
      setTimeout(() => navigate("/admin"), 100); // small delay for mobile
    } else {
      setErr("Incorrect password");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-zinc-900/60 border border-yellow-400/10 rounded-2xl p-8 text-center shadow-lg">
        <h2 className="text-3xl font-semibold text-yellow-200 mb-2">
          Admin Login
        </h2>
        <p className="text-sm text-yellow-100/60 mb-6">
          Enter the admin password to manage Rahmah Knits
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Password input with toggle */}
          <div className="relative">
            <input
              type={showPw ? "text" : "password"}
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder="Password"
              className="w-full p-3 pr-12 rounded-lg bg-zinc-900 border border-zinc-700 text-yellow-100"
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-yellow-400"
            >
              {showPw ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            className="py-3 rounded-lg bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition"
          >
            Sign in
          </button>

          {err && <div className="text-red-400 text-sm">{err}</div>}
        </form>
      </div>
    </div>
  );
}
