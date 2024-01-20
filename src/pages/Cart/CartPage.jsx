import CartList from "./CartList";
import Header from "../../components/Header";
import { FaArrowRightLong } from "react-icons/fa6";
import { useAtom } from "jotai";
import { carItemsAtom } from "../../reducer/atom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PulseLoader } from "react-spinners";

const CartPage = () => {
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useAtom(carItemsAtom);
  const user = useSelector((state) => state.user);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`${backendUrl}/order`, {
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
      setLoading(true);
      setTimeout(async () => {
        setLoading(false);
        setCartItems([]);

        try {
          // Your asynchronous operation (e.g., another API call)
          const response2 = await fetch(`${backendUrl}/emptyCart`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: user.id }),
          });

          const data2 = await response2.json();
          console.log(data2.message);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }, 3000);
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
          {cartItems.length !== 0 ? (
            <div className="total flex justify-between">
              <div className="sm:text-xl text-lg">Total Amount:</div>
              <div className="text-xl font-semibold mr-8">${totalPrice}</div>
            </div>
          ) : (
            <>
              <h1 className="text-center text-xl font-bold">
                No Items in cart :(
                <Link to="/books">
                  <button className="bg-blue-500 ml-6 px-3 py-2 rounded-lg font-normal text-sm  ">
                    See all books
                  </button>
                </Link>
              </h1>
            </>
          )}

          <div className="divider h-[2px] w-full bg-slate-700 my-8 "></div>

          <div className="flex justify-end my-6">
            {cartItems.length !== 0 ? (
              loading ? (
                <button
                  onClick={handleUpdate}
                  className="md:text-lg text-xs rounded-lg bg-green-600 transition-all py-2 px-3 flex items-center"
                >
                  Wait{" "}
                  <PulseLoader className="ml-3" size={10} color="#ffffff" />
                </button>
              ) : (
                <button
                  onClick={handleUpdate}
                  className="md:text-lg text-xs bg-blue-600 rounded-lg hover:bg-green-600 transition-all py-2 px-3 flex items-center"
                >
                  Place Order <FaArrowRightLong className="ml-3" />
                </button>
              )
            ) : (
              <Link to="/dashboard">
                <button className="md:text-lg text-xs bg-green-600 transition-all py-2 px-3 flex items-center rounded-lg">
                  Go to Dashboard
                </button>
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CartPage;
