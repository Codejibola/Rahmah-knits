import { useCart } from "../context/CartProvider";
import { Link } from "react-router-dom";

export default function Cart() {
  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty,
  } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <section className="min-h-screen bg-[#14110E] text-[#E6D5B8] px-6 md:px-24 py-20">
      {/* Header */}
      <div className="mb-12 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-yellow-400">
          Your Cart
        </h2>
        <p className="mt-3 text-[#B8A99A]">
          Adjust quantities before checkout
        </p>
      </div>

      {cart.length === 0 ? (
        <div className="text-center mt-20">
          <p className="text-[#B8A99A] mb-6">
            Your cart is empty.
          </p>
          <Link
            to="/#products"
            className="bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center gap-6 bg-[#1f1b16] rounded-2xl p-5 shadow-lg"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-28 h-28 object-cover rounded-xl"
              />

              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-yellow-400 mt-1">
                  ₦{item.price}
                </p>
              </div>

              {/* Quantity Control */}
              <div className="flex items-center gap-4 bg-[#14110E] rounded-full px-4 py-2">
                <button
                  onClick={() => decreaseQty(item.id)}
                  className="text-xl px-2 hover:text-yellow-400"
                >
                  −
                </button>

                <span className="font-semibold">
                  {item.quantity}
                </span>

                <button
                  onClick={() => increaseQty(item.id)}
                  className="text-xl px-2 hover:text-yellow-400"
                >
                  +
                </button>
              </div>

              <div className="text-right">
                <p className="text-yellow-300 font-semibold">
                  ₦{item.price * item.quantity}
                </p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-sm text-red-400 hover:text-red-300 mt-2"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Summary */}
          <div className="mt-12 bg-[#1a1612] rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xl font-semibold">
              Total:
              <span className="text-yellow-400 ml-2">
                ₦{total}
              </span>
            </p>

            <Link
              to="/checkout"
              className="bg-yellow-400 text-black px-8 py-3 rounded-full font-semibold hover:bg-yellow-300 transition"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
