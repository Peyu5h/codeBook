import CartList from "./CartList";
import Header from "../../components/Header";
import { FaArrowRightLong } from "react-icons/fa6";
import { useAtom } from "jotai";
import { carItemsAtom } from "../../reducer/atom";
import { useState } from "react";
import { useSelector } from "react-redux";

const CartPage = () => {
  const [cartItems, setCartItems] = useAtom(carItemsAtom);
  const user = useSelector((state) => state.user);

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  const handleUpdate = async () => {
    try {
      const response = await fetch("http://localhost:3001/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          items: cartItems,
          total: totalPrice,
        }),
      });
      const data = await response.json();
      console.log(data.message);
      setCartItems([]);
      const response2 = await fetch("http://localhost:3001/emptyCart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id }),
      });
      const data2 = await response2.json();
      console.log(data2.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header />
      <main className=" lg:mt-4 mt-2 md:mx-24 mx-2">
        <div className=" flex flex-col items-center justify-center">
          <div className="title mt-8 mb-2 text-2xl">
            {" "}
            My Cart ({cartItems?.length})
          </div>
          <div className="line h-[2px] w-[20%] bg-blue-500 mb-12"></div>
        </div>
        {cartItems?.map((item) => (
          <CartList
            key={item._id}
            name={item.name}
            price={item.price}
            img={item.poster}
            productId={item._id}
            userId={user.id}
          />
        ))}

        <div className="bottom mx-auto  w-full md:w-[70%]">
          <div className="divider h-[2px] w-full bg-slate-700 my-8 "></div>
          <div className="total flex justify-between">
            <div className="sm:text-xl text-lg">Total Amount:</div>
            <div className="text-xl font-semibold mr-8">${totalPrice}</div>
          </div>
          <div className="divider h-[2px] w-full bg-slate-700 my-8 "></div>

          <div className="flex justify-end my-6">
            <button
              onClick={handleUpdate}
              className="md:text-lg text-xs bg-blue-600 rounded-lg hover:bg-green-600 transition-all py-2 px-3 flex items-center"
            >
              Place Order <FaArrowRightLong className="ml-3" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CartPage;
