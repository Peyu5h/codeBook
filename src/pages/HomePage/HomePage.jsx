import Header from "../../components/Header";
import Hero from "../../components/Hero";
import FeaturedProduct from "./FeaturedProduct";
import userReducer from "../../reducer/userReducer";
import { useSelector, useDispatch } from "react-redux";

const HomePage = () => {
  // const dispatch = useDispatch();
  // const user = useSelector((state) => state.userReducer);

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
