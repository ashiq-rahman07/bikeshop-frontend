/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { products } from "./products";
import ProductCard from "./ProductCard";


const ProductsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    priceRange: [0, 20000],
    brand: '',
    category: '',
    model: '',
    availability: 'all',
  });

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle filter changes
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  // Filter and search products
  const filteredProducts = products.filter((product) => {
    // Search by brand, name, or category
    const matchesSearch =
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());

    // Filter by price range
    const matchesPrice =
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];

    // Filter by brand
    const matchesBrand = filters.brand ? product.brand === filters.brand : true;

    // Filter by category
    const matchesCategory = filters.category ? product.category === filters.category : true;

    // Filter by model
    const matchesModel = filters.model ? product.model === filters.model : true;

    // Filter by availability
    const matchesAvailability =
      filters.availability === 'all'
        ? true
        : filters.availability === 'available'
        ? product.availability
        : !product.availability;
        return (
          matchesSearch &&
          matchesPrice &&
          matchesBrand &&
          matchesCategory &&
          matchesModel &&
          matchesAvailability
        );
      });
  return (
    <div className="container mx-auto p-4">
    <h1 className="text-3xl font-poppins font-bold text-center my-8">All Products</h1>

    {/* Search Bar */}
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search by brand, name, or category"
        value={searchQuery}
        onChange={handleSearchChange}
        className="w-full p-2 border border-gray-300 rounded-lg"
      />
    </div>

    {/* Filters */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Price Range */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Price Range</label>
        <div className="flex space-x-2">
          <input
            type="number"
            name="priceRangeMin"
            placeholder="Min"
            value={filters.priceRange[0]}
            onChange={(e) =>
              setFilters({ ...filters, priceRange: [Number(e.target.value), filters.priceRange[1]] })
            }
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          <input
            type="number"
            name="priceRangeMax"
            placeholder="Max"
            value={filters.priceRange[1]}
            onChange={(e) =>
              setFilters({ ...filters, priceRange: [filters.priceRange[0], Number(e.target.value)] })
            }
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
      </div>

      {/* Brand Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Brand</label>
        <select
          name="brand"
          value={filters.brand}
          onChange={handleFilterChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="">All Brands</option>
          <option value="Yamaha">Yamaha</option>
          <option value="Harley-Davidson">Harley-Davidson</option>
          <option value="KTM">KTM</option>
        </select>
      </div>

      {/* Category Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="">All Categories</option>
          <option value="Sport">Sport</option>
          <option value="Cruiser">Cruiser</option>
          <option value="Adventure">Adventure</option>
        </select>
      </div>

      {/* Availability Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Availability</label>
        <select
          name="availability"
          value={filters.availability}
          onChange={handleFilterChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="all">All</option>
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
        </select>
      </div>
    </div>

    {/* Product Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  </div>
  )
}

export default ProductsPage