export const FilterReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "PRODUCT_LIST":
      return {
        ...state,
        productList: payload.products,
      };

    case "SORT_BY":
      return;
    case "RATINGS":
      return;
    case "ONLY_IN_STOCK":
      return;
    case "BEST_SELLER_ONLY":
      return;
    case "CLEAR_FILTERS":
      return;

    default:
      throw new Error(`No case Found`);
  }
};
