import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import ProductList from "./pages/Products/ProductList";
import CartPage from "./pages/Cart/CartPage";
import ProductDetails from "./pages/Products/ProductDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/DashBoard/DashBoardPage";
const App = () => {
  return (
    <main className="bg-gray-800 h-screen w-full overflow-auto font-pop text-zinc-100 p-6 sm:p-12">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books" element={<ProductList />} />
        <Route path="/books/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </main>
  );
};

export default App;
