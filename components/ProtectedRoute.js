"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../lib/firebase";

export default function ProtectedRoute({ children, role }) {
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        router.push("/login");
      } else {
        // fetch role from backend (placeholder: assume role is stored in custom claim)
        // For now, all users are customer
        setUserRole("customer");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  if (loading) return <div>Loading...</div>;
  if (role && userRole !== role) return <div>Access denied</div>;
  return <>{children}</>;
}
