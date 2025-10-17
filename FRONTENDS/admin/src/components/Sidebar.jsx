import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // ✅ Mobile menu state

  const handleLogout = () => {
    sessionStorage.removeItem("rahmah_admin_auth");
    navigate("/login");
  };

  const links = [
    { to: "/admin", label: "Dashboard" },
    { to: "/admin/products", label: "Products" },
    { to: "/admin/messages", label: "Messages" },
  ];

  return (
    <>
      {/* 🔹 Desktop Sidebar */}
      <aside className="hidden md:block w-64 bg-black border-r border-yellow-400/10 min-h-screen text-yellow-200">
        <div className="p-6">
          <div className="text-2xl font-semibold mb-6">
            Rahmah<span className="text-yellow-300">Knits</span>
          </div>

          <nav className="flex flex-col gap-2">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md hover:bg-yellow-400/5 transition ${
                    isActive ? "bg-yellow-400/5 border-l-4 border-yellow-400" : ""
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-8">
            <button
              onClick={handleLogout}
              className="w-full py-2 rounded-md bg-yellow-400 text-black font-medium hover:opacity-90 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* 🔹 Mobile Navbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-black border-b border-yellow-400/10 z-40 flex items-center justify-between px-4 py-3">
        <div className="text-xl font-semibold text-yellow-200">
          Rahmah<span className="text-yellow-300">Knits</span>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="text-yellow-300 hover:text-yellow-400"
        >
          <Menu size={26} />
        </button>
      </div>

      {/* 🔹 Mobile Sidebar Drawer */}
      {isOpen && (
        <>
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 90 }}
            className="fixed top-0 left-0 w-64 h-full bg-black border-r border-yellow-400/10 text-yellow-200 z-50"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="text-2xl font-semibold">
                  Rahmah<span className="text-yellow-300">Knits</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-yellow-300 hover:text-yellow-400"
                >
                  <X size={24} />
                </button>
              </div>

              <nav className="flex flex-col gap-2">
                {links.map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    onClick={() => setIsOpen(false)} // close after navigation
                    className={({ isActive }) =>
                      `block px-4 py-2 rounded-md hover:bg-yellow-400/5 transition ${
                        isActive ? "bg-yellow-400/5 border-l-4 border-yellow-400" : ""
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                ))}
              </nav>

              <div className="mt-8">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                  className="w-full py-2 rounded-md bg-yellow-400 text-black font-medium hover:opacity-90 transition"
                >
                  Logout
                </button>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </>
  );
}
