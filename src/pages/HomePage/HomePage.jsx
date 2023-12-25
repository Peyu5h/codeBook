import Header from "../../components/Header";
import Hero from "../../components/Hero";
import FeaturedProduct from "./FeaturedProduct";
const HomePage = () => {
  return (
    <div>
      <Header />
      <main className="lg:mt-20 mt-4">
        <Hero />
        <FeaturedProduct />
      </main>
    </div>
  );
};

export default HomePage;
