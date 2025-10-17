import React from "react";
//eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function ProductCard({ p, onEdit, onDelete }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-zinc-900 border border-yellow-400/10 rounded-2xl overflow-hidden shadow-md"
    >
      <div className="h-44 bg-cover bg-center" style={{ backgroundImage: `url(${p.image})` }} />
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-yellow-200">{p.name}</h3>
            <p className="text-sm text-yellow-100/70">{p.price}</p>
            <p className="text-sm text-yellow-100/60 mt-2 line-clamp-3">{p.description}</p>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <button
            onClick={() => onEdit(p.id)}
            className="px-3 py-1 rounded-full bg-yellow-400 text-black font-medium hover:opacity-90"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(p.id)}
            className="px-3 py-1 rounded-full bg-transparent border border-red-500 text-red-400 hover:bg-red-500/10"
          >
            Delete
          </button>
        </div>
      </div>
    </motion.div>
  );
}
