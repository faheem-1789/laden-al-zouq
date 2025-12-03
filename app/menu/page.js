"use client";
import { useEffect, useState } from "react";
import { apiRequest } from "../../lib/api";
import MenuCard from "../../components/MenuCard";

export default function MenuPage() {
  const [menu, setMenu] = useState([]);
  const [error, setError] = useState(null);

  const fetchMenu = async () => {
    try {
      const data = await apiRequest("/menu", "GET", null, { requireAuth: false });
      setMenu(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || String(err));
    }
  };

  useEffect(() => { fetchMenu(); }, []);

  if (error) return <div className="p-6">Error loading menu: {error}</div>;
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Menu</h2>
      {menu.length === 0 ? <div>No items yet.</div> :
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {menu.map(item => <MenuCard key={item.id} item={item} />)}
        </div>}
    </div>
  );
}
