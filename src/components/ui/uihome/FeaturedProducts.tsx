
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

import { getFeaturedProducts } from "@/data/products";
import { Product } from "@/types";
import ProductCard from "../product/ProductCard";

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      const featured = getFeaturedProducts();
      setProducts(featured);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Featured Bikes</h2>
          <p className="mt-4 text-lg text-gray-600">
            Explore our selection of premium motorcycles.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-gray-100 animate-pulse rounded-lg h-72"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold">Featured Bikes</h2>
        <p className="mt-4 text-lg text-gray-600">
          Explore our selection of premium motorcycles.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      <div className="text-center mt-10">
        <Link to="/products">
          <Button size="lg">
            View All Motorcycles
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedProducts;
