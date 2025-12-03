import axios from 'axios';
import { auth } from './firebase';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://laden-al-zouq-backend.onrender.com";

export async function apiRequest(endpoint, method = 'GET', data = null) {
  const user = auth.currentUser;
  if (!user) throw new Error("User not logged in");

  const token = await user.getIdToken();
  const headers = { Authorization: `Bearer ${token}` };

  const res = await axios({
    url: `${API_BASE}${endpoint}`,
    method,
    headers,
    data
  });
  return res.data;
}
