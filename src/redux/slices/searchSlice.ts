import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface SearchSlice {
  searchValue: string;
}

const initialState: SearchSlice = {
  searchValue: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
  },
});

export const searchSelector = (state: RootState) => state.search;
export const searchValueSelector = (state: RootState) => state.search.searchValue;
export default searchSlice.reducer;
export const { setSearchValue } = searchSlice.actions;
