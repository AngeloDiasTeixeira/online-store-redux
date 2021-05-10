import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const domainAndPort = ((process.env.NODE_ENV) == "development") ? "http://localhost:3001/" : "";

export const fetchProductsAsync = createAsyncThunk("products/fetchProducts", async () => {
    let response = await fetch(`${domainAndPort}api/products`);
    let products = await response.json();
    return products;
})

const productsSlice = createSlice({
    name: "products",
    initialState: {products: [], status:"IDLE"},
    reducers: {},
    extraReducers: builder => {
        builder
        .addCase(fetchProductsAsync.pending, state => {
            state.status="LOADING"
        })
        .addCase(fetchProductsAsync.fulfilled, (state,action) => {
            state.status="IDLE";
            state.products = action.payload;
        })
    }
})

export const selectAllProducts = state => state.products.products;

export default productsSlice.reducer;