import { Link, useNavigate, useParams } from "react-router-dom";
// import { useGetProductByIdQuery } from "../../redux/features/products/productsApi";
// import { useCreateOrderMutation } from "../../redux/features/order/ordersApi";
import { useState } from "react";
// import { selectCurrentUser } from "../../redux/features/user/authSlice";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/user/authSlice";
import { useGetProductByIdQuery } from "../../redux/features/products/productsApi";

type TOrder ={
  user: string; // User ID
  product: string; // Product ID
  quantity: number;
  totalPrice: number;
}

const ProductDetails= () => {
  const navigate =useNavigate()
    const { productId } = useParams<{ productId: string }>();
  const user = useAppSelector(selectCurrentUser)
if(!user){
  throw Error('You are not authincated')
}
    const [quantity, setQuantity] = useState(1);
        const { data, error, isLoading:singleProductLoading } = useGetProductByIdQuery(productId as string);
        // const [createOrder, { isLoading: isCreatingOrder }] = useCreateOrderMutation();
        const product = data?.data
        
      
      
 
 const handleAddToCartAndCreateOrder = async () => {
  if (!product) return;

  // Add the product to the cart
  // dispatch(addToCart(product));

  // Create an order with the product
  // const order = {
  //   items: [{ product, quantity: 1 }],
  //   total: product.price,
  // };
  const orderProduct:TOrder = {
    user:user?.userId,
    product :product.id,
  quantity,

    totalPrice:product.price * quantity
   }
  try {
    console.log(orderProduct);
    await createOrder(orderProduct).unwrap();
    navigate('/cart'); // Redirect to the cart page after creating the order
  } catch (error) {
    console.error('Failed to create order:', error);
  }
};

    if (singleProductLoading) return <div className="text-center text-lg">Loading...</div>;
    if (error) return <div className="text-center text-red-500">Error loading product.</div>;
   

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap -mx-4">
          {/* Product Images */}
          <div className="w-full md:w-1/2 px-4 mb-8">
            <img
              src={product?.bikeImg}
              alt="Product"
              className="w-full h-auto rounded-lg shadow-md mb-4"
            />
              </div>

          {/* Product Details */}
          <div className="w-full md:w-1/2 px-4">
            <h2 className="text-3xl font-bold mb-2">{product?.name}</h2>
            <p className="text-gray-600 mb-4">Model:{product?.model}</p>
            <div className="mb-4">
              <span className="text-2xl font-bold mr-2">${product?.price}</span>
              <span className="text-gray-500 line-through">$399.99</span>
            </div>
            <p className="text-gray-700 mb-6">
              {product?.description}
            </p>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Color:</h3>
              <div className="flex space-x-2">
                <button className="w-8 h-8 bg-black rounded-full"></button>
                <button className="w-8 h-8 bg-gray-300 rounded-full"></button>
                <button className="w-8 h-8 bg-blue-500 rounded-full"></button>
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity:</label>
              <input type="number" id="quantity" min="1" value={quantity}  onChange={(e) => setQuantity(Number(e.target.value))} className="w-12 text-center rounded-md border-gray-300 shadow-sm" />
            </div>
            <div className="flex space-x-4 mb-6">
           <Link to='/cart'>
           <button
              onClick={handleAddToCartAndCreateOrder}
              disabled={isCreatingOrder}
              className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors duration-300"
            >
              {isCreatingOrder ? 'Creating Order...' : 'Add to Cart & Create Order'}
            </button>
           </Link>
              <Link to='' className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300">
                Wishlist
              </Link>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Key Features:</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>Industry-leading noise cancellation</li>
                <li>30-hour battery life</li>
                <li>Touch sensor controls</li>
                <li>Speak-to-chat technology</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
