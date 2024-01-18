import Header from "../../components/Header";
import { FaFilter } from "react-icons/fa";
import ProductCard from "../../components/ProductCard";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ProductPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("search");

  const [show, setShow] = useState(false);

  const [loading, setLoading] = useState(false);

  const [initialProductList, setInitialProductList] = useState([]);
  const [filteredProductList, setFilteredProductList] = useState([]);

  async function fetchData() {
    try {
      setLoading(true);
      const data = await fetch(
        `http://localhost:3000/products/?name_like=${
          searchTerm !== null ? searchTerm : ""
        }`
      );
      const response = await data.json();
      setInitialProductList(response);
      setFilteredProductList(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [searchTerm]);

  //Filtering
  const [bestSellerOnly, setBestSellerOnly] = useState(false);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [sortPrice, setSortPrice] = useState(null);
  const [PriceFilter, setPriceFilter] = useState(null);
  const [ratingFilter, setRatingFilter] = useState(null);

  useEffect(() => {
    let updatedList = initialProductList;

    // Filtering
    if (bestSellerOnly) {
      updatedList = updatedList.filter(
        (product) => product.best_seller === true
      );
    }

    if (onlyInStock) {
      updatedList = updatedList.filter((product) => product.in_stock === true);
    }

    if (bestSellerOnly && onlyInStock) {
      updatedList = updatedList.filter(
        (product) => product.in_stock === true && product.best_seller === true
      );
    }

    setFilteredProductList(updatedList);
  }, [bestSellerOnly, onlyInStock, initialProductList]);

  const handlePriceSort = (e) => {
    const sortedProducts = [...filteredProductList];

    if (e == "low-high") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    if (e == "high-low") {
      sortedProducts.sort((a, b) => a.price - b.price);
    }
    setFilteredProductList(sortedProducts);
    setPriceFilter(e);
  };

  const handleRatingSort = (e) => {
    const updatedList = filteredProductList.filter((product) => {
      switch (e) {
        case "4plus":
          return product.rating >= 4;
        case "3plus":
          return product.rating >= 3;
        case "2plus":
          return product.rating >= 2;
        case "1plus":
          return product.rating >= 1;
        default:
          return true;
      }
    });
    setFilteredProductList(updatedList);
    setRatingFilter(e);
  };

  const handleClearAll = () => {};
  console.log(filteredProductList);

  return (
    <div>
      <Header />
      {loading ? null : (
        <div>
          <div className="content lg:mt-16 mt-6 flex justify-between md:mx-24 mx-2">
            <div className="md:text-2xl text-xl font-pop text-slate-300">
              Showing {filteredProductList.length} eBooks
            </div>
            <div
              onClick={() => setShow(!show)}
              className="filterBtn cursor-pointer hover:bg-slate-700 transition-all bg-slate-600 p-3 rounded-md"
            >
              {show ? <RxCross2 /> : <FaFilter />}
            </div>
          </div>

          {show ? (
            <div className="filters mr-2 md:mr-24 ml-auto md:ml-24 h-auto p-4 rounded-md bg-slate-600 my-4">
              <div className="container">
                <h2 className="flex font-pop mt-2 text-2xl">Filters</h2>
                <div className="filter ">
                  <div className="flex flex-col lg:flex-row  justify-around ml-4">
                    <div className="mt-4 my-1">
                      <ul>
                        <li>
                          <div>
                            <input
                              id="best-seller"
                              onChange={() =>
                                setBestSellerOnly(!bestSellerOnly)
                              }
                              type="checkbox"
                              value=""
                              checked={bestSellerOnly}
                              className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label
                              htmlFor="best-seller"
                              className="ml-2 text-md font-medium text-gray-900 dark:text-gray-300"
                            >
                              Best Seller Only
                            </label>
                          </div>
                          <div className="flex items-center my-1">
                            <input
                              id="only-instock"
                              onChange={() => setOnlyInStock(!onlyInStock)}
                              type="checkbox"
                              value=""
                              checked={onlyInStock}
                              className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label
                              htmlFor="only-instock"
                              className="ml-2 text-md font-medium text-gray-900 dark:text-gray-300"
                            >
                              INSTOCK Only
                            </label>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div className="PriceRadioBtn">
                      <ul className="text-slate-700 dark:text-slate-100">
                        <li className="mt-1 mb-5">
                          <p className="font-semibold my-1">Pricing</p>
                          <div className="flex items-center my-1">
                            <input
                              id="price-sort-1"
                              type="radio"
                              value=""
                              checked={PriceFilter == "low-high"}
                              onChange={() => handlePriceSort("low-high")}
                              name="price-sort"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label
                              htmlFor="price-sort-1"
                              className="ml-2 text-md font-medium text-gray-900 dark:text-gray-300"
                            >
                              Price - Low to High
                            </label>
                          </div>
                          <div className="flex items-center my-1">
                            <input
                              id="price-sort-2"
                              type="radio"
                              checked={PriceFilter == "high-low"}
                              onChange={() => handlePriceSort("high-low")}
                              value=""
                              name="price-sort"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label
                              htmlFor="price-sort-2"
                              className="ml-2 text-md font-medium text-gray-900 dark:text-gray-300"
                            >
                              Price - High to Low
                            </label>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="Rating">
                      <ul>
                        <li className="mt-1 mb-5">
                          <span className="font-semibold">Rating</span>
                          <div className="flex items-center my-1">
                            <input
                              id="rating-sort-1"
                              type="radio"
                              value=""
                              checked={ratingFilter === "4plus"}
                              onChange={() => handleRatingSort("4plus")}
                              name="rating-sort"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label
                              htmlFor="rating-sort-1"
                              className="ml-2 text-md font-medium text-gray-900 dark:text-gray-300"
                            >
                              4 Stars & Above
                            </label>
                          </div>
                          <div className="flex items-center my-1">
                            <input
                              id="rating-sort-2"
                              type="radio"
                              value=""
                              checked={ratingFilter === "3plus"}
                              onChange={() => handleRatingSort("3plus")}
                              name="rating-sort"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label
                              htmlFor="rating-sort-2"
                              className="ml-2 text-md font-medium text-gray-900 dark:text-gray-300"
                            >
                              3 Stars & Above
                            </label>
                          </div>
                          <div className="flex items-center my-1">
                            <input
                              id="rating-sort-3"
                              type="radio"
                              value=""
                              checked={ratingFilter === "2plus"}
                              onChange={() => handleRatingSort("2plus")}
                              name="rating-sort"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label
                              htmlFor="rating-sort-3"
                              className="ml-2 text-md font-medium text-gray-900 dark:text-gray-300"
                            >
                              2 Stars & Above
                            </label>
                          </div>
                          <div className="flex items-center my-1">
                            <input
                              id="rating-sort-4"
                              type="radio"
                              value=""
                              checked={ratingFilter === "1plus"}
                              onChange={() => handleRatingSort("1plus")}
                              name="rating-sort"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label
                              htmlFor="rating-sort-4"
                              className="ml-2 text-md font-medium text-gray-900 dark:text-gray-300"
                            >
                              1 Stars & Above
                            </label>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleClearAll()}
                      className=" mb-8 rounded-lg p-4 hover:bg-slate-800 trnsition-all bg-slate-700 text-gray-90"
                    >
                      Clear Filter
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          <div className="grid lg:grid-cols-3 lg:grid-rows-1 md:grid-rows-1 grid-cols-1 md:grid-cols-2 grid-rows-3 gap-6 gap-y-8 mx-2 md:mx-24 mt-12">
            {filteredProductList.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
