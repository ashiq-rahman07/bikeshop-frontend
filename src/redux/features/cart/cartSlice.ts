// import { products } from './../../../components/products/products';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { Product } from '../../../components/products/products';
// import { TBike } from '../../../types/product.type';
// import { Product } from '../../data/products';


interface CartItem {
  product: string;
  name: string;
  price: number;
  quantity: number;
  productStock:number;
  imageUrl: string;
  routes?:string;
  brand:string,
  category:string,
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.product === action.payload.product,
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.product !== action.payload,
      );
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ product: string; quantity: number }>,
    ) => {
      const item = state.items.find(
        (item) => item.product === action.payload.product,
      );
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    removeAllCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, removeAllCart } =
  cartSlice.actions;

export default cartSlice.reducer;
