import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Filter, Shield, Tag, Bike } from "lucide-react";
import { Link } from "react-router-dom";

interface GearProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  description: string;
  rating: number;
  image: string;
  isFeatured: boolean;
}

const gearProducts: GearProduct[] = [
  {
    id: "g1",
    name: "Pro Carbon Helmet",
    category: "Helmets",
    price: 599.99,
    originalPrice: 699.99,
    description: "Premium carbon fiber helmet with advanced ventilation system and integrated Bluetooth communication.",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1552568283-2667b8e8d9a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    isFeatured: true
  },
  {
    id: "g2",
    name: "Adventure Riding Jacket",
    category: "Jackets",
    price: 449.99,
    description: "All-weather adventure jacket with removable thermal liner and impact protection.",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1591534446793-0c4a1cb186a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    isFeatured: true
  },
  {
    id: "g3",
    name: "Pro Grip Racing Gloves",
    category: "Gloves",
    price: 129.99,
    originalPrice: 159.99,
    description: "Premium racing gloves with superior grip and knuckle protection for maximum control.",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1603312568312-cfce4f6f8549?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    isFeatured: true
  },
  {
    id: "g4",
    name: "Touring Boots",
    category: "Footwear",
    price: 279.99,
    description: "Waterproof touring boots designed for long-distance comfort and protection.",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    isFeatured: false
  },
  {
    id: "g5",
    name: "Armored Riding Pants",
    category: "Pants",
    price: 219.99,
    originalPrice: 249.99,
    description: "Reinforced riding pants with CE-approved armor and abrasion-resistant material.",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1578948856697-db91d246b7b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    isFeatured: false
  },
  {
    id: "g6",
    name: "Hydration Backpack",
    category: "Accessories",
    price: 89.99,
    description: "Motorcycle-specific hydration backpack with 2L water capacity and reflective details.",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1576770133818-5f9864c4489d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    isFeatured: true
  },
  {
    id: "g7",
    name: "All-Season Base Layer",
    category: "Base Layers",
    price: 69.99,
    description: "Moisture-wicking base layer designed for all-season comfort under your riding gear.",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1618354691792-d1d42acfd860?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    isFeatured: false
  },
  {
    id: "g8",
    name: "Wireless Helmet Communicator",
    category: "Electronics",
    price: 349.99,
    originalPrice: 399.99,
    description: "Premium Bluetooth communicator with 1.6km range and HD audio quality.",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1605663864774-784f476c7c30?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    isFeatured: true
  }
];

const categories = Array.from(new Set(gearProducts.map(product => product.category)));

const RidingGear = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = gearProducts.filter(product => {
    const categoryMatch = selectedCategory ? product.category === selectedCategory : true;
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    return categoryMatch && priceMatch;
  });

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-gray-800 py-24">
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1552568283-2667b8e8d9a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
            alt="Background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Premium Riding Gear</h1>
            <p className="max-w-2xl mx-auto text-lg text-gray-300 mb-8">
              Equip yourself with the best gear for safety, comfort, and style on your two-wheeled adventures.
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="default" size="lg" className="bg-primary hover:bg-primary/90">
                Shop All Gear
              </Button>
              <Button variant="outline" size="lg" className="border-white bg-transparent text-white hover:bg-white/10">
                View Safety Ratings
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Mobile Filter Toggle */}
            <div className="md:hidden w-full mb-4">
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center gap-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4" />
                {showFilters ? "Hide Filters" : "Show Filters"}
              </Button>
            </div>

            {/* Sidebar Filters */}
            <div className={`md:w-1/4 ${showFilters ? 'block' : 'hidden md:block'}`}>
              <div className="sticky top-24 bg-white rounded-lg shadow-md p-6">
                <h2 className="font-bold text-xl mb-4">Filters</h2>
                
                <div className="mb-6">
                  <h3 className="font-medium text-gray-700 mb-2">Categories</h3>
                  <ul className="space-y-2">
                    <li>
                      <button 
                        onClick={() => setSelectedCategory(null)} 
                        className={`text-left w-full ${selectedCategory === null ? 'font-medium text-primary' : 'text-gray-600'}`}
                      >
                        All Categories
                      </button>
                    </li>
                    {categories.map(category => (
                      <li key={category}>
                        <button 
                          onClick={() => setSelectedCategory(category)}
                          className={`text-left w-full ${selectedCategory === category ? 'font-medium text-primary' : 'text-gray-600'}`}
                        >
                          {category}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-medium text-gray-700 mb-2">Price Range</h3>
                  <div className="flex items-center gap-2">
                    <span>${priceRange[0]}</span>
                    <input 
                      type="range" 
                      min="0" 
                      max="1000" 
                      value={priceRange[0]} 
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="w-full"
                    />
                    <span>${priceRange[1]}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>${priceRange[0]}</span>
                    <input 
                      type="range" 
                      min="0" 
                      max="1000" 
                      value={priceRange[1]} 
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-sm">
                    <Bike className="h-3 w-3" />
                    <span>Safety Rated</span>
                  </div>
                  <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-sm">
                    <Shield className="h-3 w-3" />
                    <span>CE Approved</span>
                  </div>
                  <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-sm">
                    <Tag className="h-3 w-3" />
                    <span>Sale Items</span>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full" onClick={() => {
                  setSelectedCategory(null);
                  setPriceRange([0, 1000]);
                }}>
                  Reset Filters
                </Button>
              </div>
            </div>

            {/* Products Grid */}
            <div className="md:w-3/4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  {selectedCategory ? selectedCategory : "All Products"}
                  <span className="text-gray-500 text-lg font-normal ml-2">
                    ({filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'})
                  </span>
                </h2>
                <select className="border rounded-md px-2 py-1 bg-white">
                  <option>Sort by: Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Rating: High to Low</option>
                </select>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <Link to={`/products/gear/${product.id}`} key={product.id} className="group">
                    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                      <div className="relative h-60 overflow-hidden">
                        <img 
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {product.originalPrice && (
                          <div className="absolute top-2 right-2 bg-primary text-white text-sm font-medium px-2 py-1 rounded-md">
                            Sale
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                              {product.name}
                            </h3>
                            <p className="text-sm text-gray-600">{product.category}</p>
                          </div>
                          <div className="text-right">
                            {product.originalPrice ? (
                              <>
                                <p className="font-bold text-primary">${product.price.toFixed(2)}</p>
                                <p className="text-sm text-gray-500 line-through">${product.originalPrice.toFixed(2)}</p>
                              </>
                            ) : (
                              <p className="font-bold">${product.price.toFixed(2)}</p>
                            )}
                          </div>
                        </div>
                        
                        <div className="mt-3 flex items-center">
                          <div className="flex text-yellow-500">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <span key={i}>★</span>
                            ))}
                          </div>
                          <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                        </div>
                        
                        <p className="mt-2 text-sm text-gray-600 line-clamp-2">{product.description}</p>
                        
                        <Button className="w-full mt-4">View Details</Button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured gear categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Shop By Category</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {["Helmets", "Jackets", "Gloves", "Footwear"].map((category) => (
              <div 
                key={category} 
                className="relative overflow-hidden rounded-xl aspect-square shadow-lg group cursor-pointer"
              >
                <img 
                  src={`https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000)}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80`} 
                  alt={category}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-white">{category}</h3>
                  <Button variant="ghost" className="mt-2 text-white p-0 hover:bg-transparent hover:text-primary">
                    View Collection
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety information section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Ride Safe, Ride Protected</h2>
              <p className="text-lg text-gray-700 mb-6">
                At VelocityVibe, we believe that safety should never be compromised. Our premium riding gear is designed with your protection in mind, meeting and exceeding industry safety standards.
              </p>
              <ul className="space-y-4">
                {[
                  "All helmets are DOT, ECE or SNELL certified",
                  "Jackets and pants feature CE-approved armor",
                  "Gloves designed for maximum protection and control",
                  "Boots with reinforced ankle support and anti-slip soles"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center mt-1">
                      ✓
                    </div>
                    <span className="ml-3">{item}</span>
                  </li>
                ))}
              </ul>
              <Button className="mt-8">Learn More About Gear Safety</Button>
            </div>
            <div className="rounded-xl overflow-hidden shadow-xl">
              <img 
                src="https://www.thebikeinsurer.co.uk/static/5452a01a5e1d3a77f2f98b81e7554cd5/motorcycle_safety_4fc429c762.jpg"
                alt="Motorcycle Safety"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to action */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Gear Up for Your Next Ride?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Browse our complete collection of premium riding gear and ride with confidence knowing you're protected by the best.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" className="border-white bg-transparent text-white hover:bg-white hover:text-primary">
              Shop All Gear
            </Button>
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
              Get Expert Advice
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RidingGear;