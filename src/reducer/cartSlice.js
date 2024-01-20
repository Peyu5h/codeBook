// cartSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const fetchUserCart = createAsyncThunk("cart/fetchUserCart", async (userId) => {
  try {
    const response = await fetch(`${backendUrl}/cart/${userId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user cart:", error);
    throw error;
  }
});

const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId }) => {
    try {
      const data = await fetch(`${backendUrl}/addToCart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          productId: productId,
        }),
      });
      const response = await data.json();
      return response.user.cart;
    } catch (error) {
      console.error("Error adding item to cart:", error);
      throw error;
    }
  }
);

const initialState = {
  userCart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCart.fulfilled, (state, action) => {
        state.userCart = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const { productId, quantity } = action.meta.arg;
        const existingProductIndex = state.userCart.findIndex(
          (item) => item.productId === productId
        );

        if (existingProductIndex !== -1) {
          state.userCart.splice(existingProductIndex, 1);
        } else {
          state.userCart.push({ productId, quantity });
        }
      })
      .addCase(fetchUserCart.rejected, (state, action) => {
        console.error("Error fetching user cart:", action.error);
      })
      .addCase(addToCart.rejected, (state, action) => {
        console.error("Error adding item to cart:", action.error);
      });
  },
});

export default cartSlice.reducer;
export { fetchUserCart, addToCart };
