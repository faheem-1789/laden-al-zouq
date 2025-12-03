// lib/api.js
import { auth } from "./firebase";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

export async function apiRequest(path, method = "GET", body = null, opts = { requireAuth: true }) {
  const headers = { "Content-Type": "application/json" };

  if (opts.requireAuth) {
    const user = auth.currentUser;
    if (!user) throw new Error("User not logged in");
    const token = await user.getIdToken();
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `API error ${res.status}`);
  }
  // Try parse JSON but guard for empty
  const txt = await res.text();
  try { return txt ? JSON.parse(txt) : null; }
  catch { return txt; }
}
