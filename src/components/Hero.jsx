import { Link } from "react-router-dom";
// import Book from "../assets/book.png";
import TextReveal from "../components/animations/TextReveal";

const Hero = () => {
  return (
    <div>
      <section className="Hero text-zinc-100 flex gap-y-4 lg:gap-y-0 justify-between h-auto lg:flex-row flex-col">
        <div className="writeup mt-12 lg:w-[50%]">
          <h1 className="font-semibold  text-2xl lg:text-5xl">
            <TextReveal text={"The Ultimate eBook Store"} />
          </h1>
          <h1 className="mt-3 mb-5 text-sm lg:text-lg lg:mt-6 lg:mb-10  font-light">
            Elevate your computer science journey with our curated collection of
            cutting-edge ebooks. Discover the latest releases, explore top-rated
            content, and immerse yourself in a seamless digital reading
            experience, designed for effortless learning and staying ahead in
            the rapidly evolving world of technology
          </h1>
          <Link to="/books">
            <button className="bg-blue-500 hover:bg-blue-700 text-white lg:py-3 lg:px-4 py-2 px-3 rounded-md transition-all">
              Explore eBooks
            </button>
          </Link>
        </div>
        <div className="img flex justify-center item-center ">
          <img
            className="lg:w-[32rem] h-auto"
            src="https://assets-global.website-files.com/64c4b66a44c38c5fa4309e5a/6589bfa25b7d61bf88a1f13e_book.png"
            alt="Book"
          />
        </div>
      </section>
    </div>
  );
};

export default Hero;
