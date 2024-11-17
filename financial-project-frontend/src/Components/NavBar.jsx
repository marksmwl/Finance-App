import React, {useState} from "react"

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    return <>
        <div className="w-full flex justify-between p-2 border-b bg-white text-sm">
            <div>
                <p className="m-2 text-md">Financier</p>
            </div>

            <div className="hidden sm:flex justify-evenly">
                <p className="m-2 px-2 py-1 rounded-lg shadow-md">Forgot Password?</p>
                <p className="m-2 px-2 py-1 rounded-lg shadow-md">Guest Login</p>
                <p className="m-2 px-2 py-1 rounded-lg shadow-md">Sign up</p>
            </div>

            <span class="material-symbols-outlined sm:hidden text-3xl" onClick={toggleMenu}>
                {isOpen ? "close" : "menu"}
            </span>
        </div>
        {isOpen && (
                <div className=" flex justify-evenly bg-white sm:hidden border-b-2">
                    <p className="m-2 px-2 py-1 rounded-lg shadow-md text-sm">Forgot Password?</p>
                    <p className="m-2 px-2 py-1 rounded-lg shadow-md text-sm">Guest Login</p>
                    <p className="m-2 px-2 py-1 rounded-lg shadow-md text-sm">Sign up</p>
                </div>
            )}
    </>
}