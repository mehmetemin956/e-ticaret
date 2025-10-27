import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const URL = 'https://fakestoreapi.com/';

const initialState = {
    products: [],
    selectedProduct: {},
    filteredProducts: {},
    loading: false
}

export const getAllProducts = createAsyncThunk("getAllProducts", async () => {
    const response = await axios.get(`${URL}/products`);
    return response.data
})

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProductSelected: (state, action) => {
            state.selectedProduct = action.payload;
        },
        setFilteredProducts: (state, action) => {
            state.filteredProducts = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllProducts.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
            state.filteredProducts = action.payload;
        })
    }
})

export const { setProductSelected, setFilteredProducts } = productSlice.actions
export default productSlice.reducer