// LoginForm.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., authenticate the user)
    navigate('/Home');
    console.log(username + " " + password);
  };

  return (
    <div className="flex items-center justify-center rounded-md max-w-xl m-auto border">
      <form onSubmit={handleSubmit} className="p-8 rounded-lg shadow-lg border-black w-full">
        {/* <h2 className="text-2xl font-bold text-center">Login</h2> */}
        
        <div className="mb-4">
          <label className="text-gray-700 text-sm font-bold mb-2 flex" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
            placeholder="Enter your username"
            required
          />
        </div>

        <div className="mb-6">
          <label className=" text-gray-700 text-sm font-bold mb-2 flex" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-sky-500 text-white py-2 rounded-lg font-semibold hover:bg-sky-600 transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
}
