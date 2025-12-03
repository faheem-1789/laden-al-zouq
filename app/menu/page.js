"use client";
import { useEffect, useState } from "react";
import { apiRequest } from "../../lib/api";
import MenuCard from "../../components/MenuCard";

export default function MenuPage() {
  const [menu, setMenu] = useState([]);

  const fetchMenu = async () => {
    const data = await apiRequest("/menu");
    setMenu(data);
  };

  useEffect(() => { fetchMenu(); }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Menu</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {menu.map(item => <MenuCard key={item.id} item={item} />)}
      </div>
    </div>
  );
}
