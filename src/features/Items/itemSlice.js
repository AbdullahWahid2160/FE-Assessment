import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  filteredItems: [],
  searchTerm: "",
  sorted: false,
  error: null,
  loading: false,
};

export const fetchItemsAsync = createAsyncThunk(
  "itemList/fetchItemsAsync",
  async () => {
    const cachedData = localStorage.getItem("apiData");
    if (cachedData) {
      return JSON.parse(cachedData);
    } else {
      try {
        const response = await axios.get(
          "http://universities.hipolabs.com/search?country=United%20Arab%20Emirates"
        );
        const responseData = response?.data;
        localStorage.setItem("apiData", JSON.stringify(responseData));
        return responseData;
      } catch (error) {
        console.log("Error fetching Data: ", error);
        return error;
      }
    }
  }
);

const itemListSlice = createSlice({
  name: "itemList",
  initialState,
  reducers: {
    searchedItems(state, action) {
      state.searchTerm = action.payload;
      state.filteredItems = state.items.filter((item) =>
        item.name.toLowerCase().includes(state.searchTerm.toLowerCase())
      );
    },
    sortedItems(state) {
      state.sorted = !state.sorted;
      state.filteredItems = state.filteredItems.sort((a, b) => {
        return state.sorted
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      });
    },
    deleteItem(state, action) {
      state.items = state.items.filter(
        (item) => item.name !== action.payload.name
      );
      state.filteredItems = state.filteredItems.filter(
        (item) => item.name !== action.payload.name
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchItemsAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchItemsAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.items = action.payload;
      state.filteredItems = action.payload;
    });
    builder.addCase(fetchItemsAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { searchedItems, sortedItems, deleteItem } = itemListSlice.actions;

export default itemListSlice.reducer;
