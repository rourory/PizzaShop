import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

type SelectedSort = {
  name: string;
  title: string;
};

interface FilterSliceState {
  categoryIndex: number;
  ascendingSort: boolean;
  selectedSortType: SelectedSort;
  page: number;
}

const initialState: FilterSliceState = {
  categoryIndex: 0,
  ascendingSort: false,
  selectedSortType: {
    name: 'популярности',
    title: 'rating',
  },
  page: 1,
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryIndex(state, action: PayloadAction<number>) {
      state.categoryIndex = action.payload;
    },
    setSelectedSortType(state, action: PayloadAction<SelectedSort>) {
      state.selectedSortType = action.payload;
    },
    setAscendingSort(state, action: PayloadAction<boolean>) {
      state.ascendingSort = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = Number(action.payload);
    },
    setFullState(state, action: PayloadAction<FilterSliceState>) {
      state.categoryIndex = Number(action.payload.categoryIndex);
      state.selectedSortType = action.payload.selectedSortType;
      state.ascendingSort = action.payload.ascendingSort;
      state.page = Number(action.payload.page);
    },
  },
});

export const filterSelector = (state: RootState) => state.filter;
export const selectedSortTypeFilterSelector = (state: RootState) => state.filter.selectedSortType;
export const ascendingSortFilterSelector = (state: RootState) => state.filter.ascendingSort;

export const { setCategoryIndex, setSelectedSortType, setAscendingSort, setFullState, setPage } =
  filterSlice.actions;
export default filterSlice.reducer;
