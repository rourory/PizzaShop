import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

type CartSliceItem = {
  count: number;
  id: number;
  imageUrl: string;
  pastryType: number;
  price: number;
  size: number;
  title: string;
};

interface CartSliceState {
  totalPrice: number;
  totalCount: number;
  items: CartSliceItem[];
}

const initialState: CartSliceState = {
  totalPrice: 0,
  totalCount: 0,
  items: [],
};

/**
 * Ищет в массиве items элемент по свойствам id, size и pastryType
 * @param {*} state - текущее состояние слайса
 * @param {*} item - добавляемый элемент
 * @returns найденный элемент в массиве или undefined
 */
const findItem = (state: CartSliceState, item: CartSliceItem) => {
  return state.items.find(
    (obj) => obj.id === item.id && obj.size === item.size && obj.pastryType === item.pastryType,
  );
};

/**
 * Добавляет элемент в массив items если его там нет или добавляет единицу к его
 * свойству count, если такой элемент уже есть в массиве
 * @param {*} state - текущее состояние слайса
 * @param {*} item - добавляемый элемент
 * @param {*} itemIndex - индекс элемента в массиве items
 */
const pushTheElementIntoArray = (
  state: CartSliceState,
  item: CartSliceItem,
  itemIndex: number = state.items.length + 1,
) => {
  state.items = [
    ...state.items.slice(0, itemIndex),
    item,
    ...state.items.slice(itemIndex + 1, state.items.length),
  ];
  state.totalPrice = state.totalPrice + item.price;
  state.totalCount = state.totalCount + 1;
};

/**
 * Удаляет эелемент из массива items по индексу
 * @param {*} state - текущее состояние слайса
 * @param {*} itemIndex - индекс элемента в массиве items
 */
const removeItemFromArray = (state: CartSliceState, itemIndex: number) => {
  state.items = [
    ...state.items.slice(0, itemIndex),
    ...state.items.slice(itemIndex + 1, state.items.length),
  ];
};

/**
 * Убирает элемент из массива items или единицу из его свойства count, если count > 1
 * @param {*} state - текущее состояние слайса
 * @param {*} item - удаляемый элемент
 * @param {*} itemIndex - индекс элемента в массиве items
 */
const popTheElementFromArray = (state: CartSliceState, item: CartSliceItem, itemIndex: number) => {
  if (item.count > 0) {
    state.items = [
      ...state.items.slice(0, itemIndex),
      item,
      ...state.items.slice(itemIndex + 1, state.items.length),
    ];
  } else {
    removeItemFromArray(state, itemIndex);
  }
  state.totalPrice = state.totalPrice - item.price;
  state.totalCount = state.totalCount - 1;
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartSliceItem>) {
      const item = findItem(state, action.payload);
      if (!item) {
        pushTheElementIntoArray(state, action.payload);
      } else {
        const itemIndex = state.items.indexOf(item);
        item.count++;
        pushTheElementIntoArray(state, item, itemIndex);
      }
    },

    incrementItem(state, action: PayloadAction<CartSliceItem>) {
      const item = findItem(state, action.payload);
      const itemIndex = state.items.indexOf(item);
      item.count++;
      pushTheElementIntoArray(state, item, itemIndex);
    },
    decrementItem(state, action: PayloadAction<CartSliceItem>) {
      const item = findItem(state, action.payload);
      const itemIndex = state.items.indexOf(item);
      item.count--;
      popTheElementFromArray(state, item, itemIndex);
    },
    removeItem(state, action: PayloadAction<CartSliceItem>) {
      removeItemFromArray(state, state.items.indexOf(findItem(state, action.payload)));
      state.totalPrice = state.totalPrice - action.payload.price * action.payload.count;
      state.totalCount = state.totalCount - action.payload.count;
    },
    removeAllItems(state, action) {
      state.items = [];
      state.totalCount = 0;
      state.totalPrice = 0;
    },
  },
});

export const cartSelector = (state: RootState) => state.cart;

export const { addItem, incrementItem, decrementItem, removeItem, removeAllItems } =
  cartSlice.actions;
export default cartSlice.reducer;
