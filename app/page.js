import Link from "next/link";

export default function HomePage() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold mb-4">Welcome to Lazzat Al Zouq Bufiya</h1>
      <p className="text-lg mb-8">Order your favorite items easily!</p>
      <div className="space-x-4">
        <Link href="/signup" className="px-6 py-3 bg-blue-500 text-white rounded-lg">Sign Up</Link>
        <Link href="/login" className="px-6 py-3 bg-gray-200 rounded-lg">Login</Link>
      </div>
    </div>
  );
}
