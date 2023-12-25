import CartList from "./CartList";
import Header from "../../components/Header";
import { FaArrowRightLong } from "react-icons/fa6";

const CartPage = () => {
  return (
    <div>
      <Header />
      <main className=" lg:mt-4 mt-2 md:mx-24 mx-2">
        <div className=" flex flex-col items-center justify-center">
          <div className="title mt-8 mb-2 text-2xl"> My Cart (12)</div>
          <div className="line h-[2px] w-[20%] bg-blue-500 mb-12"></div>
        </div>
        <CartList />
        <CartList />
        <CartList />
        <CartList />
        <div className="bottom mx-auto  w-full md:w-[70%]">
          <div className="divider h-[2px] w-full bg-slate-700 my-8 "></div>
          <div className="total flex justify-between">
            <div className="sm:text-xl text-lg">Total Amount:</div>
            <div className="text-xl font-semibold mr-8">$128</div>
          </div>
          <div className="divider h-[2px] w-full bg-slate-700 my-8 "></div>

          <div className="flex justify-end my-6">
            <button className="md:text-lg text-xs bg-blue-600 rounded-lg hover:bg-green-600 transition-all py-2 px-3 flex items-center">
              Place Order <FaArrowRightLong className="ml-3" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CartPage;
