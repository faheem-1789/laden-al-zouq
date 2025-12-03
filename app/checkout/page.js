// app/checkout/page.js
"use client";
import { useEffect, useState } from "react";
import { apiRequest } from "../../lib/api";
import { auth } from "../../lib/firebase";

export default function CheckoutPage() {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [delivery, setDelivery] = useState("self"); // 'self' or 'car' or 'address'
  const [addressList, setAddressList] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [voucher, setVoucher] = useState("");
  const [voucherInfo, setVoucherInfo] = useState(null);
  const [placing, setPlacing] = useState(false);
  const [note, setNote] = useState("");

  const fetchCart = async () => {
    setLoading(true);
    try {
      const data = await apiRequest("/cart", "GET", null, { requireAuth: true });
      setCart(data || { items: [], total: 0 });
    } catch (err) {
      console.error(err);
    } finally { setLoading(false); }
  };
  const fetchAddresses = async () => {
    try {
      const data = await apiRequest("/customers/addresses", "GET", null, { requireAuth: true });
      setAddressList(data || []);
      if (data && data.length > 0) setSelectedAddress(data[0].id);
    } catch(e){ console.error(e) }
  };

  useEffect(()=> {
    fetchCart();
    fetchAddresses();
  }, []);

  const applyVoucher = async () => {
    try {
      const res = await apiRequest("/vouchers/apply", "POST", { code: voucher, total: cart.total }, { requireAuth: false });
      if (res.ok) {
        setVoucherInfo(res);
      } else {
        alert(res.message || "Invalid voucher");
      }
    } catch (err) {
      alert(err.message || String(err));
    }
  };

  const placeOrder = async () => {
    if (!confirm("Place order (Cash on pickup/delivery)?")) return;
    setPlacing(true);
    try {
      // prepare order cart normalized
      const payloadCart = cart.items.map(it => ({
        item: { id: it.item.id, name: it.item.name, price: it.item.price },
        quantity: it.quantity,
        note: it.note || note
      }));
      const total = voucherInfo ? voucherInfo.final_total : cart.total;
      const orderPayload = {
        cart: payloadCart,
        total,
        delivery: delivery === "address" ? `address:${selectedAddress}` : delivery,
        voucher_code: voucherInfo ? voucher : null
      };
      await apiRequest("/orders", "POST", orderPayload, { requireAuth: true });
      alert("Order placed!");
      // refresh cart
      fetchCart();
      // redirect to orders page
      window.location.href = "/orders";
    } catch (err) {
      alert(err.message || String(err));
    } finally { setPlacing(false); }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold">Items</h3>
        {cart.items.length === 0 ? <div>Your cart is empty.</div> : (
          <div className="space-y-2">
            {cart.items.map(it => (
              <div key={it.cart_id} className="flex justify-between p-2 border rounded">
                <div>
                  <div className="font-semibold">{it.item.name}</div>
                  <div className="text-sm text-gray-600">{it.note}</div>
                </div>
                <div className="text-right">
                  <div>{it.quantity} x {it.item.price} SAR</div>
                </div>
              </div>
            ))}
            <div className="text-right font-bold mt-2">Subtotal: {cart.total} SAR</div>
          </div>
        )}
      </div>

      <div className="bg-white p-4 rounded shadow mt-4">
        <h3 className="font-semibold">Delivery</h3>
        <div className="space-y-2 mt-2">
          <label className="block"><input type="radio" checked={delivery==="self"} onChange={()=>setDelivery("self")} /> Pickup (self)</label>
          <label className="block"><input type="radio" checked={delivery==="car"} onChange={()=>setDelivery("car")} /> Deliver to car</label>
          <label className="block"><input type="radio" checked={delivery==="address"} onChange={()=>setDelivery("address")} /> Deliver to address</label>

          {delivery === "address" && (
            <div className="mt-2">
              <select value={selectedAddress || ""} onChange={e=>setSelectedAddress(e.target.value)} className="p-2 border rounded w-full">
                <option value="">Select address</option>
                {addressList.map(a => <option key={a.id} value={a.id}>{a.label} — {a.city} — {a.address_line}</option>)}
              </select>
              <div className="text-sm text-gray-500 mt-1">Add addresses from your Profile → Addresses</div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow mt-4">
        <h3 className="font-semibold">Voucher</h3>
        <div className="flex gap-2 mt-2">
          <input className="flex-1 p-2 border rounded" value={voucher} onChange={e=>setVoucher(e.target.value)} placeholder="Voucher code" />
          <button onClick={applyVoucher} className="px-4 py-2 bg-blue-600 text-white rounded">Apply</button>
        </div>
        {voucherInfo && <div className="mt-2 text-green-600">Discount: {voucherInfo.discount} — Final total: {voucherInfo.final_total}</div>}
      </div>

      <div className="bg-white p-4 rounded shadow mt-4">
        <h3 className="font-semibold">Notes</h3>
        <textarea className="w-full p-2 border rounded" rows={3} value={note} onChange={e=>setNote(e.target.value)} placeholder="Anything special? e.g. no onion" />
      </div>

      <div className="mt-4 flex justify-end">
        <button onClick={placeOrder} disabled={placing || cart.items.length===0} className="px-6 py-2 bg-green-600 text-white rounded">
          {placing ? "Placing..." : "Place Order (Cash)"}
        </button>
      </div>
    </div>
  );
}
