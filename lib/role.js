// lib/role.js
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { apiRequest } from "./api";

export function useRole() {
  const [roleInfo, setRoleInfo] = useState({ role: null, loading: true, uid: null, email: null });

  useEffect(() => {
    let unsub;
    // wait for firebase auth
    unsub = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setRoleInfo({ role: null, loading: false, uid: null, email: null });
        return;
      }
      try {
        const token = await user.getIdToken();
        // apiRequest already adds Authorization header when requireAuth true
        const res = await apiRequest("/auth/me", "GET", null, { requireAuth: true });
        setRoleInfo({ role: res.role, loading: false, uid: res.uid, email: res.email });
      } catch (e) {
        console.error("role fetch failed", e);
        setRoleInfo({ role: null, loading: false, uid: null, email: null });
      }
    });
    return () => unsub && unsub();
  }, []);

  return roleInfo;
}
