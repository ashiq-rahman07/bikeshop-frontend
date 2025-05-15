
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { Badge } from "@/components/ui/badge";
import { TBike, TGear } from "@/types/product.type";

interface ProductCardProps {
  product: TGear;
  routes:string;
}

const ProductCard = ({ product,routes }: ProductCardProps) => {
  console.log(product);
  // const { addToCart } = useCart();
  
  // const handleAddToCart = () => {
  //   addToCart(product, 1);
  // };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
     <div className="product-card group">
      <div className="relative overflow-hidden">
        <Link to={`/${routes}/${product._id}`}>
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-48 object-cover transform transition-transform duration-500 group-hover:scale-105"
          />
          {discount > 0 && (
            <Badge className="absolute top-2 right-2 bg-primary">
              {discount}% OFF
            </Badge>
          )}
        </Link>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <Link to={`/${routes}/${product._id}`}>
              <h3 className="text-lg font-semibold line-clamp-1">{product.name}</h3>
            </Link>
            <div className="text-sm text-gray-600">{product.brand} | {product.category}</div>
          </div>
          <div className="flex items-center">
            <span className="text-yellow-500">★</span>
            <span className="ml-1 text-sm">{product.rating.toFixed(1)}</span>
          </div>
        </div>

        <div className="mt-3 flex justify-between items-center">
          <div className="flex items-center">
            {product.originalPrice ? (
              <>
                <span className="font-bold text-lg">${product.price.toLocaleString()}</span>
                <span className="ml-2 text-sm text-gray-500 line-through">
                  ${product.originalPrice.toLocaleString()}
                </span>
              </>
            ) : (
              <span className="font-bold text-lg">${product.price.toLocaleString()}</span>
            )}
          </div>
          <div>
            {product.stock > 0 ? (
              <span className="text-xs text-green-600 font-medium">In Stock</span>
            ) : (
              <span className="text-xs text-red-600 font-medium">Out of Stock</span>
            )}
          </div>
        </div>

        <div className="mt-4 flex space-x-2">
          <Link to={`/${routes}/${product._id}`} className="flex-1">
            <Button variant="outline" className="w-full">Details</Button>
          </Link>
          <Button 
            // onClick={handleAddToCart} 
            disabled={product.stock <= 0}
            className="flex-1"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
