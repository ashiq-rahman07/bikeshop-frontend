
import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FilterOptions } from "@/types";
// import {  getPriceRange } from "@/data/products";

// import { useGetAllGearsQuery } from "@/redux/features/gears/gearsApi";
export interface GearFilterOptions {
  search: string;
  priceRange: [number, number];
  brands: string[];
  categories: string[];
  isStock: boolean;
  
}
interface ProductFilterProps {
  onFilterChange: (filters: GearFilterOptions) => void;
  initialFilters: GearFilterOptions;
  priceRange:[number,number]
}



const GearFilter = ({ onFilterChange, initialFilters,priceRange:pRange }: ProductFilterProps) => {
   
  const [filters, setFilters] = useState<GearFilterOptions>(initialFilters);
  const [priceRange, setPriceRange] = useState<[number, number]>(pRange);
  const categories = ['Helmet','Gloves','Jacket','Boots','Protection','Accessories','Rain Gear','Electronics']
  const  brands = ["RideTalk","ThermoTech","AdventureGear","RideReady","RoadMaster","RaceTech","SafeRide"]
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, search: e.target.value }));
  };
  
  // Handle price range change
  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
    setFilters(prev => ({ ...prev, priceRange: [value[0], value[1]] }));
  };
  
  // Handle brand checkbox change
  const handleBrandChange = (brand: string, checked: boolean) => {
    setFilters(prev => {
      const updatedBrands = checked
        ? [...prev.brands, brand]
        : prev.brands.filter(b => b !== brand);
      
      return { ...prev, brands: updatedBrands };
    });
  };
  
  // Handle category checkbox change
  const handleCategoryChange = (category: string, checked: boolean) => {
    setFilters(prev => {
      const updatedCategories = checked
        ? [...prev.categories, category]
        : prev.categories.filter(c => c !== category);
      
      return { ...prev, categories: updatedCategories };
    });
  };
  
  // Handle in-stock filter change
  const handleInStockChange = (checked: boolean) => {
    setFilters(prev => ({ ...prev, isStock: checked }));
  };
  
  // Apply filters
  const applyFilters = () => {
    onFilterChange(filters);
  };
  
  // Reset filters
  const resetFilters = () => {
    const resetFilters: GearFilterOptions = {
      search: "",
      priceRange,
      brands: [],
      categories: [],
      isStock: false,
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };
  
  // Apply filters whenever they change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onFilterChange(filters);
    }, 500);
    
    return () => clearTimeout(timeoutId);
  }, [filters, onFilterChange]);

  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Search</h3>
        <Input 
          type="text" 
          placeholder="Search bikes..." 
          value={filters.search} 
          onChange={handleSearchChange}
        />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-3">Price Range</h3>
        <div className="px-2">
          <Slider
            defaultValue={[filters.priceRange[0], filters.priceRange[1]]}
            min={priceRange[0]}
            max={priceRange[1]}
            step={100}
            onValueChange={handlePriceChange}
          />
          <div className="flex justify-between mt-2 text-sm">
            <span>${filters.priceRange[0].toLocaleString()}</span>
            <span>${filters.priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-3">Brands</h3>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {brands.map(brand => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox 
                id={`brand-${brand}`} 
                checked={filters.brands.includes(brand)}
                onCheckedChange={(checked) => handleBrandChange(brand, checked === true)}
              />
              <Label htmlFor={`brand-${brand}`} className="cursor-pointer">{brand}</Label>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-3">Categories</h3>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {categories.map(category => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox 
                id={`category-${category}`} 
                checked={filters.categories.includes(category)}
                onCheckedChange={(checked) => handleCategoryChange(category, checked === true)}
              />
              <Label htmlFor={`category-${category}`} className="cursor-pointer">{category}</Label>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="in-stock" 
            checked={filters.isStock}
            onCheckedChange={(checked) => handleInStockChange(checked === true)}
          />
          <Label htmlFor="in-stock" className="cursor-pointer">In Stock Only</Label>
        </div>
      </div>
      
      <div className="flex space-x-2">
        <Button variant="outline" className="flex-1" onClick={resetFilters}>
          Reset
        </Button>
        <Button className="flex-1" onClick={applyFilters}>
          Apply
        </Button>
      </div>
    </div>
  );
};

export default GearFilter;
