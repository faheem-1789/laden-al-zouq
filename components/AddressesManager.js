// components/AddressesManager.js
"use client";
import { useEffect, useState } from "react";
import { apiRequest } from "../lib/api";

export default function AddressesManager() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ label: "", address_line: "", city: "", phone: "" });
  const [editingId, setEditingId] = useState(null);
  const [msg, setMsg] = useState("");

  const fetchList = async () => {
    setLoading(true);
    try {
      const data = await apiRequest("/customers/addresses", "GET", null, { requireAuth: true });
      setList(data || []);
    } catch (err) {
      console.error(err);
      setMsg(err.message || String(err));
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchList(); }, []);

  const save = async () => {
    setMsg("");
    try {
      if (editingId) {
        await apiRequest(`/addresses/${editingId}`, "PUT", form, { requireAuth: true });
        setEditingId(null);
      } else {
        await apiRequest("/customers/addresses", "POST", form, { requireAuth: true });
      }
      setForm({ label: "", address_line: "", city: "", phone: "" });
      fetchList();
    } catch (err) { setMsg(err.message || String(err)); }
  };

  const remove = async (id) => {
    if (!confirm("Delete this address?")) return;
    await apiRequest(`/addresses/${id}`, "DELETE", null, { requireAuth: true });
    fetchList();
  };

  return (
    <div>
      {msg && <div className="text-red-600 mb-2">{msg}</div>}
      <div className="bg-white p-4 rounded shadow mb-4">
        <h4 className="font-semibold mb-2">{editingId ? "Edit Address" : "Add Address"}</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <input placeholder="Label (Home/Work)" className="p-2 border rounded" value={form.label} onChange={e => setForm({...form, label: e.target.value})} />
          <input placeholder="City" className="p-2 border rounded" value={form.city} onChange={e => setForm({...form, city: e.target.value})} />
          <input placeholder="Address Line" className="p-2 border rounded md:col-span-2" value={form.address_line} onChange={e => setForm({...form, address_line: e.target.value})} />
          <input placeholder="Phone" className="p-2 border rounded" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
        </div>
        <div className="mt-3">
          <button onClick={save} className="px-4 py-2 bg-blue-600 text-white rounded mr-2">Save</button>
          {editingId && <button onClick={() => { setEditingId(null); setForm({label:"",address_line:"",city:"",phone:""}) }} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>}
        </div>
      </div>

      <div>
        {loading ? <div>Loading addresses...</div> : (
          list.length === 0 ? <div>No addresses yet.</div> :
          <div className="space-y-3">
            {list.map(a => (
              <div key={a.id} className="bg-white p-3 rounded shadow flex justify-between items-start">
                <div>
                  <div className="font-semibold">{a.label} — {a.city}</div>
                  <div className="text-sm">{a.address_line}</div>
                  <div className="text-sm text-gray-600">Phone: {a.phone}</div>
                </div>
                <div className="space-y-2">
                  <button onClick={() => { setEditingId(a.id); setForm({label:a.label,address_line:a.address_line,city:a.city,phone:a.phone}) }} className="px-3 py-1 bg-yellow-400 rounded">Edit</button>
                  <button onClick={() => remove(a.id)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
