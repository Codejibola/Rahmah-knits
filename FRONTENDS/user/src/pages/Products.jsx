// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const phoneNumber = "08063564014";

  // 🟢 Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://rahmah-knits.onrender.com/api/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("❌ Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleWhatsApp = (name, price) => {
    const message = `Hello 👋, I'm interested in purchasing the ${name} priced at ₦${price}. Is it still available?`;
    const url = `https://wa.me/234${phoneNumber.slice(
      1
    )}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <section
      id="products"
      className="min-h-screen bg-black text-yellow-100 py-20 px-6 md:px-24 text-center"
    >
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 mb-12"
      >
        Our Collection
      </motion.h2>

      {/* Loading State */}
      {loading ? (
        <p className="text-yellow-200 text-lg">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-yellow-200 text-lg">No products available yet.</p>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {products.map((product, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative group overflow-hidden rounded-2xl border border-yellow-400/20 hover:border-yellow-400 transition-all duration-500 shadow-lg hover:shadow-yellow-400/10"
            >
              <img
                src={product.image} // ✅ use DB image
                alt={product.name}
                className="w-full h-72 object-cover rounded-2xl transition-transform duration-700 group-hover:scale-110"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/60 to-transparent 
                flex flex-col items-center justify-end p-6
                opacity-100 md:opacity-0 md:group-hover:opacity-100
                transition-opacity duration-500"
              >
                <p className="text-yellow-200 text-lg font-semibold mb-2">
                  {product.name}
                </p>
                <p className="text-yellow-400 mb-4 font-medium">
                  ₦{product.price}
                </p>
                <button
                  onClick={() => handleWhatsApp(product.name, product.price)}
                  className="bg-yellow-400 text-black font-semibold py-2 px-5 rounded-full hover:bg-yellow-300 transition duration-300 shadow-md hover:shadow-yellow-400/30"
                >
                  Purchase on WhatsApp
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
}
