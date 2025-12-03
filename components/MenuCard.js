"use client";
import { apiRequest } from "../lib/api";
import { useState } from "react";

export default function MenuCard({ item }) {
  const [adding, setAdding] = useState(false);

  const addToCart = async () => {
    setAdding(true);
    await apiRequest("/cart", "POST", { item, note: "" });
    alert("Added to cart");
    setAdding(false);
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <img src={item.image || "/robot.png"} alt={item.name} className="h-32 w-full object-cover mb-2 rounded" />
      <h3 className="font-bold">{item.name}</h3>
      <p className="text-sm">{item.description}</p>
      <p className="font-semibold mt-2">{item.price} SAR</p>
      <button onClick={addToCart} disabled={adding} className="mt-2 w-full bg-blue-500 text-white p-2 rounded">
        {adding ? "Adding..." : "Add to Cart"}
      </button>
    </div>
  );
}
