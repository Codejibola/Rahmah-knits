import { useCart } from "../context/CartProvider";

export default function Checkout() {
  const { cart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <section className="min-h-screen bg-[#14110E] text-[#E6D5B8] px-6 md:px-24 py-20">
      {/* Header */}
      <div className="mb-12 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-yellow-400">
          Checkout
        </h2>
        <p className="mt-3 text-[#B8A99A]">
          Almost there — review your order details
        </p>
      </div>

      <div className="max-w-3xl mx-auto bg-[#1f1b16] rounded-2xl p-8 shadow-lg">
        {/* Order Summary */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-yellow-300">
            Order Summary
          </h3>

          <div className="space-y-3">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between text-sm text-[#D6C6A8]"
              >
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>₦{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Total */}
        <div className="border-t border-[#3a2f24] pt-6 flex justify-between items-center">
          <p className="text-lg font-semibold">Total</p>
          <p className="text-2xl font-bold text-yellow-400">
            ₦{total}
          </p>
        </div>

        {/* Payment CTA */}
        <div className="mt-10 text-center">
          <button
            disabled
            className="w-full bg-yellow-400/40 text-black py-4 rounded-full font-semibold cursor-not-allowed"
          >
            Pay Now (Coming Soon)
          </button>

          <p className="mt-4 text-sm text-[#B8A99A]">
            Secure payment integration will be available shortly.
          </p>
        </div>
      </div>
    </section>
  );
}
