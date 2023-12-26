import { FilterReducer } from "../reducer/FilterReducer";
import { createContext, useContext, useReducer } from "react";

const filterInitialState = {
  productList: [],
  onlyInStock: false,
  bestSellerOnly: false,
  sortBy: null,
  ratings: null,
};

export const FilterContext = createContext(filterInitialState);

export const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(FilterReducer, filterInitialState);

  function initialProductList(products) {
    dispatch({
      type: "PRODUCT_LIST",
      payload: {
        products: products,
      },
    });
  }

  const value = {
    productList: state.productList,
    initialProductList,
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};
