// UserHome.js
export default function UserHome({ userName }) {
  // Example data for quick overview cards
  const totalBudget = 2000;
  const totalSpent = 1500;
  const remainingBudget = totalBudget - totalSpent;

  // Example recent transactions
  const recentTransactions = [
    { id: 1, category: 'Groceries', amount: 50, date: '2024-11-10' },
    { id: 2, category: 'Rent', amount: 800, date: '2024-11-01' },
    { id: 3, category: 'Entertainment', amount: 120, date: '2024-10-29' },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Welcome Message */}
      <h1 className="text-3xl font-bold mb-4">Welcome, {userName}!</h1>
      <p className="text-gray-600 mb-8">Here’s a quick overview of your finances this month.</p>

      {/* Quick Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Total Budget</h2>
          <p className="text-2xl font-bold mt-2">${totalBudget}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Total Spent</h2>
          <p className="text-2xl font-bold mt-2 text-red-500">${totalSpent}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Remaining Budget</h2>
          <p className="text-2xl font-bold mt-2 text-green-500">${remainingBudget}</p>
        </div>
      </div>

      {/* Recent Transactions */}
      <h2 className="text-2xl font-bold mb-4">Recent Transactions</h2>
      <div className="bg-white p-4 rounded-lg shadow-md mb-8">
        <ul>
          {recentTransactions.map((transaction) => (
            <li key={transaction.id} className="flex justify-between items-center py-2 border-b border-gray-200">
              <div>
                <p className="font-semibold">{transaction.category}</p>
                <p className="text-sm text-gray-500">{transaction.date}</p>
              </div>
              <p className="text-lg font-bold">${transaction.amount}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Add New Expense Button */}
      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-600 transition">
        + Add New Expense
      </button>
    </div>
  );
}
