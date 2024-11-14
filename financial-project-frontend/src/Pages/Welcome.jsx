import LoginForm from "../Components/LoginForm";
import { useNavigate } from "react-router-dom";


export function Welcome() {
    const navigate = useNavigate();

    const guestLogin = () => {
        navigate('/Home');
    }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6">
      {/* Hero Section */}
      <div className="text-center max-w-lg">
        <h1 className="text-5xl font-bold mb-4 animate-pulse">Welcome to Financier</h1>
        <p className="text-lg mb-8">
          Take control of your finances. Track your spending, set budgets, and get personalized insights to manage your money better.
        </p>

        <LoginForm></LoginForm>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mb-10">
            
          <button className="bg-white text-blue-600 px-4 py-2 rounded-full font-semibold shadow-lg hover:bg-gray-200 transition" onClick={guestLogin}>
            Login as Guest
          </button>
          <button className="bg-blue-700 px-4 py-2 rounded-full font-semibold shadow-lg hover:bg-blue-800 transition">
            Sign Up
          </button>
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mt-10 max-w-4xl">
        <div className="bg-white text-blue-600 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-2">Track Spending</h2>
          <p>Keep tabs on every expense and understand where your money goes.</p>
        </div>
        <div className="bg-white text-blue-600 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-2">Set Budgets</h2>
          <p>Plan your monthly spending and stay within your means effortlessly.</p>
        </div>
        <div className="bg-white text-blue-600 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-2">Gain Insights</h2>
          <p>Get personalized insights to help you make smarter financial decisions.</p>
        </div>
      </div>
    </div>
  );
}