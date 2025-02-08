

import { Link } from "react-router-dom";
import { products } from "../../products/products";
import ProductCard from "../../products/ProductCard";

const FeatureProducts = () => {
  return (
   
    <div className="container  pt-10">
      {/* Header section */}
      <div className="mb-6 text-center">
        <p data-aos="fade-up" className="text-sm text-primary">
          Top Rated Products for you
        </p>
        <h1 data-aos="fade-up" className="text-3xl font-bold">
          Best Products
        </h1>
        <p data-aos="fade-up" className="text-xs text-gray-400">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit
          asperiores modi Sit asperiores modi
        </p>
      </div>
      {/* Body section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  md:gap-10 place-items-center">
        {products.map((product) => (
         
         
         <ProductCard key={product.id} {...product} />
         
        ))}
      </div>
      <div className="text-center pb-10">
        <Link to='/products' type="button" className="rounded-md  bg-gradient-to-r from-primary to-secondary  font-normal text-md text-gray-100 px-4 py-2 hover:bg-purple-400">Explore Our Products</Link>
      </div>
    </div>
 
  )
}

export default FeatureProducts