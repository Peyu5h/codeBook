import Random from "../../assets/images/10002.avif";

const DashBoardCard = () => {
  return (
    <main>
      <div className="flex gap-4 mx-auto bg-slate-700 my-4 rounded-md">
        <div className="img">
          <img className="w-48 h-full rounded-l-md" src={Random} alt="" />
        </div>

        {/* Parent container with 'flex' class */}
        <div className="content flex justify-between items-center p-2 w-full md:mr-4 mr-2">
          {/* Left side content */}
          <div className="left flex flex-col font-semibold md:gap-4 gap-1">
            <div className="flex flex-col gap-2">
              <div className="title md:text-xl text-xs font-semibold ">
                The Complete Guide To Backend Development
              </div>
              <img
                className="w-24"
                src="https://assets-global.website-files.com/64c4b66a44c38c5fa4309e5a/64c4d9e4a124713eeaa01f27_4-STAR.png"
                alt="star"
              />
            </div>
            <div className="sm-price sm:hidden text-sm">$99</div>
          </div>

          {/* Right side content */}
          <div className="right text-xl hidden sm:block">$99</div>
        </div>
      </div>
    </main>
  );
};

export default DashBoardCard;
