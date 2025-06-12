import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProduct = createAsyncThunk("fetchProduct", async () => {
  let res = await axios.get("http://localhost:8080/product/products");

  return res.data;
});

export const upLoadProduct = createAsyncThunk("upLoadProduct", async (data) => {
  let res = await axios.post("http://localhost:8080/product/upload", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
});

export const deleteProduct = createAsyncThunk("deleteProduct", async (data) => {
  let res = await axios.delete(`http://localhost:8080/product/delete/${data}`);
  return res.data;
});

export const fetchImage = createAsyncThunk("fetchImage", async (data) => {
  let res = await axios.get(`http://localhost:8080/product/${data}/image`, {
    responseType: "blob",
  });
  let url = URL.createObjectURL(res.data);
  let obj = {
    data,
    url,
  };
  return obj;
});

export const updateProduct = createAsyncThunk("updateProduct", async (data) => {
  let res = await axios.put(
    `http://localhost:8080/product/update/${data.id}`,
    data.formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return res.data;
});

export const productSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
    isLoading: false,
    isError: false,
    imageUrl: {},
    searchData: "",
    cartData: [],
  },
  reducers: {
    setSearchData: (state, action) => {
      state.searchData = action.payload;
    },
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.cartData.find(
        (item) => item.id === product.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartData.push({ ...product, quantity: 1 });
      }
    },
    addQuantity: (state, action) => {
      let product = state.cartData.find(
        (product) => product.id == action.payload
      );
      if (product) {
        product.quantity += 1;
      }
    },
    removeQuantity: (state, action) => {
      state.cartData = state.cartData.map((product) => {
        return product.id == action.payload
          ? { ...product, quantity: product.quantity - 1 }
          : product;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchProduct.rejected, (state, action) => {
      state.isError = true;
    });
    builder.addCase(upLoadProduct.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(upLoadProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data.push(action.payload);
    });
    builder.addCase(upLoadProduct.rejected, (state, action) => {
      state.isError = true;
    });
    builder.addCase(fetchImage.pending, (state, action) => {});
    builder.addCase(fetchImage.fulfilled, (state, action) => {
      state.imageUrl[action.payload.data] = action.payload.url;
    });
    builder.addCase(fetchImage.rejected, (state, action) => {
      state.isError = true;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.data = state.data.filter((product) => {
        return product.id !== action.payload;
      });
    });

    builder.addCase(updateProduct.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(updateProduct.fulfilled, (state, action) => {
      console.log(action.payload);
      console.log(current(state.data));
      const updatedProduct = action.payload;
      const index = state.data.findIndex(
        (product) => product.id === updatedProduct.id
      );
      if (index !== -1) {
        state.data[index] = updatedProduct;
      }
      state.isLoading = false;
    });

    builder.addCase(updateProduct.rejected, (state, action) => {
      state.isError = true;
    });
  },
});

export default productSlice.reducer;
export const { setSearchData, addToCart, addQuantity, removeQuantity } =
  productSlice.actions;
