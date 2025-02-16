import { BsCart3 } from "react-icons/bs";
// import { useDispatch } from "react-redux";
// import { addToCart } from "../../redux/features/cart/cartSlice";
import { Link } from "react-router-dom";
// import { Product } from "./products";
import { TBike } from "../../types/product.type";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { useDispatch } from "react-redux";

// interface ProductCardProps {
//     id: string;
//     name: string;
//     brand: string;
//     category: string;
//     price: number;
//     model: string;
//     availability: boolean;
//     image: string;
//   }
type TProductCardProps={
  product: TBike;
}


  
  const ProductCard:React.FC<TProductCardProps> = ({ product }) => {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
      dispatch(addToCart({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
        imageUrl: product.bikeImg as string,
      }));
    };
  
    return (
      <div data-aos="zoom-in" className="rounded-2xl bg-gray-100  dark:bg-gray-800  relative shadow-xl duration-300 mb-20 group   m-10 flex w-full max-w-xs flex-col overflow-hidden   ">
        <a className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
          <img
            className="object-cover"
            src={product.bikeImg}
            alt="product image"
          />
          <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
            39% OFF
          </span>
        </a>
        <div className="mt-4 px-5 pb-5">
          <a href="#">
            <h5 className="text-xl tracking-tight">{product.name}</h5>
          </a>
          <p>A mountain bike (MTB) is a rugged bicycle designed for off-road cycling, </p>
          <div className="mt-2 mb-5 flex items-center justify-between">
            <p>
              <span className="text-3xl font-bold">$449</span>
              <span className="text-sm line-through">$699</span>
            </p>
          
           
          </div>
            <div className="flex justify-between items-center">
            <Link to={`/products/${product._id}`} className="hover:border-b-2 border-gray-950">Biew Details</Link>
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex items-center justify-center rounded-md bg-gradient-to-r from-primary to-secondary  px-2 py-2  text-center text-sm font-medium text-gray-200 hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
           Add To Cart
           <BsCart3 className="w-4 h-4 font-semibold ml-1" />
          </button>
            </div>
          
        </div>
        </div>
    );
  };
  
  export default ProductCard;