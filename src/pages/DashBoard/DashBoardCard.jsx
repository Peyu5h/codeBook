import { useEffect, useState } from "react";

const DashBoardCard = ({ itemId }) => {
  const [item, setItem] = useState({});

  useEffect(() => {
    const fetchItem = async () => {
      const response = await fetch(`http://localhost:3001/products/${itemId}`);
      const data = await response.json();
      setItem(data);
    };
    fetchItem();
  }, []);

  const one =
    "https://assets-global.website-files.com/64c4b66a44c38c5fa4309e5a/6536851236dce583259b23be_1-STAR.png";
  const two =
    "https://assets-global.website-files.com/64c4b66a44c38c5fa4309e5a/653685122b1f6a53600ba761_2-STAR.png";
  const three =
    "https://assets-global.website-files.com/64c4b66a44c38c5fa4309e5a/653685128e91f8427cb55311_3-STAR.png";
  const four =
    "https://assets-global.website-files.com/64c4b66a44c38c5fa4309e5a/64c4d9e4a124713eeaa01f27_4-STAR.png";
  const five =
    "https://assets-global.website-files.com/64c4b66a44c38c5fa4309e5a/653685129ff29a55d5b1abdd_5-STAR.png";

  const [rating, setRating] = useState();

  useEffect(() => {
    if (item.rating === 1) {
      setRating(one);
    } else if (item.rating === 2) {
      setRating(two);
    } else if (item.rating === 3) {
      setRating(three);
    } else if (item.rating === 4) {
      setRating(four);
    } else if (item.rating === 5) {
      setRating(five);
    }
  }, [item.rating]);

  return (
    <main>
      <div className="flex gap-4 mx-auto bg-slate-700 my-4 rounded-md">
        <div className="img">
          <img className="w-48 h-full rounded-l-md" src={item.poster} alt="" />
        </div>

        {/* Parent container with 'flex' class */}
        <div className="content flex justify-between items-center p-2 w-full md:mr-4 mr-2">
          {/* Left side content */}
          <div className="left flex flex-col font-semibold md:gap-4 gap-1">
            <div className="flex flex-col gap-2">
              <div className="title md:text-xl text-xs font-semibold ">
                {item.name}
              </div>
              <img className="w-24" src={rating} alt="star" />
            </div>
            <div className="sm-price sm:hidden text-sm">${item.price}</div>
          </div>

          {/* Right side content */}
          <div className="right text-xl hidden sm:block">${item.price}</div>
        </div>
      </div>
    </main>
  );
};

export default DashBoardCard;
