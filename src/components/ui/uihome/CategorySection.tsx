import React from 'react'
import { Link } from 'react-router-dom'

const CategorySection = () => {
  return (
    <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Find Your Perfect Ride</h2>
            <p className="mt-4 text-lg text-gray-600">
              Browse our wide selection of motorcycles by category.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative overflow-hidden rounded-lg shadow-md group hover-scale">
              <img 
                src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&h=500&fit=crop" 
                alt="Sport Bikes" 
                className="w-full h-64 object-cover transform transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-bold text-white">Sport Bikes</h3>
                <p className="text-gray-300 mt-2">Experience the thrill of speed and performance.</p>
                <Link to="/products?category=Sport" className="mt-3 inline-block text-primary hover:underline">
                  View Collection &rarr;
                </Link>
              </div>
            </div>
            
            <div className="relative overflow-hidden rounded-lg shadow-md group hover-scale">
              <img 
                src="https://static1.hotcarsimages.com/wordpress/wp-content/uploads/2024/04/450cl-c-header-1.jpeg" 
                alt="Cruiser Bikes" 
                className="w-full h-64 object-cover transform transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-bold text-white">Cruiser Bikes</h3>
                <p className="text-gray-300 mt-2">Ride in style and comfort for the long road ahead.</p>
                <Link to="/products?category=Cruiser" className="mt-3 inline-block text-primary hover:underline">
                  View Collection &rarr;
                </Link>
              </div>
            </div>
            
            <div className="relative overflow-hidden rounded-lg shadow-md group hover-scale">
              <img 
                src="https://cdn.shopify.com/s/files/1/0951/1406/files/husky-norden-901-expedition-middleweight-bike-lone-rider.png?v=1682433798" 
                alt="Adventure Bikes" 
                className="w-full h-64 object-cover transform transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-bold text-white">Adventure Bikes</h3>
                <p className="text-gray-300 mt-2">Go beyond the road with unmatched versatility.</p>
                <Link to="/products?category=Adventure" className="mt-3 inline-block text-primary hover:underline">
                  View Collection &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default CategorySection