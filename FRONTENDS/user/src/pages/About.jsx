// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen bg-black text-yellow-100 flex flex-col justify-center items-center px-6 md:px-24 text-center"
    >
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 mb-8"
      >
        About Rahmah Knits
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="max-w-3xl text-lg md:text-xl leading-relaxed text-yellow-100/90"
      >
        At Rahmah Knits, we believe that every thread holds a story. Our
        handcrafted pieces blend timeless artistry with modern elegance, made
        from the finest materials to bring you warmth, comfort, and grace. Each
        design is created with care, ensuring that you don’t just wear quality –
        you feel it. From soft scarves to cozy sweaters, every creation embodies
        the spirit of craftsmanship and luxury.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="mt-10"
      >
        <a
          href="#products"
          className="px-6 py-3 border border-yellow-400 text-yellow-300 rounded-full hover:bg-yellow-400 hover:text-black transition-all duration-300"
        >
          Explore Our Creations
        </a>
      </motion.div>
    </section>
  );
}

