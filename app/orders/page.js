// app/orders/page.js
"use client";
import { useEffect, useState } from "react";
import { apiRequest } from "../../lib/api";

export default function OrdersPage() {
  const [orders,setOrders]=useState([]);
  const [loading,setLoading]=useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await apiRequest('/orders/customer', 'GET', null, { requireAuth: true });
      setOrders(data || []);
    } catch (err) {
      console.error(err);
      alert(err.message || String(err));
    } finally { setLoading(false); }
  };

  useEffect(()=>{ fetchOrders() },[]);

  if (loading) return <div className="p-6">Loading orders...</div>;

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      {orders.length===0 ? <div>No orders yet.</div> : (
        <div className="space-y-4">
          {orders.map(o => (
            <div key={o.id} className="bg-white p-4 rounded shadow">
              <div className="flex justify-between"><div><strong>Order #{o.id}</strong> — {o.status}</div><div>{new Date(o.created_at).toLocaleString()}</div></div>
              <div className="mt-2">
                {o.items.map((it,idx)=> (
                  <div key={idx} className="flex justify-between border-b py-1">
                    <div>{it.name} x {it.quantity}</div>
                    <div>{(it.unit_price * it.quantity).toFixed(2)} SAR</div>
                  </div>
                ))}
              </div>
              <div className="mt-2 text-right font-bold">Total: {o.total} SAR</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
