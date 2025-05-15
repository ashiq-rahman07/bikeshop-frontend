
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";



import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, SlidersHorizontal, X } from "lucide-react";
import { Product, FilterOptions } from "@/types";
import { 
  getAllProducts, 
  getPriceRange,
  searchProducts
} from "@/data/products";
import ProductFilter from "../productsss/ProductFilter";
import ProductCard from "../productsss/ProductCard";
import { useGetAllProductsQuery } from "@/redux/features/products/productsApi";
import { TBike } from "@/types/product.type";

const AllBikesPage = () => {
  const { data:bikesData, isLoading } = useGetAllProductsQuery(undefined);
  
  
  const bikes = bikesData?.data || [];

const [searchParams, setSearchParams] = useSearchParams();
const [filteredProducts, setFilteredProducts] = useState<TBike[]>([]);
const [showFilters, setShowFilters] = useState(false);
const [sortBy, setSortBy] = useState<string>("featured");

// Initialize filter options
const initPriceRange = getPriceRange(); // [min, max] based on your app logic

const initialFilters: FilterOptions = {
  search: searchParams.get("search") || "",
  priceRange: initPriceRange,
  brands: searchParams.get("brand") ? [searchParams.get("brand") as string] : [],
  categories: searchParams.get("category") ? [searchParams.get("category") as string] : [],
  isStock: searchParams.get("isStock") === "true",
};

const [filters, setFilters] = useState<FilterOptions>(initialFilters);

// 🔁 Filter whenever bikes or filters change
useEffect(() => {
  if (bikes.length) {
    filterProducts(bikes, filters);
  }
}, [bikes, filters, sortBy]);


const filterProducts = (productsToFilter: TBike[], currentFilters: FilterOptions) => {
  let result = [...productsToFilter];

  // Search filter
  if (currentFilters.search) {
    const searchText = currentFilters.search.toLowerCase();
    result = result.filter(product =>
      product.name.toLowerCase().includes(searchText) ||
      product.description.toLowerCase().includes(searchText)
    );
  }

  // Price range filter
  result = result.filter(
    product =>
      product.price >= currentFilters.priceRange[0] &&
      product.price <= currentFilters.priceRange[1]
  );

  // Brand filter
  if (currentFilters.brands.length > 0) {
    result = result.filter(product =>
      currentFilters.brands.includes(product.brand)
    );
  }

  // Category filter
  if (currentFilters.categories.length > 0) {
    result = result.filter(product =>
      currentFilters.categories.includes(product.category)
    );
  }

  // In-stock filter
  if (currentFilters.isStock) {
    result = result.filter(product => product.stock);
  }

  // Sorting
  result = sortProducts(result, sortBy);

  setFilteredProducts(result);

  // Update URL search params
  const newSearchParams = new URLSearchParams();
  if (currentFilters.search) newSearchParams.set("search", currentFilters.search);
  if (currentFilters.brands.length === 1) newSearchParams.set("brand", currentFilters.brands[0]);
  if (currentFilters.categories.length === 1) newSearchParams.set("category", currentFilters.categories[0]);
  if (currentFilters.isStock) newSearchParams.set("isStock", "true");
  if (sortBy !== "featured") newSearchParams.set("sort", sortBy);

  setSearchParams(newSearchParams);
};

const handleFilterChange = (newFilters: FilterOptions) => {
  setFilters(newFilters);
};

const handleSearchSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  const searchInput = document.getElementById("search-input") as HTMLInputElement;
  const searchValue = searchInput.value;

  const newFilters = { ...filters, search: searchValue };
  setFilters(newFilters);
};

const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  setSortBy(e.target.value);
};

const sortProducts = (productsToSort: TBike[], sortOption: string):  TBike[] => {
  const sortedProducts = [...productsToSort];

  switch (sortOption) {
    case "price-asc":
      return sortedProducts.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sortedProducts.sort((a, b) => b.price - a.price);
    case "name-asc":
      return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
    // case "rating":
    //   return sortedProducts.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    default:
      return sortedProducts;
  }
};

const toggleFilters = () => setShowFilters(prev => !prev);

return (

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold">Motorcycles</h1>
            <p className="text-gray-600 mt-1">
              {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"} available
            </p>
          </div>
          
          <div className="w-full md:w-auto mt-4 md:mt-0 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <form onSubmit={handleSearchSubmit} className="flex">
              <Input
                id="search-input"
                placeholder="Search motorcycles..."
                defaultValue={filters.search}
                className="rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Button type="submit" className="rounded-l-none">
                Search
              </Button>
            </form>
            
            <div className="flex items-center space-x-4">
              <select
                value={sortBy}
                onChange={handleSortChange}
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
                variant={showFilters ? "default" : "outline"}
                onClick={toggleFilters}
                className="md:hidden"
              >
                {showFilters ? <X className="mr-2 h-4 w-4" /> : <Filter className="mr-2 h-4 w-4" />}
                Filters
              </Button>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters - Desktop */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <ProductFilter 
              onFilterChange={handleFilterChange}
              initialFilters={initialFilters}
            />
          </div>
          
          {/* Filters - Mobile */}
          {showFilters && (
            <div className="md:hidden w-full mb-6">
              <ProductFilter 
                onFilterChange={handleFilterChange}
                initialFilters={initialFilters}
              />
            </div>
          )}
          
          {/* Products Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="bg-gray-100 animate-pulse rounded-lg h-72"></div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} routes="bikes" type='bike' />
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
                  onClick={() => {
                    const defaultFilters = {
                      search: "",
                      priceRange: initPriceRange,
                      brands: [],
                      categories: [],
                      isStock: false,
                    };
                    setFilters(defaultFilters);
                    filterProducts(bikes, defaultFilters);
                    setSortBy("featured");
                    setSearchParams({});
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
   
  );
};

export default AllBikesPage;