import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import ProductList from "./pages/Products/ProductList";
import CartPage from "./pages/Cart/CartPage";
import ProductDetails from "./pages/Products/ProductDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/DashBoard/DashBoardPage";
import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useAtom } from "jotai";
import { carItemsAtom } from "./reducer/atom";

const App = () => {
  const [cartItems, setCartItems] = useAtom(carItemsAtom);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    const getInitialData = async () => {
      try {
        const response = await fetch(`${backendUrl}/cart/${user.id}`);
        const data = await response.json();
        setCartItems(data.user.cart);
      } catch (error) {
        console.log(error);
      }
    };

    getInitialData();
  }, []);
  return (
    <main className="bg-gray-800 h-screen w-full overflow-auto font-pop text-zinc-100 p-6 sm:p-12">
      <Routes>
        {user !== null ? (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/books" element={<ProductList />} />
            <Route path="/books/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Redirect login and register to home if user is already logged in */}
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/register" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            {/* Show login and register if user is not logged in */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Redirect all other paths to the login page */}
            <Route index element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </main>
  );
};

export default App;
