import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  // State to hold password input
  const [pw, setPw] = useState("");

  // State to hold any error messages
  const [err, setErr] = useState("");

  // State to toggle password visibility
  const [showPw, setShowPw] = useState(false);

  // Access admin password stored in your environment variable (.env)
  // Make sure your file is named `.env` or `.env.local` and variable starts with VITE_
  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

  // Function runs when login form is submitted
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents default form reload behavior

    // Log values to verify what is being compared (for debugging only)
    console.log({
      entered: pw,
      env: ADMIN_PASSWORD,
      match: pw.trim() === ADMIN_PASSWORD.trim(),
    });

    // Compare entered password with environment password (both trimmed)
    // The String() wrapper prevents undefined/null comparison issues
    if (String(pw).trim() === String(ADMIN_PASSWORD).trim()) {
      // Store a session flag so admin stays logged in during this browser session
      sessionStorage.setItem("rahmah_admin_auth", "true");

      // Redirect to admin dashboard
      navigate("/admin");
    } else {
      // Display an error if password doesn't match
      setErr("Incorrect password");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-zinc-900/60 border border-yellow-400/10 rounded-2xl p-8 text-center shadow-lg">
        {/* Page Title */}
        <h2 className="text-3xl font-semibold text-yellow-200 mb-2">
          Admin Login
        </h2>

        {/* Subtitle / Instruction */}
        <p className="text-sm text-yellow-100/60 mb-6">
          Enter the admin password to manage Rahmah Knits
        </p>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Password input with toggle eye icon */}
          <div className="relative">
            <input
              type={showPw ? "text" : "password"} // Toggle visibility
              value={pw}
              onChange={(e) => setPw(e.target.value)} // Update password state
              placeholder="Password"
              className="w-full p-3 pr-12 rounded-lg bg-zinc-900 border border-zinc-700 text-yellow-100"
            />

            {/* Eye toggle button (shows or hides password) */}
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-yellow-400"
            >
              {showPw ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Submit button (must have type="submit" for form to trigger onSubmit) */}
          <button
            type="submit"
            className="py-3 rounded-lg bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition"
          >
            Sign in
          </button>

          {/* Error message display */}
          {err && <div className="text-red-400 text-sm">{err}</div>}
        </form>
      </div>
    </div>
  );
}
