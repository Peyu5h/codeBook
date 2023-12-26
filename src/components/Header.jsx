import Logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import { useRef } from "react";

const Header = () => {
  const [show, setShow] = useState(false);
  const searchRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/books?search=${searchRef.current.value}`);
  };

  return (
    <div className="header-container relative">
      <nav className="flex justify-between pb-6 border-b-2 border-gray-700">
        <Link to="/">
          <div className="logo flex gap-2">
            <img className="w-16 sm:w-24" src={Logo} alt="logo" />
            <h1 className="text-2xl font-semibold">
              Code<span className="text-blue-500">Book</span>
            </h1>
          </div>
        </Link>
        <div className="flex items-center lg:gap-8 gap-5">
          <div className="search bar relative hidden md:block">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                ref={searchRef}
                id="search-navbar"
                name="search"
                className="focus:outline-none border-none block w-full p-2 ps-10 text-sm rounded-lg bg-slate-700"
                placeholder="Search..."
                autoComplete="off"
              />
            </form>
          </div>

          <Link to="/cart">
            <span className="relative">
              <FaShoppingCart className="lg:h-8 lg:w-8 h-6 w-6 text-zinc-100 " />
              <div className="absolute top-0 right-0 px-1 rounded-full bg-red-500 text-xs text-white">
                12
              </div>
            </span>
          </Link>

          <div className="user" onClick={() => setShow(!show)}>
            <FaUserCircle className="cursor-pointer lg:h-8 lg:w-8 h-6 w-6  text-zinc-100" />
          </div>
        </div>
      </nav>
      {show ? (
        <div className="z-10 ml-auto absolute top-100 right-0 h-auto  w-44 rounded-b-md bg-slate-700">
          <div className="text-md font-light p-2 mt-2 w-full">
            user@gmail.com
          </div>

          <div className="divider h-[2px] w-full bg-slate-700 my-1 "></div>
          <div className="flex flex-col   items-start justify-start">
            <Link to="/books" className="w-full">
              <div className="text-md cursor-pointer font-light p-2 border-y-[1px] hover:bg-slate-500 transition-all border-slate-500 w-full">
                All ebooks
              </div>
            </Link>
            <Link to="/login" className="w-full">
              <div className="text-md  cursor-pointer font-light p-2 border-b-[1px] hover:bg-slate-500 transition-all border-slate-500 w-full">
                Login
              </div>
            </Link>
            <Link to="/register" className="w-full">
              <div className="text-md  cursor-pointer font-light p-2 border-b-[1px] hover:bg-slate-500 transition-all border-slate-500 w-full">
                Register
              </div>
            </Link>
            <Link to="/dashboard" className="w-full">
              <div className="text-md cursor-pointer font-light p-2 border-b-[1px] hover:bg-slate-500 transition-all border-slate-500 w-full">
                Dashboard
              </div>
            </Link>

            <div className="text-md cursor-pointer font-light p-2  hover:bg-slate-500 transition-all border-slate-500 w-full">
              Logout
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Header;
