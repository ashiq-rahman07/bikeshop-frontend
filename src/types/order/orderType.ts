export interface ITransaction {
  id: string;
  transactionStatus: string | null;
  bank_status: string;
  date_time: string;
  method: string;
  sp_code: string;
  sp_message: string;
}

export interface IProduct {
  product: string;
  quantity: number;
}
// export type TStatus = 'Pending' | 'Paid' | 'Shipped' | 'Completed' | 'Cancelled';
export interface IOrder {
  _id:string;
  user: string;
  products: {
    productId: string;
    productImg: string;
    quantity: number;
    productType: 'gear' | 'bike';
  }[];
  totalPrice: number;
  status: 'Pending' | 'Paid' | 'Shipped' | 'Completed' | 'Cancelled';
  shippingAddress: {
    fullName: string;
    streetAddress: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone: string;
  };
  orderDate: Date; // ISO date string
  estimatedDeliveryDate?: Date; // ISO date string
  transaction: ITransaction
}

