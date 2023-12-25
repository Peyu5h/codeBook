import ProductCard from "../../components/ProductCard"

const FeaturedProduct = () => {
  return (
    <div>
        <div className=" flex flex-col items-center justify-center">
     <div className="title mt-16 mb-2 text-2xl">Featured eBooks</div>
     <div className="line h-[2px] w-[20%] bg-blue-500 mb-12"></div>
     </div>
      <div className="grid lg:grid-cols-3 lg:grid-rows-1 md:grid-rows-1 grid-cols-1 md:grid-cols-2 grid-rows-3 gap-6 mx-2 md:mx-24">
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  )
}

export default FeaturedProduct
