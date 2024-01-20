import { IoAdd } from "react-icons/io5";
import { FaRegTrashCan } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../reducer/cartSlice";
import { useAtom } from "jotai";
import { carItemsAtom } from "../reducer/atom";

const ProductCard = ({ product, onAddToCart }) => {
  // const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const [carItems, setCarItems] = useAtom(carItemsAtom);

  // const user = useSelector((state) => state.user);

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
    if (product.rating === 1) {
      setRating(one);
    } else if (product.rating === 2) {
      setRating(two);
    } else if (product.rating === 3) {
      setRating(three);
    } else if (product.rating === 4) {
      setRating(four);
    } else if (product.rating === 5) {
      setRating(five);
    }
  }, [product.rating]);

  return (
    <div>
      <div className="card w-full rounded-lg h-auto bg-slate-700">
        <Link to={`/books/${product._id}`}>
          <div className="imgContainer relative">
            <img
              className="rounded-t-lg w-full h-[16rem]"
              src={product.poster}
              alt="book_img"
            />
            {product.best_seller && (
              <div className="bestseller bg-orange-600 text-white font-normal top-0 ml-2 mt-2 rounded-md text-sm px-2 py-1 absolute">
                Best seller
              </div>
            )}
          </div>
        </Link>
        <div className="cardContent p-6 flex flex-col md:gap-4 gap-3 mt-2">
          <div className="title md:text-2xl text-xl font-semibold">
            {product.name}
          </div>
          <div className="description md:text-sm text-xs font-light">
            {product.overview}
          </div>
          <div className="rating">
            <img src={rating} alt="" />
          </div>
          <div className="priceAndBtn flex flex-row justify-between mb-4">
            <div className="price text-xl mt-2 font-semibold">
              $ {product.price}
            </div>

            <button onClick={onAddToCart}>
              {carItems.find((item) => item._id === product._id) ? (
                <div className="REMOVE bg-red-600 text-white hover:bg-red-700 transition-all md:px-3 md:py-2 px-2 py-1 rounded-md">
                  <span className="flex items-center">
                    Remove <FaRegTrashCan className="ml-2" />
                  </span>
                </div>
              ) : (
                <div className="ADD bg-blue-500 text-white hover:bg-blue-600 transition-all md:px-3 md:py-2 px-2 py-1 rounded-md">
                  <span className="flex items-center">
                    Add to cart <IoAdd className="ml-2" />
                  </span>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
