"use client";
import Link from "next/link";
import { useRole } from "../lib/role";
import { auth } from "../lib/firebase";

export default function Navbar() {
  const { role, loading, uid } = useRole();

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <div className="font-bold text-xl"><Link href="/">Lazzat Al Zouq</Link></div>

      <div className="space-x-4 flex items-center">
        <Link href="/menu">Menu</Link>

        {!loading && role === "customer" && (
          <>
            <Link href="/profile">Profile</Link>
            <Link href="/cart">Cart</Link>
            <Link href="/orders">My Orders</Link>
          </>
        )}

        {!loading && (role === "employee") && (
          <>
            <Link href="/employee/orders">Orders</Link>
            <Link href="/employee/new-order">Create Order</Link>
          </>
        )}

        {!loading && (role === "manager" || role === "owner") && (
          <>
            <Link href="/manager/dashboard">Dashboard</Link>
            <Link href="/manager/inventory">Inventory</Link>
            <Link href="/manager/content">Content</Link>
          </>
        )}

        {!loading && role && (
          <button onClick={() => auth.signOut()}>Logout</button>
        )}

        {!loading && !role && (
          <>
            <Link href="/login">Login</Link>
            <Link href="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
