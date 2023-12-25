import Header from "../../components/Header";
import Random from "../../assets/images/10002.avif";
import { IoAdd } from "react-icons/io5";
import { FaRegTrashCan } from "react-icons/fa6";
const ProductDetails = () => {
  return (
    <div>
      <Header />
      <div className="details md:mx-20 mx-4 mt-12">
        <div className="Title&Descrip">
          <h1 className="md:text-4xl text-xl font-semibold font-com">
            Basic To Advance in React
          </h1>
          <p className="md:text-md text-sm mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero odio
            cum dolore quo suscipit incidunt?
          </p>
        </div>
        <div className="container flex md:flex-row flex-col gap-4 mt-12">
          <div className="md:w-[50%] w-[100%] mx-auto">
            <img className="rounded-md" src={Random} alt="courseImg" />
          </div>
          <div className="Content flex flex-col  gap-4 w-[100%] md:w-[50%]">
            <h3 className="text-4xl font-medium">$29</h3>
            <img
              className="w-24"
              src="https://assets-global.website-files.com/64c4b66a44c38c5fa4309e5a/64c4d9e4a124713eeaa01f27_4-STAR.png"
              alt="stars"
            />
            <div className="tags flex gap-3">
              <div className="h4 px-2 py-1 bg-amber-500 rounded-lg">
                BEST SELLER
              </div>
              <div className="h4 px-2 py-1 bg-amber-500 rounded-lg">
                INSTOCK
              </div>
              <div className="h4 px-2 py-1 bg-amber-500 rounded-lg">5 MB</div>
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

            <div className="description">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint
              mollitia, doloribus dolorum quibusdam error enim. Sint, rem
              deserunt id fugit eum fuga? Laboriosam nostrum sapiente inventore
              aperiam voluptas, voluptatum, suscipit tempore autem nesciunt
              natus provident ipsum asperiores qui aliquam id.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
