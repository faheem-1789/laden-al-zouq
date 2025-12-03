"use client";
import Link from "next/link";

export default function Sidebar({ role }) {
  const commonLinks = [{ label: "Dashboard", href: `/${role}` }];
  const roleLinks = {
    customer: [{ label: "Menu", href: "/menu" }, { label: "Cart", href: "/cart" }, { label: "Orders", href: "/orders" }],
    employee: [{ label: "Orders", href: "/employee" }],
    manager: [{ label: "Inventory", href: "/manager" }, { label: "Orders", href: "/manager" }],
    owner: [{ label: "Employees", href: "/owner" }, { label: "Reports", href: "/owner" }]
  };

  const links = [...commonLinks, ...(roleLinks[role] || [])];

  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6">Menu</h2>
      <ul className="space-y-2">
        {links.map(l => (
          <li key={l.href}>
            <Link href={l.href} className="block p-2 rounded hover:bg-gray-700">{l.label}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
