"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { auth } from "../lib/firebase";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(u => setUser(u));
  }, []);

  return (
    <nav className="bg-white shadow p-4 flex justify-between">
      <div className="font-bold text-xl">Lazzat Al Zouq</div>
      <div className="space-x-4">
        <Link href="/profile">Profile</Link>
        <Link href="/menu">Menu</Link>
        <Link href="/orders">Orders</Link>
        <Link href="/cart">Cart</Link>  
        <Link href="/checkout">Checkout</Link>

        {user ? (
          <button onClick={() => auth.signOut()}>Logout</button>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
