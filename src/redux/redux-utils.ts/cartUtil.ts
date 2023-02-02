import { CartSliceItem, CartSliceState } from '../slices/cartSlice';

export const getCartFormLocalStorage = (): CartSliceState => {
  const items: Array<CartSliceItem> = JSON.parse(localStorage.getItem('cart')) || [];
  let totalCount = 0;
  let totalPrice = 0;
  if (items.length > 0) {
    items.forEach((item) => {
      totalCount += item.count;
      totalPrice += item.price * item.count;
    });
  }

  console.log('Function getCartFormLocalStorage was called. Data:', items);
  return { items, totalCount, totalPrice };
};
