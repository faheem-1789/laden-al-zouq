"use client";
import { useEffect, useState } from "react";
import { apiRequest } from "../../lib/api";
import DashboardCard from "../../components/DashboardCard";

export default function ManagerDashboard() {
  const [menuItems, setMenuItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [summary, setSummary] = useState({ orders: 0, sales: 0 });

  const fetchMenu = async () => {
    const data = await apiRequest("/menu");
    setMenuItems(data);
  };

  const fetchOrders = async () => {
    const data = await apiRequest("/orders");
    setOrders(data);
  };

  const fetchSummary = async () => {
    const data = await apiRequest("/reports/summary");
    setSummary(data);
  };

  useEffect(() => {
    fetchMenu();
    fetchOrders();
    fetchSummary();
  }, []);

  const deleteItem = async (id) => {
    if (!confirm("Delete this item?")) return;
    await apiRequest(`/menu/${id}`, "DELETE");
    fetchMenu();
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manager Dashboard</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <DashboardCard title="Total Orders" value={summary.orders} />
        <DashboardCard title="Total Sales (SAR)" value={summary.sales} />
        <DashboardCard title="Menu Items" value={menuItems.length} />
        <DashboardCard title="Pending Orders" value={orders.filter(o => o.status !== 'done').length} />
      </div>

      <h3 className="text-xl font-semibold mb-2">Menu Management</h3>
      <div className="space-y-2">
        {menuItems.map(item => (
          <div key={item.id} className="p-2 bg-white rounded shadow flex justify-between items-center">
            <span>{item.name} - {item.price} SAR</span>
            <button onClick={() => deleteItem(item.id)} className="bg-red-500 text-white p-1 rounded">Delete</button>
          </div>
        ))}
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-2">Recent Orders</h3>
      <div className="space-y-2">
        {orders.map(o => (
          <div key={o.id} className="p-2 bg-white rounded shadow">
            <p><strong>Customer UID:</strong> {o.customer_uid}</p>
            <p><strong>Total:</strong> {o.total} SAR</p>
            <p><strong>Status:</strong> {o.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
