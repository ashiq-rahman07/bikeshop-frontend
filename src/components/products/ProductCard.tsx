import { BsCart3 } from "react-icons/bs";

interface ProductCardProps {
    id: number;
    name: string;
    brand: string;
    category: string;
    price: number;
    model: string;
    availability: boolean;
    image: string;
  }
  
  const ProductCard = (product: ProductCardProps) => {
    return (
      <div data-aos="zoom-in" className="rounded-2xl bg-gray-100  dark:bg-gray-800 hover:bg-black/50 dark:hover:bg-gray-600 hover:text-white relative shadow-xl duration-300 mb-20 group   m-10 flex w-full max-w-xs flex-col overflow-hidden   ">
        <a className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
          <img
            className="object-cover"
            src={product.image}
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
          <div className="mt-2 mb-5 flex items-center justify-between">
            <p>
              <span className="text-3xl font-bold">$449</span>
              <span className="text-sm line-through">$699</span>
            </p>
          
            <a
            href="#"
            className="flex items-center justify-center rounded-md bg-gradient-to-r from-primary to-secondary  px-2 py-2  text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
           
           <BsCart3 className="w-6 h-6" />
          </a>
          </div>
         
        </div>
                </div>
    );
  };
  
  export default ProductCard;