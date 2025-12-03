"use client";
import { useEffect, useState } from "react";
import { apiRequest } from "../../lib/api";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const data = await apiRequest("/orders/customer");
    setOrders(data);
  };

  useEffect(() => { fetchOrders(); }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="p-4 bg-white rounded shadow">
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Delivery:</strong> {order.delivery}</p>
              <p><strong>Total:</strong> {order.total} SAR</p>
              <div className="mt-2">
                <strong>Items:</strong>
                <ul className="list-disc ml-6">
                  {order.cart.map((i, idx) => (
                    <li key={idx}>{i.item.name} x {i.quantity} {i.note && `(${i.note})`}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
