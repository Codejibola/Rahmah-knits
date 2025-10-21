import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const navigate = useNavigate();
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const ADMIN_PASSWORD = import.meta.env.ADMIN_PASSWORD;


  const handleSubmit = (e) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem("rahmah_admin_auth", "true");
      navigate("/admin");
    } else {
      setErr("Incorrect password");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-zinc-900/60 border border-yellow-400/10 rounded-2xl p-8 text-center shadow-lg">
        <h2 className="text-3xl font-semibold text-yellow-200 mb-2">Admin Login</h2>
        <p className="text-sm text-yellow-100/60 mb-6">Enter the admin password to manage Rahmah Knits</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="Password"
            className="p-3 rounded-lg bg-zinc-900 border border-zinc-700 text-yellow-100"
          />
          <button className="py-3 rounded-lg bg-yellow-400 text-black font-semibold">Sign in</button>
          {err && <div className="text-red-400 text-sm">{err}</div>}
        </form>

  
      </div>
    </div>
  );
}
