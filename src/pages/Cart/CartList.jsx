import Random from "../../assets/images/10002.avif";
const CartList = () => {
  return (
    <main>
      <div className="flex gap-4 mx-auto w-[100%] lg:w-[70%] bg-slate-700 my-4 rounded-md">
        <div className="img">
          <img className="w-48 h-full rounded-l-md" src={Random} alt="" />
        </div>

        {/* Parent container with 'flex' class */}
        <div className="content flex justify-between items-center p-2 w-full md:mr-4 mr-2">
          {/* Left side content */}
          <div className="left flex flex-col font-semibold md:gap-4 gap-1">
            <div className="title md:text-xl text-xs font-semibold">
              The Complete Guide To Backend Development
            </div>
            <div className="sm-price sm:hidden text-sm">$99</div>
            <div className="remove cursor-pointer ">
              <span className=" text-red-600 rounded-full md:text-md text-xs">
                Remove
              </span>
            </div>
          </div>

          {/* Right side content */}
          <div className="right text-xl hidden sm:block">$99</div>
        </div>
      </div>
    </main>
  );
};

export default CartList;
