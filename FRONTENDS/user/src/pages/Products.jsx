//eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const products = [
  {
    name: "Woolen Scarf",
    price: "₦7,500",
    img: "https://images.pexels.com/photos/1631008/pexels-photo-1631008.jpeg",
  },
  {
    name: "Knitted Sweater",
    price: "₦15,000",
    img: "https://images.pexels.com/photos/662760/pexels-photo-662760.jpeg",
  },
  {
    name: "Soft Yarn Bundle",
    price: "₦5,000",
    img: "https://images.pexels.com/photos/207196/pexels-photo-207196.jpeg",
  },
  {
    name: "Crochet Hat",
    price: "₦6,500",
    img: "https://images.pexels.com/photos/2097985/pexels-photo-2097985.jpeg",
  },
  {
    name: "Handmade Blanket",
    price: "₦20,000",
    img: "https://images.pexels.com/photos/212769/blanket-bedding-cushions-home-212769.jpeg",
  },
  {
    name: "Knitting Needles",
    price: "₦3,000",
    img: "https://images.pexels.com/photos/159418/knitting-yarn-needles-159418.jpeg",
  },
];

export default function Products() {
  const phoneNumber = "08063564014";

  const handleWhatsApp = (name, price) => {
    const message = `Hello 👋, I'm interested in purchasing the ${name} priced at ${price}. Is it still available?`;
    const url = `https://wa.me/234${phoneNumber.slice(1)}?text=${encodeURIComponent(message)}`;
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

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
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
              src={product.img}
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
              <p className="text-yellow-400 mb-4 font-medium">{product.price}</p>
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
    </section>
  );
}
