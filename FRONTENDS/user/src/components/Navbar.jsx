import { useState, useEffect } from "react";
//eslint-disable-next-line no-unused-vars
import { motion, useScroll, useSpring } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll distance
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Framer Motion scroll progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 25,
    restDelta: 0.001,
  });

  const navItems = [
    { name: "Home", link: "#home" },
    { name: "Products", link: "#products" },
    { name: "About", link: "#about" },
    { name: "Contact", link: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "bg-black/90 backdrop-blur-lg border-b border-yellow-400/20" : "bg-transparent"
      }`}
    >
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-yellow-400 to-yellow-200 origin-left z-[60] shadow-[0_0_10px_#FFD700]"
        style={{ scaleX }}
      />

      <div className="flex items-center justify-between px-6 md:px-20 py-4">
        {/* Logo */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-yellow-400 font-bold text-2xl"
        >
          Rahmah<span className="text-yellow-200">Knits</span>
        </motion.h1>

        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-10 text-yellow-200 font-medium">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.link}
              className="hover:text-yellow-400 transition-colors duration-300"
            >
              {item.name}
            </a>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-yellow-400 focus:outline-none"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <motion.ul
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="md:hidden flex flex-col bg-black/95 text-yellow-200 font-medium space-y-4 px-6 py-4 border-t border-yellow-400/20"
        >
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.link}
              onClick={() => setIsOpen(false)}
              className="hover:text-yellow-400 transition-colors duration-300"
            >
              {item.name}
            </a>
          ))}
        </motion.ul>
      )}
    </motion.nav>
  );
}
