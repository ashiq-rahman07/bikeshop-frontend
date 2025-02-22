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
  transaction: ITransaction;
  _id: string;
  user: string;
  products: IProduct[];
  totalPrice: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}
