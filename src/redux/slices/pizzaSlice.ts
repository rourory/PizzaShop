import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import def from '../../pages/Home/defaultPizza.json';
import { RootState } from '../store';

type PizzaSliceDataType = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

interface PizzaSliceState {
  data: PizzaSliceDataType[];
  fetchStatus: FetchingStatus;
}

export enum FetchingStatus {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export const fetchPizzas = createAsyncThunk<PizzaSliceDataType[], string>(
  'pizza/fetchPizzas',
  async (query) => {
    const { data } = await axios.get<PizzaSliceDataType[]>(
      `https://63303d64591935f3c88c4fed.mockapi.io/pizzas?${query}`,
    );
    return data;
  },
);

const initialState: PizzaSliceState = {
  data: [],
  fetchStatus: FetchingStatus.LOADING,
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setData(state, action: PayloadAction<PizzaSliceDataType[]>) {
      state.data = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.data = [];
      state.fetchStatus = FetchingStatus.LOADING;
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.data = action.payload;
      state.fetchStatus = FetchingStatus.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.data = def;
      state.fetchStatus = FetchingStatus.ERROR;
    });
  },
});

export const pizzaSelector = (state: RootState) => state.pizza;
export const { setData } = pizzaSlice.actions;
export default pizzaSlice.reducer;
