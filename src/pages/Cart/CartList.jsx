import { useAtom } from "jotai";
import { carItemsAtom } from "../../reducer/atom";

const CartList = ({ name, price, img }) => {
  const [cartItems, setCartItems] = useAtom(carItemsAtom);

  const handleRemove = () => {
    setCartItems(cartItems.filter((item) => item.name !== name));
  };

  return (
    <main>
      <div className="flex gap-4 mx-auto w-[100%] lg:w-[70%] bg-slate-700 my-4 rounded-md">
        <div className="img">
          <img className="w-48 h-full rounded-l-md" src={img} alt="" />
        </div>

        {/* Parent */}
        <div className="content flex justify-between items-center p-2 w-full md:mr-4 mr-2">
          {/* Left side content */}
          <div className="left flex flex-col font-semibold md:gap-4 gap-1">
            <div className="title md:text-xl text-xs font-semibold">{name}</div>
            <div className="sm-price sm:hidden text-sm">${price}</div>
            <div className="remove cursor-pointer ">
              <span
                onClick={handleRemove}
                className=" text-red-600 rounded-full md:text-md text-xs"
              >
                Remove
              </span>
            </div>
          </div>

          {/* Right side content */}
          <div className="right text-xl hidden sm:block">${price}</div>
        </div>
      </div>
    </main>
  );
};

export default CartList;
