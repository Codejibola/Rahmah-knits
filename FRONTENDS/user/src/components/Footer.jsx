// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-black text-yellow-200 border-t border-yellow-400/20 py-10 px-6 md:px-20 text-center">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-2xl font-semibold mb-2">
          RAHMAH<span className="text-yellow-400">KNITS</span>
        </h2>
        <p className="text-yellow-100/80 text-sm mb-6">
          Crafted with love, warmth, and elegance — because every stitch tells a story.
        </p>

        <div className="flex justify-center space-x-6 text-yellow-400 mb-6">
          <a
            href="https://wa.me/2348134493365"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-300 transition-colors duration-300"
          >
            WhatsApp
          </a>
          <a
            href="#products"
            className="hover:text-yellow-300 transition-colors duration-300"
          >
            Products
          </a>
          <a
            href="#about"
            className="hover:text-yellow-300 transition-colors duration-300"
          >
            About
          </a>
          <a
            href="#contact"
            className="hover:text-yellow-300 transition-colors duration-300"
          >
            Contact
          </a>
        </div>

        <p className="text-yellow-100/60 text-xs">
          © {new Date().getFullYear()} Rahmah Knits. All rights reserved.
        </p>
      </motion.div>
    </footer>
  );
}
