// app/profile/page.js
"use client";
import { useEffect, useState } from "react";
import { auth } from "../../lib/firebase";
import { apiRequest } from "../../lib/api";
import AddressesManager from "../../components/AddressesManager";

export default function ProfilePage() {
  const [profile, setProfile] = useState({ uid: "", name: "", phone: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [msg, setMsg] = useState("");

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const data = await apiRequest("/customers/me", "GET", null, { requireAuth: true });
      setProfile(data);
      setForm({ name: data.name || "", phone: data.phone || "", email: data.email || "" });
    } catch (err) {
      console.error("profile fetch", err);
      setMsg(err.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(u => {
      if (!u) {
        setProfile({ uid: "", name: "", phone: "", email: "" });
        setLoading(false);
      } else {
        fetchProfile();
      }
    });
    return () => unsub();
  }, []);

  const save = async () => {
    setMsg("");
    try {
      await apiRequest("/customers/me", "PUT", form, { requireAuth: true });
      setMsg("Profile updated");
      setEditing(false);
      fetchProfile();
    } catch (err) {
      setMsg(err.message || String(err));
    }
  };

  const removeAccount = async () => {
    if (!confirm("Delete your account? This cannot be undone.")) return;
    try {
      await apiRequest("/customers/me", "DELETE", null, { requireAuth: true });
      // sign out locally
      await auth.signOut();
      window.location.href = "/";
    } catch (err) {
      setMsg(err.message || String(err));
    }
  };

  if (loading) return <div className="p-6">Loading profile...</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      {msg && <div className="mb-4 text-red-600">{msg}</div>}
      {!editing ? (
        <div className="bg-white p-6 rounded shadow">
          <p><strong>Name:</strong> {profile.name || "-"}</p>
          <p><strong>Phone:</strong> {profile.phone || "-"}</p>
          <p><strong>Email:</strong> {profile.email || "-"}</p>
          <div className="mt-4 space-x-2">
            <button onClick={() => setEditing(true)} className="px-4 py-2 bg-blue-600 text-white rounded">Edit</button>
            <button onClick={removeAccount} className="px-4 py-2 bg-red-500 text-white rounded">Delete Account</button>
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 rounded shadow space-y-3">
          <label className="block">Name
            <input className="w-full p-2 border rounded" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
          </label>
          <label className="block">Phone
            <input className="w-full p-2 border rounded" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
          </label>
          <label className="block">Email
            <input className="w-full p-2 border rounded" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
          </label>
          <div className="flex space-x-2">
            <button onClick={save} className="px-4 py-2 bg-green-600 text-white rounded">Save</button>
            <button onClick={() => setEditing(false)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          </div>
        </div>
      )}

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">Addresses</h3>
        <AddressesManager />
      </div>
    </div>
  );
}
