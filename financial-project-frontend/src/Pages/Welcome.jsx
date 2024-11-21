import LoginForm from "../Components/forms/LoginForm";
import { useNavigate } from "react-router-dom";
import NavBar from "../Components/NavBar";
import {React, useState} from "react";


export function Welcome() {
    const navigate = useNavigate();

    const guestLogin = () => {
        navigate('/Home');
    }

  return ( 
  <div className="bg-gray-100 min-h-screen">
    <div className="">
      <NavBar/>
      {/* Hero Section */}
      <div className="">
        <div className="p-2 mb-5 mt-10">
          <h1 className="text-4xl font-bold mb-2 text-center">Welcome to Financier</h1>
          <p className="max-w-lg m-auto text-center">
            Take control of your finances. Track your spending, set budgets, and get personalized insights to manage your money better.
          </p>
        </div>

        <div className="px-3 max-w-96 m-auto">
          <LoginForm></LoginForm>

        </div>


        {/* Action Buttons */}
        <div className="flex flex-col items-center justify-center mt-5 mb-28">
            
          <button className="m-2 px-2 py-1 rounded-lg shadow-md bg-white w-40"
          onClick={()=>{navigate("/Register")}}>
            Sign Up
          </button>
        </div>
      </div>

    </div>
    {/* Feature Highlights */}
    <div className="flex flex-wrap items-center justify-center">
  
      <div className="flex flex-col m-2 p-4 rounded-3xl shadow-lg max-w-md h-32 border bg-white">
        <h2 className="text-lg font-bold">Track Spending</h2>
        <p className="mt-3">Keep tabs on every expense and understand where your money goes.</p>
      </div>

      <div className="flex flex-col m-2 p-4 rounded-3xl shadow-lg max-w-md h-32 border bg-white">
        <h2 className="text-lg font-bold">Set Budgets</h2>
        <p className="mt-3">Plan your monthly spending and stay within your means effortlessly.</p>
      </div>

      <div className="flex flex-col m-2 p-4 rounded-3xl shadow-lg max-w-md h-32 border bg-white">
        <h2 className="text-lg font-bold">Gain Insights</h2>
        <p className="mt-3">Get personalized insights to help you make smarter financial decisions.</p>
      </div>

    </div>
  </div>
  );
}