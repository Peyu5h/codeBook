import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import ProductList from "./pages/Products/ProductList";
import CartPage from "./pages/Cart/CartPage";
import ProductDetails from "./pages/Products/ProductDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/DashBoard/DashBoardPage";
import { useState } from "react";
// import userAtom from "./reducer/atom";
// import { useAtom } from "jotai";
// import { cartAtom } from "./reducer/cartAtom";
// import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  // const [user, setUser] = useState(false);

  // const [cart, setCart] = useAtom(cartAtom);

  // const updateCart = async () => {
  //   const data = await fetch(`http://localhost:3001/cart/${user.id}`);
  //   const response = await data.json();
  //   console.log("============================================");
  //   setCart(response);
  // };
  // useEffect(() => {
  //   updateCart();
  // }, []);
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
