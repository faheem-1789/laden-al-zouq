"use client";
import { useEffect, useState } from "react";
import { apiRequest } from "../../lib/api";
import DashboardCard from "../../components/DashboardCard";

export default function OwnerDashboard() {
  const [summary, setSummary] = useState({ orders: 0, sales: 0 });
  const [employees, setEmployees] = useState([]);
  const [customers, setCustomers] = useState([]);

  const fetchSummary = async () => {
    const data = await apiRequest("/reports/summary");
    setSummary(data);
  };

  const fetchUsers = async () => {
    // Placeholder: implement endpoint to fetch employees & customers
    // For now we use dummy data
    setEmployees([{ name: "Employee 1", uid: "emp1" }, { name: "Employee 2", uid: "emp2" }]);
    setCustomers([{ name: "Customer 1", uid: "cus1" }, { name: "Customer 2", uid: "cus2" }]);
  };

  useEffect(() => {
    fetchSummary();
    fetchUsers();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Owner Dashboard</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <DashboardCard title="Total Orders" value={summary.orders} />
        <DashboardCard title="Total Sales (SAR)" value={summary.sales} />
        <DashboardCard title="Employees" value={employees.length} />
        <DashboardCard title="Customers" value={customers.length} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">Employees</h3>
          <div className="space-y-2">
            {employees.map(e => (
              <div key={e.uid} className="p-2 bg-white rounded shadow">{e.name}</div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Customers</h3>
          <div className="space-y-2">
            {customers.map(c => (
              <div key={c.uid} className="p-2 bg-white rounded shadow">{c.name}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
