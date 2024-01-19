import Header from "../../components/Header";
import { IoAdd } from "react-icons/io5";
import { FaRegTrashCan } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const ProductDetails = () => {
  const { id } = useParams();
  console.log(id);
  const [product, setProduct] = useState([]);
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

  useEffect(() => {
    async function fetchData() {
      const data = await fetch(`http://localhost:3001/products/${id}`);
      const response = await data.json();
      setProduct(response);
    }
    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <div className="details md:mx-20 mx-4 mt-12">
        <div className="Title&Descrip">
          <h1 className="md:text-4xl text-xl font-semibold font-com">
            {product.name}
          </h1>
          <p className="md:text-md text-sm mt-2">{product.overview}</p>
        </div>
        <div className="container flex md:flex-row flex-col gap-8 mt-12">
          <div className="md:w-[50%] w-[100%] mx-auto">
            <img className="rounded-md" src={product.poster} alt="courseImg" />
          </div>
          <div className="Content flex flex-col  gap-4 w-[100%] md:w-[50%]">
            <h3 className="text-4xl font-medium">$ {product.price}</h3>
            <img className="w-24" src={rating} alt="stars" />
            <div className="tags flex gap-3">
              {product.best_seller && (
                <div className="h4 px-2 py-1 bg-amber-500 rounded-lg">
                  BEST SELLER
                </div>
              )}
              {product.in_stock && (
                <div className="h4 px-2 py-1 bg-amber-500 rounded-lg">
                  INSTOCK
                </div>
              )}
              <div className="h4 px-2 py-1 bg-amber-500 rounded-lg">
                {product.size} MB
              </div>
            </div>
            <div className="btn">
              <button className="ADD bg-blue-500 text-white hover:bg-blue-600 transition-all md:px-3 md:py-2 px-2 py-1 rounded-md">
                <span span className="flex items-center">
                  Add to cart <IoAdd className="ml-2" />
                </span>
              </button>
              <button className=" hidden REMOVE bg-red-600 text-white hover:bg-red-700 transition-all md:px-3 md:py-2 px-2 py-1 rounded-md">
                <span span className="flex items-center">
                  Remove <FaRegTrashCan className="ml-2" />
                </span>
              </button>
            </div>

            <div className="description">{product.long_description}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
