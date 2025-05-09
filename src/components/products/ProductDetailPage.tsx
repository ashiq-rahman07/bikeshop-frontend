
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
// import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  ChevronLeft, 
  Minus, 
  Plus, 
  ShoppingBag, 
  Star, 
  Check, 
  AlertCircle 
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { getProductById } from "@/data/products";
import { Product } from "@/types";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/user/authSlice";
import { useGetProductByIdQuery } from "@/redux/features/products/productsApi";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/features/cart/cartSlice";


const features = [
  "Advanced fuel injection system",
  "Dual-channel ABS",
  "Digital instrument cluster",
  "LED lighting all around",
  "Adjustable suspension",
  "Quick-shifter",
  "Riding modes: Sport, Road, Rain"
]

const  specifications = {
      "Engine": "1800cc V-twin, air-cooled",
      "Power": "95 HP @ 5,500 rpm",
      "Torque": "150 Nm @ 3,000 rpm",
      "Transmission": "6-speed, belt final drive",
      "Frame": "Steel double cradle",
      "Front Suspension": "Telescopic fork",
      "Rear Suspension": "Dual shocks, adjustable preload",
      "Front Brake": "Dual 300mm discs",
      "Rear Brake": "Single 292mm disc",
      "Wheelbase": "1,680mm",
      "Seat Height": "700mm",
      "Weight": "320kg (wet)",
      "Fuel Capacity": "22 liters"
}

const images =[
  "https://images.unsplash.com/photo-1619771914272-e3b83056ac56?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1621963849934-f1abdb803302?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1581882898666-440f1cbb3e6c?w=800&h=600&fit=crop"
]

const ProductDetailPage = () => {
  const navigate = useNavigate();
   const { productId } = useParams<{ productId: string }>();
   const user = useAppSelector(selectCurrentUser);
  //  if (!user) {
  //    throw Error('You are not authincated');
  //  }
   const [quantity, setQuantity] = useState(1);
   const {
     data,
     error,
     isLoading: singleProductLoading,
   } = useGetProductByIdQuery(productId as string);
   // const [createOrder, { isLoading: isCreatingOrder }] = useCreateOrderMutation();
   const product = data?.data;
   const dispatch = useDispatch();




  
  // const [product, setProduct] = useState<Product | null>(null);
  // const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  // const [isLoading, setIsLoading] = useState(true);
  
  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     setIsLoading(true);
      
  //     try {
  //       // Simulate API call delay
  //       await new Promise(resolve => setTimeout(resolve, 500));
        
  //       if (!id) return;
        
  //       const fetchedProduct = getProductById(id);
        
  //       if (fetchedProduct) {
  //         setProduct(fetchedProduct);
  //         setSelectedImage(0);
  //       } else {
  //         navigate("/products", { replace: true });
  //       }
  //     } catch (error) {
  //       console.error("Error fetching product:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
    
  //   fetchProduct();
  // }, [id, navigate]);
  
  const handleQuantityDecrease = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };
  
  const handleQuantityIncrease = () => {
    setQuantity(prev => (prev < (product?.quantity || 1) ? prev + 1 : prev));
  };
  
 
  
  // const discount = product?.originalPrice
  //   ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
  //   : 0;

  const handleAddToCart = () => {
      dispatch(
        addToCart({
          product: product?._id as string,
          name: product?.name as string,
          price: product?.price as number,
          quantity,
          imageUrl: product?.bikeImg as string,
        }),
      );
  
      navigate('/');
    };
  
  if (singleProductLoading) {
    return (
   
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-10">
          <div className="animate-pulse grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-200 rounded-lg h-96"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-24 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded w-1/3"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
   
    );
  }
  
  if (!product) {
    return (

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center mt-10">
          <AlertCircle className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold">Product not found</h1>
          <p className="mt-2 text-gray-600">The product you're looking for doesn't exist or has been removed.</p>
          <Link to="/products">
            <Button className="mt-6">View All Products</Button>
          </Link>
        </div>
     
    );
  }

  return (

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-6">
        <div className="mb-6 mt-10 pt-4">
          <Link to="/products" className="inline-flex items-center text-gray-600 hover:text-primary transition-colors">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Products
          </Link>
        </div>
    
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="overflow-hidden rounded-lg border">
              <img 
                src={images[selectedImage]} 
                alt={product.name} 
                className="w-full h-96 object-cover"
              />
            </div>
            
            {images.length > 1 && (
              <div className="grid grid-cols-5 gap-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    className={`overflow-hidden rounded border ${
                      selectedImage === index ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} ${index + 1}`} 
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            
            <div className="flex items-center mt-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${
                      i < Math.floor(4.967) 
                        ? "text-yellow-500 fill-yellow-500" 
                        : "text-gray-300"
                    }`} 
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  {/* {product.rating.toFixed(1)} ({product.reviewCount} reviews) */}
                 4.9 (68 reviews)
                </span>
              </div>
              <Separator orientation="vertical" className="mx-4 h-6" />
              <div className="text-sm">
                {product. quantity> 0 ? (
                  <span className="text-green-600 flex items-center">
                    <Check className="h-4 w-4 mr-1" />
                    In Stock ({product.quantity} available)
                  </span>
                ) : (
                  <span className="text-red-600">Out of Stock</span>
                )}
              </div>
            </div>
            
            <div className="mt-6">
              {/* <div className="flex items-baseline">
                <span className="text-3xl font-bold">${product.price.toLocaleString()}</span>
                
                {product.originalPrice && (
                  <>
                    <span className="ml-2 text-lg text-gray-500 line-through">
                      ${product.originalPrice.toLocaleString()}
                    </span>
                    <span className="ml-2 text-sm bg-red-100 text-red-800 px-2 py-0.5 rounded-md">
                      {discount}% OFF
                    </span>
                  </>
                )}
              </div> */}
              <div className="flex items-baseline">
                <span className="text-3xl font-bold">${product.price.toLocaleString()}</span>
                
                {/* {product.originalPrice && (
                  <>
                    <span className="ml-2 text-lg text-gray-500 line-through">
                      ${product.originalPrice.toLocaleString()}
                    </span>
                    <span className="ml-2 text-sm bg-red-100 text-red-800 px-2 py-0.5 rounded-md">
                      {discount}% OFF
                    </span>
                  </>
                )} */}
              </div>
            </div>
            
            <div className="mt-6">
              <p className="text-gray-700">{product.description}</p>
            </div>
            
            <div className="mt-6 space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Brand</h3>
                <p className="mt-1">{product.brand}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-900">Category</h3>
                <p className="mt-1">{product.category}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-900">Model</h3>
                <p className="mt-1">{product.model}</p>
              </div>
            </div>
            
            <Separator className="my-8" />
            
            <div className="space-y-6">
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <div className="flex items-center mt-1">
                  <button 
                    onClick={handleQuantityDecrease} 
                    disabled={quantity <= 1}
                    className="p-2 border rounded-l-md disabled:opacity-50"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <input
                    type="text"
                    id="quantity"
                    value={quantity}
                    readOnly
                    className="p-2 w-12 text-center border-y"
                  />
                  <button 
                    onClick={handleQuantityIncrease} 
                    disabled={quantity >= product.quantity}
                    className="p-2 border rounded-r-md disabled:opacity-50"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  onClick={handleAddToCart} 
                  disabled={product.quantity <= 0}
                  className="flex-1"
                >
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                {/* <Link to="/checkout" className="flex-1">
                  <Button 
                    variant="secondary" 
                    size="lg" 
                    onClick={() => product.stock > 0 && addToCart(product, quantity)}
                    disabled={product.stock <= 0}
                    className="w-full"
                  >
                    Buy Now
                  </Button>
                </Link> */}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16">
          <Tabs defaultValue="features" className="w-full">
            <TabsList className="w-full bg-gray-100">
              <TabsTrigger value="features" className="flex-1">Features</TabsTrigger>
              <TabsTrigger value="specifications" className="flex-1">Specifications</TabsTrigger>
              <TabsTrigger value="shipping" className="flex-1">Shipping & Returns</TabsTrigger>
            </TabsList>
            
            <TabsContent value="features" className="p-6 border rounded-b-md">
              <h3 className="text-lg font-semibold mb-4">Product Features</h3>
              <ul className="list-disc pl-5 space-y-2">
                {features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </TabsContent>
            
            <TabsContent value="specifications" className="p-6 border rounded-b-md">
              <h3 className="text-lg font-semibold mb-4">Technical Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(specifications).map(([key, value]) => (
                  <div key={key} className="flex">
                    <span className="font-medium w-32">{key}:</span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="shipping" className="p-6 border rounded-b-md">
              <h3 className="text-lg font-semibold mb-4">Shipping Information</h3>
              <p className="mb-4">
                We offer free shipping on all motorcycle purchases within the continental United States.
                Delivery typically takes 5-7 business days from the date of purchase.
              </p>
              
              <h3 className="text-lg font-semibold mb-4 mt-6">Return Policy</h3>
              <p>
                If you're not completely satisfied with your purchase, you can return it within 30 days
                for a full refund. Please note that motorcycles must be in their original condition,
                unused, and with all original packaging and documentation.
              </p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
 
  );
};

export default ProductDetailPage;
