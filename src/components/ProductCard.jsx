import random from '../assets/images/10002.avif'
import { IoAdd } from "react-icons/io5";
import { FaRegTrashCan } from "react-icons/fa6";

const ProductCard = () => {
  return (
    <div>
      <div className="card w-full rounded-lg h-auto bg-slate-700">
        <div className="imgContainer relative">
            <img className='rounded-t-lg w-full h-[16rem]' src={random} alt="book_img" />
            <div className="bestseller bg-orange-600 text-white font-normal top-0 ml-2 mt-2 rounded-md text-sm px-2 py-1 absolute">Best seller</div>
        </div>
        <div className="cardContent p-6 flex flex-col md:gap-4 gap-3 mt-2">
            <div className="title md:text-2xl text-xl font-semibold">The Complete Guide To Backend Developement</div>
            <div className="description md:text-sm text-xs font-light">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur libero ex ad voluptas ratione aperiam?</div>
            <div className="rating"><img src="https://assets-global.website-files.com/64c4b66a44c38c5fa4309e5a/653685125a96965b996de20d_4-HALF.png" alt="" /></div>
            <div className="priceAndBtn flex flex-row justify-between mb-4">
                <div className="price text-xl mt-2 font-semibold">$ 20</div>
                <button className="ADD bg-blue-500 text-white hover:bg-blue-600 transition-all md:px-3 md:py-2 px-2 py-1 rounded-md">
                    <span span className="flex items-center">Add to cart <IoAdd className="ml-2" /></span>
                </button>   

                <button className="REMOVE bg-red-600 text-white hover:bg-red-700 transition-all md:px-3 md:py-2 px-2 py-1 rounded-md">
                    <span span className="flex items-center">Remove <FaRegTrashCan className="ml-2" /></span>
                </button>           
            </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
