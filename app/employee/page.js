"use client";
import { useEffect, useState } from "react";
import { apiRequest } from "../../lib/api";

export default function EmployeeDashboard() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const data = await apiRequest("/orders");
    setOrders(data);
  };

  useEffect(() => { fetchOrders(); }, []);

  const toggleStatus = async (id) => {
    await apiRequest(`/orders/${id}/toggle`, "PUT");
    fetchOrders();
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Employee Dashboard - Orders</h2>
      {orders.length === 0 ? <p>No orders yet.</p> :
        <div className="space-y-4">
          {orders.map(o => (
            <div key={o.id} className="p-4 bg-white rounded shadow flex justify-between items-center">
              <div>
                <p><strong>Customer UID:</strong> {o.customer_uid}</p>
                <p><strong>Status:</strong> {o.status}</p>
                <p><strong>Total:</strong> {o.total} SAR</p>
              </div>
              <button onClick={()=>toggleStatus(o.id)} className="bg-blue-500 text-white p-2 rounded">Toggle Status</button>
            </div>
          ))}
        </div>
      }
    </div>
  );
}
