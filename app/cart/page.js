"use client";
import { useEffect, useState } from "react";
import { apiRequest } from "../../lib/api";

export default function CartPage() {
  const [cart, setCart] = useState({ items: [], total: 0 });

  const fetchCart = async () => {
    const data = await apiRequest("/cart");
    setCart(data);
  };

  useEffect(() => { fetchCart(); }, []);

  const removeItem = async (cartId) => {
    await apiRequest(`/cart/${cartId}`, "DELETE");
    fetchCart();
  };

  const checkout = async () => {
    if (!confirm("Proceed to checkout? Cash only.")) return;
    const delivery = prompt("Enter delivery method (self/delivery):", "self") || "self";
    await apiRequest("/orders", "POST", { cart: cart.items, total: cart.total, delivery });
    alert("Order placed!");
    fetchCart();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart.items.length === 0 ? (
        <p>Cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.items.map(c => (
            <div key={c.cart_id} className="flex justify-between p-4 bg-white rounded shadow">
              <div>
                <h3 className="font-bold">{c.item.name}</h3>
                <p>{c.note}</p>
                <p>Quantity: {c.quantity}</p>
              </div>
              <div className="flex flex-col space-y-2">
                <p>{c.item.price * c.quantity} SAR</p>
                <button onClick={() => removeItem(c.cart_id)} className="bg-red-500 text-white p-1 rounded">Remove</button>
              </div>
            </div>
          ))}
          <div className="text-right font-bold text-lg">Total: {cart.total} SAR</div>
          <button onClick={checkout} className="w-full bg-green-500 text-white p-2 rounded">Checkout (Cash Only)</button>
        </div>
      )}
    </div>
  );
}
