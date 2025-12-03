export default function DashboardCard({ title, value }) {
  return (
    <div className="bg-white p-4 rounded shadow flex justify-between items-center">
      <h3 className="font-semibold">{title}</h3>
      <span className="text-xl font-bold">{value}</span>
    </div>
  );
}
