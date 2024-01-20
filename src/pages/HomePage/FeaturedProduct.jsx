import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../reducer/cartSlice";
import { useAtom } from "jotai";
import { carItemsAtom } from "../../reducer/atom";

const FeaturedProduct = () => {
  const [product, setProduct] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    async function fetchData() {
      const data = await fetch(`${backendUrl}/products`);
      const response = await data.json();
      setProduct(response);
    }
    fetchData();
  }, []);
  const slicedProducts = product.slice(0, 3);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [cartItems, setCarItems] = useAtom(carItemsAtom);
  const handleAddToCart = async (productId) => {
    await dispatch(addToCart({ userId: user.id, productId }));

    try {
      const response = await fetch(`${backendUrl}/cart/${user.id}`);
      const data = await response.json();
      setCarItems(data.user.cart);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <div className="title mt-16 mb-2 text-2xl">Featured eBooks</div>
        <div className="line h-[2px] w-[20%] bg-blue-500 mb-12"></div>
      </div>
      <div className="grid lg:grid-cols-3 lg:grid-rows-1 md:grid-rows-1 grid-cols-1 md:grid-cols-2 grid-rows-3 gap-6 mx-2 md:mx-24">
        {slicedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={() => handleAddToCart(product._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProduct;
