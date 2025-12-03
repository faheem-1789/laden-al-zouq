import { auth } from './firebase'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE

export async function apiRequest(path, method = "GET", body = null, requireAuth = true) {
  const headers = {};

  // Only include Content-Type if sending a POST/PUT body
  if (body !== null) {
    headers["Content-Type"] = "application/json";
  }

  if (requireAuth) {
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
    const t = await res.text();
    throw new Error(t);
  }

  const text = await res.text();
  try {
    return text ? JSON.parse(text) : null;
  } catch {
    return text;
  }
}
