import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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

export const upLoadProduct = createAsyncThunk("upLoadProduct", async (data) => {
  let res = await axios.post("http://localhost:8080/product/upload", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
});

export const fetchProduct = createAsyncThunk("fetchProduct", async () => {
  let res = await axios.get("http://localhost:8080/product/products");
  return res.data;
});

export const productSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
    isLoading: false,
    isError: "",
    imageUrl: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(upLoadProduct.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(upLoadProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data.push(action.payload);
    });
    builder.addCase(upLoadProduct.rejected, (state, action) => {
      state.isError = false;
    });
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
    builder.addCase(fetchImage.pending, (state, action) => {});
    builder.addCase(fetchImage.fulfilled, (state, action) => {
      state.imageUrl[action.payload.data] = action.payload.url;
    });
    builder.addCase(fetchImage.rejected, (state, action) => {
      console.log(action);
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      console.log(action);

      state.data = state.data.filter((product) => {
        return product.id !== action.payload;
      });
    });
  },
});

export default productSlice.reducer;
