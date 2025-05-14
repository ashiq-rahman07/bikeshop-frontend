import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Filter, Shield, Tag, Bike, ChevronRight, X, SlidersHorizontal } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
// import { getAllGear, getAvailableGearCategories, IGear } from "@/data/gear";
import GearHero from "../ridingGear/GearHero";
import { TBike, TGear } from "@/types/product.type";
import { FilterOptions } from "@/types";
import { getPriceRange } from "@/data/products";
import { useGetAllGearsQuery } from "@/redux/features/gears/gearsApi";
import { Input } from "../ui/input";
import ProductFilter from "../productsss/ProductFilter";
import ProductCard from "../productsss/ProductCard";
import GearFilter from "../productsss/GearFilter";


const AllGearPage = () => {
      const { data: gearsData, isLoading } = useGetAllGearsQuery(undefined);
  const gears = gearsData?.data || [];
// console.log(gears);
  // const [searchParams, setSearchParams] = useSearchParams();
  // const [filteredProducts, setFilteredProducts] = useState<TGear[]>([]);
  // const [showFilters, setShowFilters] = useState(false);
  // const [sortBy, setSortBy] = useState<string>("featured");

  // const initPriceRange = getPriceRange(); // Update if gear pricing is different

  // const initialFilters: FilterOptions = {
  //   search: searchParams.get("search") || "",
  //   priceRange: initPriceRange,
  //   brands: searchParams.get("brand") ? [searchParams.get("brand") as string] : [],
  //   categories: searchParams.get("category") ? [searchParams.get("category") as string] : [],
  //   inStock: searchParams.get("isStock") === "true",
  // };

  // const [filters, setFilters] = useState<FilterOptions>(initialFilters);

  // useEffect(() => {
  //   if (gears.length) {
  //     filterProducts(gears, filters);
  //   }
  // }, [gears, filters, sortBy]);

//   const filterProducts = (productsToFilter: TGear[], currentFilters: FilterOptions) => {
//     let result = [...productsToFilter];
// console.log('RESULT',result)
//     // Search filter
//     if (currentFilters.search) {
//       const searchText = currentFilters.search.toLowerCase();
//       result = result.filter(product =>
//         product.name.toLowerCase().includes(searchText) ||
//         product.description.toLowerCase().includes(searchText)
//       );
//     }

//     // Price range filter
//     result = result.filter(
//       product =>
//         product.price >= currentFilters.priceRange[0] &&
//         product.price <= currentFilters.priceRange[1]
//     );

//     // Brand filter
//     if (currentFilters.brands.length > 0) {
//       result = result.filter(product =>
//         currentFilters.brands.includes(product.brand)
//       );
//     }

//     // Category filter
//     if (currentFilters.categories.length > 0) {
//       result = result.filter(product =>
//         currentFilters.categories.includes(product.category)
//       );
//     }

//     // In-stock filter
//     if (currentFilters.inStock) {
//       result = result.filter(product => product.stock);
//     }

//     // Sorting
//     // result = sortProducts(result, sortBy);

//     setFilteredProducts(result);

//     // Update URL search params
//     const newSearchParams = new URLSearchParams();
//     if (currentFilters.search) newSearchParams.set("search", currentFilters.search);
//     if (currentFilters.brands.length === 1) newSearchParams.set("brand", currentFilters.brands[0]);
//     if (currentFilters.categories.length === 1) newSearchParams.set("category", currentFilters.categories[0]);
//     if (currentFilters.inStock) newSearchParams.set("inStock", "true");
//     if (sortBy !== "featured") newSearchParams.set("sort", sortBy);

//     setSearchParams(newSearchParams);
//   };

  // const handleFilterChange = (newFilters: FilterOptions) => {
  //   setFilters(newFilters);
  // };

  // const handleSearchSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const searchInput = document.getElementById("search-input") as HTMLInputElement;
  //   const searchValue = searchInput.value;
  //   setFilters({ ...filters, search: searchValue });
  // };

  // const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setSortBy(e.target.value);
  // };

  // const sortProducts = (productsToSort: TGear[], sortOption: string): TGear[] => {
  //   const sortedProducts = [...productsToSort];
  //   switch (sortOption) {
  //     case "price-asc":
  //       return sortedProducts.sort((a, b) => a.price - b.price);
  //     case "price-desc":
  //       return sortedProducts.sort((a, b) => b.price - a.price);
  //     case "name-asc":
  //       return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
  //     case "name-desc":
  //       return sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
  //     default:
  //       return sortedProducts;
  //   }
  // };

  // const toggleFilters = () => setShowFilters(prev => !prev);

  return (
    <div>
      {/* Enhanced Hero Section */}
      <GearHero/>

      {/* Main Content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold">Motorcycles</h1>
            <p className="text-gray-600 mt-1">
              {/* {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"} available */}
            </p>
          </div>
          
          <div className="w-full md:w-auto mt-4 md:mt-0 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <form className="flex"
            // onSubmit={handleSearchSubmit}
             >
              <Input
                id="search-input"
                placeholder="Search motorcycles..."
                // defaultValue={filters.search}
                className="rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Button type="submit" className="rounded-l-none">
                Search
              </Button>
            </form>
            
            <div className="flex items-center space-x-4">
              <select
                // value={sortBy}
                // onChange={handleSortChange}
                className="border rounded-md p-2"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
                <option value="rating">Top Rated</option>
              </select>
              
              <Button
                // variant={showFilters ? "default" : "outline"}
                // onClick={toggleFilters}
                className="md:hidden"
              >
                {/* {showFilters ? <X className="mr-2 h-4 w-4" /> : <Filter className="mr-2 h-4 w-4" />} */}
                Filters
              </Button>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters - Desktop */}
          <div className="hidden md:block w-64 flex-shrink-0">
            {/* <GearFilter 
              onFilterChange={handleFilterChange}
              initialFilters={initialFilters}
            /> */}
          </div>
          
          {/* Filters - Mobile */}
          {/* {showFilters && (
            <div className="md:hidden w-full mb-6">
              <GearFilter 
                onFilterChange={handleFilterChange}
                initialFilters={initialFilters}
              />
            </div>
          )} */}
          
          {/* Products Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="bg-gray-100 animate-pulse rounded-lg h-72"></div>
                ))}
              </div>
            ) : gears.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {gears.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <SlidersHorizontal className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium">No products found</h3>
                <p className="text-gray-500 mt-1">Try adjusting your search or filter criteria</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  // onClick={() => {
                  //   const defaultFilters = {
                  //     search: "",
                  //     priceRange: initPriceRange,
                  //     brands: [],
                  //     categories: [],
                  //     inStock: false,
                  //   };
                  //   setFilters(defaultFilters);
                  //   filterProducts(gears, defaultFilters);
                  //   setSortBy("featured");
                  //   setSearchParams({});
                  // }}
                >
                  Clear all filters
                </Button>
              </div>
            )}
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
                src="https://i5.walmartimages.com/asr/ec81fbee-0e6f-43a6-96ea-693c211980bc.e460e64add30badca4575987cfdb9701.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF"
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
            <Button size="lg" className="bg-white  text-primary hover:bg-gray-100">
              Get Expert Advice
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllGearPage;