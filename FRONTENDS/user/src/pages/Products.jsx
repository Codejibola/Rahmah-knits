import { useEffect, useState } from "react";
import { useCart } from "../context/CartProvider";
import {useNavigate} from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "https://rahmah-knits.onrender.com/api/products"
        );
        const data = await res.json();

        // Normalize MongoDB _id → id
        const normalized = data.map((p) => ({
          ...p,
          id: p._id,
        }));

        setProducts(normalized);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="py-20 px-6 md:px-24">
      {/* SECTION TITLE */}
      <h2 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-12 text-center">
        Our Collection
      </h2>

      {/* LOADING STATE */}
      {loading && (
        <div className="flex justify-center items-center min-h-[200px]">
          <p className="text-[#B8A99A] text-lg animate-pulse">
            Loading products...
          </p>
        </div>
      )}

      {/* PRODUCTS GRID */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-[#1f1b16] rounded-2xl p-4 shadow-lg hover:shadow-yellow-400/10 transition"
            >
              <img
                src={p.image}
                alt={p.name}
                className="h-64 w-full object-cover rounded-xl"
              />

              <div className="mt-4 text-center">
                <h3 className="font-semibold text-lg">{p.name}</h3>
                <p className="text-yellow-400 mt-1">₦{p.price}</p>

                <button
                  onClick={() => {
                    addToCart(p);
                    navigate("/cart");
                  }}
                  className="mt-4 bg-yellow-400 text-black px-6 py-2 rounded-full font-semibold hover:bg-yellow-300 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
