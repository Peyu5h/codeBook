export const FilterReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "PRODUCT_LIST":
      return {
        ...state,
        productList: payload.products,
      };

    case "SORT_BY":
      return {
        ...state,
        sortBy: payload.sortBy,
      };

    case "RATINGS":
      return {
        ...state,
        ratings: payload.ratings,
      };

    case "ONLY_IN_STOCK":
      return {
        ...state,
        onlyInStock: payload.onlyInStock,
      };

    case "BEST_SELLER_ONLY":
      return {
        ...state,
        bestSellerOnly: payload.bestSellerOnly,
      };

    default:
      throw new Error(`No case Found for action type: ${type}`);
  }
};
