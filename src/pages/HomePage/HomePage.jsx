import Header from "../../components/Header";
import Hero from "../../components/Hero";
import FeaturedProduct from "./FeaturedProduct";
import { useAtom } from "jotai";
import userAtom from "../../reducer/atom";
const HomePage = () => {
  const [user, setUser] = useAtom(userAtom);
  console.log(user);
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
