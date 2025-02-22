import { Link, useSearchParams } from 'react-router-dom';
import { useVerifyOrderQuery } from '../../redux/features/order/order';
import Loading from '../ui/Loading';

export interface OrderData {
  id: number;
  order_id: string;
  currency: string;
  amount: number;
  payable_amount: number;
  discsount_amount: number | null;
  disc_percent: number;
  received_amount: string;
  usd_amt: number;
  usd_rate: number;
  is_verify: number;
  card_holder_name: string | null;
  card_number: string | null;
  phone_no: string;
  bank_trx_id: string;
  invoice_no: string;
  bank_status: string;
  customer_order_id: string;
  sp_code: string;
  sp_message: string;
  name: string;
  email: string;
  address: string;
  city: string;
  value1: string | null;
  value2: string | null;
  value3: string | null;
  value4: string | null;
  transaction_status: string | null;
  method: string;
  date_time: string;
}
const VerifyOrder = () => {
  const [searchParams] = useSearchParams();

  const { isLoading, data } = useVerifyOrderQuery(
    searchParams.get('order_id'),
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const orderData: OrderData = data?.data?.[0];

  return isLoading ? (
    <Loading />
  ) : (
    <div className="min-h-screen  bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100  py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-poppins font-bold text-center mb-8">
          Order Verification
        </h1>
        <div className="grid  grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Details */}
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-poppins font-semibold mb-4">
              Order Details
            </h2>
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Order ID:</span>{' '}
                {orderData?.order_id}
              </p>
              <p>
                <span className="font-semibold">Date:</span>{' '}
                {new Date(orderData?.date_time)?.toLocaleString()}
              </p>

              <p>
                <span className={`font font-semibold$`}>Status:</span>{' '}
                {orderData?.bank_status}
              </p>

              <div className="mt-4 pt-4 border-t">
                <p className="text-xl font-poppins font-bold text-right">
                  Total:{' '}
                  <span className="text-primary">
                    {orderData?.currency} {orderData?.amount?.toFixed(2)}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-poppins font-semibold mb-4">
              Customer Information
            </h2>
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Name:</span> {orderData?.name}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {orderData?.email}
              </p>
              <p>
                <span className="font-semibold">Phone:</span>{' '}
                {orderData?.phone_no}
              </p>
              <p>
                <span className="font-semibold">Address:</span>{' '}
                {orderData?.address}
              </p>
              <p>
                <span className="font-semibold">City:</span> {orderData?.city}
              </p>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-poppins font-semibold mb-4">
              Payment Information
            </h2>
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Method:</span>{' '}
                {orderData?.method}
              </p>
              <p>
                <span className="font-semibold">Transaction ID:</span>{' '}
                {orderData?.bank_trx_id}
              </p>
              <p>
                <span className="font-semibold">Invoice No::</span>{' '}
                {orderData?.invoice_no}
              </p>
              <p>
                <span className="font-semibold">SP Code:</span>{' '}
                {orderData?.sp_code}
              </p>
              <p>
                <span className="font-semibold">SP Message:</span>{' '}
                {orderData?.sp_message}
              </p>
            </div>
          </div>

          {/* Verification Status */}
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-poppins font-semibold mb-4">
              Verification Status
            </h2>
            <div className="inline-flex items-center bg-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
              {orderData?.is_verify === 1 ? (
                <>
                  <span className="text-green-500">Verified</span>
                </>
              ) : (
                <>
                 <span className="text-green-500">Verified</span>
                </>
              )}
            </div>
          </div>
          <Link to="/dashboard/my-orders">
            <button className="w-96 py-2 text-lg font-medium   mt-4 bg-primary">
              View Orders
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyOrder;
