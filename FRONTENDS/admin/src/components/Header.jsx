import React from "react";
//eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function Header({ title, subtitle }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between border-b border-yellow-400/10 px-6 py-4 bg-black/60"
    >
      <div>
        <h1 className="text-2xl font-semibold text-yellow-200">{title}</h1>
        {subtitle && <p className="text-sm text-yellow-100/60">{subtitle}</p>}
      </div>
    </motion.header>
  );
}
