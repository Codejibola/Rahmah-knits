import { useState } from "react";
import emailjs from "@emailjs/browser";
//eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Basic client-side validation before sending
    if (!form.name || !form.email || !form.message) {
      setLoading(false);
      setStatus("error");
      setErrorMessage("Please fill in all fields.");
      setTimeout(() => setStatus(""), 4000);
      return;
    }

    // Basic email format check
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(form.email)) {
      setLoading(false);
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      setTimeout(() => setStatus(""), 4000);
      return;
    }

    emailjs
      .send(
        "service_40tfur9",
        "template_rhqsp1q",
        {
          name: form.name,
          email: form.email,
          message: form.message,
        },
        "amQahp5w5ZcLj-FI0"
      )
      .then((response) => {
        // Log full response for debugging (status, text)
        console.log("EmailJS response:", response);
        setLoading(false);
        setStatus("success");
        setErrorMessage("");
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setStatus(""), 4000);
      })
      .catch((error) => {
        // EmailJS can return useful info in the error object / response body
        console.error("EmailJS error:", error);
        let msg = "Failed to send. Please try again.";
        // Try to pick a human-friendly message from common fields
        if (error && error.text) msg = error.text;
        else if (error && error.statusText) msg = error.statusText;
        else if (error && error.message) msg = error.message;

        setLoading(false);
        setStatus("error");
        setErrorMessage(msg);
        setTimeout(() => setStatus(""), 4000);
      });
  };

  return (
    <section
      id="contact"
      className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white py-20 px-6 flex flex-col justify-center items-center relative overflow-hidden"
    >
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-semibold mb-10 text-center"
      >
        Get In Touch
      </motion.h2>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="max-w-lg w-full bg-zinc-800/50 backdrop-blur-md rounded-2xl shadow-lg p-8 flex flex-col gap-6 border border-zinc-700"
      >
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
          className="p-3 rounded-lg bg-zinc-900 border border-zinc-700 focus:border-amber-500 outline-none transition-all"
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Your Email"
          required
          className="p-3 rounded-lg bg-zinc-900 border border-zinc-700 focus:border-amber-500 outline-none transition-all"
        />
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Your Message"
          rows="5"
          required
          className="p-3 rounded-lg bg-zinc-900 border border-zinc-700 focus:border-amber-500 outline-none transition-all resize-none"
        ></textarea>

        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0px 0px 12px rgba(255, 191, 0, 0.7)" }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          disabled={loading}
          className="py-3 bg-amber-600 text-black font-semibold rounded-lg transition-all hover:bg-amber-500"
        >
          {loading ? "Sending..." : "Send Message"}
        </motion.button>
      </motion.form>

      <AnimatePresence>
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: -60, scale: 1 }}
            exit={{ opacity: 0, y: -100, scale: 0.8 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute bottom-40 text-green-400 font-medium text-lg"
          >
            <motion.div
              animate={{ opacity: [1, 0.5, 1], y: [-2, -6, -2] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="bg-green-500/10 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-green-500/30"
            >
              ✨ Message sent successfully!
            </motion.div>
          </motion.div>
        )}

        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: -60 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 1.2 }}
            className="absolute bottom-40 text-red-400 font-medium text-lg bg-red-500/10 backdrop-blur-md px-6 py-3 rounded-full border border-red-500/30"
          >
            <div>Failed to send. Please try again.</div>
            {errorMessage && (
              <div className="mt-2 text-sm text-red-200">{errorMessage}</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;
