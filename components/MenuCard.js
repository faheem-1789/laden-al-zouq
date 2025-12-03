"use client";

import { useState } from "react";
import { auth } from "../lib/firebase";
import { apiRequest } from "../lib/api";

export default function MenuCard({ item }) {
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");

  const addToCart = async () => {
    try {
      const user = auth.currentUser;

      // 🔐 Require login
      if (!user) {
        if (confirm("You must be logged in to add items to your cart. Go to login?")) {
          window.location.href = "/login";
        }
        return;
      }

      setAdding(true);
      setError("");

      // 🛒 Add item to cart
      await apiRequest(
        "/cart",
        "POST",
        {
          item,
          note: "",
        },
        { requireAuth: true }
      );

      alert("Item added to cart!");
    } catch (err) {
      setError(err.message || "Error adding item");
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition">
      {/* Image (optional) */}
      {item.image && (
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-40 object-cover rounded-md mb-3"
        />
      )}

      {/* Name */}
      <h3 className="text-lg font-bold">{item.name}</h3>

      {/* Price */}
      <p className="text-gray-700 font-medium mb-2">SAR {item.price}</p>

      {/* Description */}
      {item.description && (
        <p className="text-sm text-gray-600 mb-3">{item.description}</p>
      )}

      {/* Error message */}
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      {/* Add to cart button */}
      <button
        onClick={addToCart}
        disabled={adding}
        className={`w-full py-2 rounded-md text-white ${
          adding ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
        } transition`}
      >
        {adding ? "Adding..." : "Add to Cart"}
      </button>
    </div>
  );
}
