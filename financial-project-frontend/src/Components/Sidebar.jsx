// Sidebar.js
export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 text-white p-6">
      <h2 className="text-2xl font-bold mb-6">Expense Tracker</h2>
      <nav>
        <a href="#" className="block py-2 hover:bg-gray-700 rounded">Dashboard</a>
        <a href="#" className="block py-2 hover:bg-gray-700 rounded">Categories</a>
        <a href="#" className="block py-2 hover:bg-gray-700 rounded">Settings</a>
      </nav>
    </div>
  );
}
