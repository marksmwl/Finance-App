import React, { useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const matchRoot = useMatch("/");
  const matchRegister = useMatch("/Register");

  const isNotLoggedIn = matchRoot || matchRegister;

  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isNotLoggedIn ? (
        <>
          <div className="w-full flex justify-between p-2 border-b bg-white text-sm">
            <div>
              <p className="m-2 text-xl ml-10">Financier</p>
            </div>
            <div className="hidden sm:flex justify-evenly">
            

              <button
                className="m-2 mr-10 px-2 py-1 rounded-lg shadow-md"
                onClick={() => navigate("/Register")}
              >
                Sign up
              </button>
            </div>

            <span
              className="material-symbols-outlined sm:hidden text-3xl"
              onClick={toggleMenu}
            >
              {isOpen ? "close" : "menu"}
            </span>
          </div>

          {isOpen && (
            <div className=" flex justify-evenly bg-white sm:hidden border-b-2">
              
              {/* <button
                className="m-2 px-2 py-1 rounded-lg shadow-md text-sm"
                onClick={() => navigate("/Register")}
              >
                Sign up
              </button> */}
            </div>
          )}
        </>
      ) : (
        <>
          <div className="w-full flex justify-between p-2 border-b bg-white text-sm">
            <div>
              <p className="m-2 text-md">Financier</p>
            </div>
            <div className="hidden sm:flex justify-evenly">
              <button
                className="m-2 px-2 py-1 rounded-lg shadow-md"
                onClick={() => navigate("/")}
              >
                Logout
              </button>
              <button
                className="m-2 px-2 py-1 rounded-lg shadow-md"
                onClick={() => navigate("/Register")}
              >
                View GitHub

              </button>
            </div>

            <span
              className="material-symbols-outlined sm:hidden text-3xl"
              onClick={toggleMenu}
            >
              {isOpen ? "close" : "menu"}
            </span>
          </div>

          {isOpen && (
            <div className=" flex justify-evenly bg-white sm:hidden border-b-2">
              <button
                className="m-2 px-2 py-1 rounded-lg shadow-md text-sm"
                onClick={() => {
                  navigate("/");
                  localStorage.clear();
                }}
              >
                Logout
              </button>
              <button
                className="m-2 px-2 py-1 rounded-lg shadow-md text-sm"
                onClick={() => navigate("/Register")}
              >
                View GitHub
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}
