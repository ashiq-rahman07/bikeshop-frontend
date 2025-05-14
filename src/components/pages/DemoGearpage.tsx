import { useEffect, useMemo, useState } from "react";

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

export interface GearFilterOptions {
  search: string;
  priceRange: [number, number];
  brands: string[];
  categories: string[];
  isStock: boolean;
  sortBy?:string
}

const DemoGearPage = () => {
    const [filteredProducts, setFilteredProducts] = useState<TGear[]>([]);
    const [filters, setFilters] = useState<GearFilterOptions>({
    search: '',
    priceRange: [0, 5000], // adjust to your gear price range
    brands: [],
    categories: [],
    isStock: false,
    sortBy: 'featured',
  });
    const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Already updating in GearFilter via useEffect, or can be done manually
  };

      const { data: gearsData, isLoading } = useGetAllGearsQuery(undefined);
  const allGears = gearsData?.data || [];

 useEffect(() => {
 const filteringData = allGears
    .filter((gear) => {
      const matchesSearch = gear.name.toLowerCase().includes(filters.search.toLowerCase());
      const matchesPrice =
        gear.price >= filters.priceRange[0] && gear.price <= filters.priceRange[1];
      const matchesBrand =
        filters.brands.length === 0 || filters.brands.includes(gear.brand);
      const matchesCategory =
        filters.categories.length === 0 || filters.categories.includes(gear.category);
      const matchesStock = !filters.isStock || gear.isStock;

      return matchesSearch && matchesPrice && matchesBrand && matchesCategory && matchesStock;
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
    setFilteredProducts(filteringData)
}, [allGears, filters]);

const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
  setFilters((prev) => ({ ...prev, ...newFilters }));
};
  return (
  <div>
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold">Motorcycle Gears</h1>
            </div>

            <div className="w-full md:w-auto mt-4 md:mt-0 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <form className="flex" onSubmit={handleSearchSubmit}>
                <Input
                  placeholder="Search gear..."
                  className="rounded-r-none"
                  value={filters.search}
                  onChange={(e) => handleFilterChange({ search: e.target.value })}
                />
                <Button type="submit" className="rounded-l-none">Search</Button>
              </form>

              <div className="flex items-center space-x-4">
                <select
                  value={filters.sortBy}
                //   onChange={(e) => handleFilterChange({ sortBy: e.target.value })}
                  className="border rounded-md p-2"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                  <option value="rating">Top Rated</option>
                </select>
                <Button className="md:hidden">Filters</Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="hidden md:block w-64 flex-shrink-0">
              <GearFilter onFilterChange={handleFilterChange} initialFilters={filters} />
            </div>

            <div className="flex-1">
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="bg-gray-100 animate-pulse rounded-lg h-72"></div>
                  ))}
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((gear) => (
                    <ProductCard key={gear._id} product={gear} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <SlidersHorizontal className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium">No products found</h3>
                  <p className="text-gray-500 mt-1">Try adjusting your search or filter criteria</p>
                  <Button variant="outline" className="mt-4" onClick={() => setFilters({
                    search: '',
                    priceRange: [0, 5000],
                    brands: [],
                    categories: [],
                    isStock: false,
                    sortBy: 'featured'
                  })}>
                    Clear all filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DemoGearPage;