import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Filter, Shield, Tag, Bike, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getAllGear, getAvailableGearCategories, IGear } from "@/data/gear";


const RidingGear = () => {
  const gearProducts = getAllGear();
  const categories = getAvailableGearCategories();
  
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
      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800 -z-10"></div>
        
        {/* Hero Background Image Grid */}
        <div className="absolute inset-0 grid grid-cols-3 opacity-30 -z-10">
          <div className="bg-[url('https://images.unsplash.com/photo-1552568283-2667b8e8d9a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80')] bg-cover bg-center"></div>
          <div className="bg-[url('https://images.unsplash.com/photo-1591534446793-0c4a1cb186a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80')] bg-cover bg-center"></div>
          <div className="bg-[url('https://images.unsplash.com/photo-1603312568312-cfce4f6f8549?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80')] bg-cover bg-center"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Premium Riding Gear</h1>
              <p className="text-xl text-gray-300 mb-8 max-w-xl">
                Equip yourself with top-tier safety gear for maximum protection, all-day comfort, and unmatched style on your two-wheeled adventures.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Shop All Gear
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  View Safety Ratings
                </Button>
              </div>
              
              <div className="mt-12 flex items-center gap-8">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-white">CE Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-white">DOT Approved</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <Bike className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-white">Rider Tested</span>
                </div>
              </div>
            </div>
            
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute -top-8 -left-8 w-64 h-64 bg-gradient-to-br from-primary/40 to-secondary/40 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-12 -right-12 w-80 h-80 bg-gradient-to-tr from-primary/30 to-secondary/30 rounded-full blur-3xl"></div>
                
                <div className="relative bg-white/10 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border border-white/20 hover-scale">
                  <img 
                    src="https://images.unsplash.com/photo-1599833975787-5c143f373c30?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                    alt="Premium Motorcycle Helmet" 
                    className="w-full h-auto rounded-lg"
                  />
                  
                  <div className="mt-6 flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-bold text-white">Pro Carbon Helmet</h3>
                      <p className="text-gray-300">Premium Protection</p>
                    </div>
                    <div className="bg-primary/90 text-white px-4 py-2 rounded-full">
                      $599.99
                    </div>
                  </div>
                  
                  <Link to="/riding-gear/g1" className="mt-4 flex items-center text-primary hover:text-primary/80">
                    View Details <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            {["Helmets", "Jackets", "Gloves", "Boots"].map((category, index) => (
              <div 
                key={category}
                className="group bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                  {index === 0 && <Shield className="h-6 w-6 text-primary" />}
                  {index === 1 && <Shield className="h-6 w-6 text-primary" />}
                  {index === 2 && <Bike className="h-6 w-6 text-primary" />}
                  {index === 3 && <Tag className="h-6 w-6 text-primary" />}
                </div>
                <h3 className="text-lg font-medium text-white mb-1">{category}</h3>
                <p className="text-sm text-gray-400">Premium Quality</p>
              </div>
            ))}
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
                
                {filteredProducts.map((product: IGear) => (
                  <Link to={`/riding-gear/${product.id}`} key={product.id} className="group">
                    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                      <div className="relative h-60 overflow-hidden">
                        <img 
                          src={product.images[0]}
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
            {["Helmet", "Jacket", "Gloves", "Boots"].map((category) => (
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
                src="https://images.unsplash.com/photo-1559057287-ce0f57d4c1b9?w=800&h=600&fit=crop"
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
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
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