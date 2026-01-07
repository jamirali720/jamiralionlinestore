import { createSlice } from "@reduxjs/toolkit";


const initialState = {  
  searchTerm: "",
  category: "All",
  minPrice: 0,
  maxPrice: 225000,
  limit: 5,
  page: 1,
  brand: "All", 
  ratings: 0,
  sort: "asc",
 
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {    
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },

    setPrice: (state, action) => {
      state.minPrice = action.payload.minPrice;
      state.maxPrice = action.payload.maxPrice;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },    
    setBrand: (state, action) => {
      state.brand = action.payload;
    },          
    setRating: (state, action) => {
      state.ratings = action.payload;
    },
    setSorting: (state, action) => {
      state.sort = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
    clearFilters: (state) => {
      state.limit = 5;
      state.page = 1;
      state.category = "All";
      state.minPrice = 0;
      state.maxPrice = 250000;
      state.brand = "All";
      state.ratings = 0;
      state.sort = "asc";
      state.searchTerm = "";
    },
  },
 
});

export const {
  setSearchTerm,
  setPage,
  clearFilters,
  setPrice,
  setLimit,
  setBrand,
  setRating,
  setSorting,
  setCategory,
 
} = filterSlice.actions;

export default filterSlice.reducer;





