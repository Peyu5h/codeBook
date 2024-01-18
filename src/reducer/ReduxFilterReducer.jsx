// ReduxFilterReducer.js
import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    productList: [],
    onlyInStock: false,
    bestSellerOnly: false,
    sortBy: null,
    ratings: null,
  },
  reducers: {
    setProductList: (state, action) => {
      state.productList = action.payload.products;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload.sortBy;
    },
    setRatings: (state, action) => {
      state.ratings = action.payload.ratings;
    },
    setOnlyInStock: (state, action) => {
      state.onlyInStock = action.payload.onlyInStock;
    },
    setBestSellerOnly: (state, action) => {
      state.bestSellerOnly = action.payload.bestSellerOnly;
    },
  },
});

export const {
  setProductList,
  setSortBy,
  setRatings,
  setOnlyInStock,
  setBestSellerOnly,
} = filterSlice.actions;

export default filterSlice.reducer;

// ReduxFilterReducer.js (Selectors)
export const selectFilteredProducts = (state) => {
  let filteredProducts = state.filter.productList;

  // Apply filters based on state values
  if (state.filter.onlyInStock) {
    filteredProducts = filteredProducts.filter(
      (product) => product.in_stock === true
    );
  }

  if (state.filter.bestSellerOnly) {
    filteredProducts = filteredProducts.filter(
      (product) => product.best_seller === true
    );
  }

  // Add additional filters based on your requirements

  // Sort the products based on the sortBy value
  if (state.filter.sortBy === "lowtohigh") {
    filteredProducts.sort((a, b) => Number(a.price) - Number(b.price));
  } else if (state.filter.sortBy === "hightolow") {
    filteredProducts.sort((a, b) => Number(b.price) - Number(a.price));
  }

  // Apply rating filter
  if (state.filter.ratings !== null) {
    filteredProducts = filteredProducts.filter(
      (product) => product.rating === state.filter.ratings
    );
  }

  return filteredProducts;
};
