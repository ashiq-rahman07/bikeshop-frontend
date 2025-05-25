// import { products } from './../../../components/products/products';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { Product } from '../../../components/products/products';
// import { TBike } from '../../../types/product.type';
// import { Product } from '../../data/products';



export interface ICartItem {
    productId: string;
    productName: string;
    productImg: string;
    quantity: number;
    productType: 'gear' | 'bike';
    routes: string;
    price: number;
    brand:string;
    category:string;
    productStock: number;

}

interface CartState {
  items: ICartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ICartItem>) => {
      const existingItem = state.items.find(
        (item) => item.productId === action.payload.productId,
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload,
      );
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ product: string; quantity: number }>,
    ) => {
      const item = state.items.find(
        (item) => item.productId === action.payload.product,
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
