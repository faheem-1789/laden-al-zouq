"use client";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/menu");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <form onSubmit={handleLogin} className="space-y-4">
        <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full p-2 border rounded" required />
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full p-2 border rounded" required />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
}
