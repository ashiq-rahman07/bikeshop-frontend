/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
// import { products } from "./products";
import ProductCard from './ProductCard';
import { useGetAllProductsQuery } from '../../redux/features/products/productsApi';
import Loading from '../ui/Loading';

const ProductsPage = () => {
  
  const { data, isLoading } = useGetAllProductsQuery(undefined);

  const products = data?.data;
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    priceRange: [0, 10000],
    brand: '',
    category: '',
    model: '',
    availability: 'all',
  });

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle filter changes
  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  // Filter and search products
  const filteredProducts = products?.filter((product) => {
    // Search by brand, name, or category
    const matchesSearch =
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());

    // Filter by price range
    const matchesPrice =
      product.price >= filters.priceRange[0] &&
      product.price <= filters.priceRange[1];

    // Filter by brand
    const matchesBrand = filters.brand ? product.brand === filters.brand : true;

    // Filter by category
    const matchesCategory = filters.category
      ? product.category === filters.category
      : true;

    // Filter by model
    const matchesModel = filters.model ? product.model === filters.model : true;

    // Filter by availability

    return (
      matchesSearch &&
      matchesPrice &&
      matchesBrand &&
      matchesCategory &&
      matchesModel
    );
  });

  return isLoading ? (
    <Loading />
  ) : (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-poppins font-bold text-center my-8">
        All Products
      </h1>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by brand, name, or category"
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-2 border dark:bg-gray-800 border-gray-300 rounded-lg"
        />
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium ">Price Range</label>
          <div className="flex space-x-2">
            <input
              type="number"
              name="priceRangeMin"
              placeholder="Min"
              value={filters.priceRange[0]}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  priceRange: [Number(e.target.value), filters.priceRange[1]],
                })
              }
              className="w-full p-2 border border-gray-300 dark:bg-gray-800 rounded-lg"
            />
            <input
              type="number"
              name="priceRangeMax"
              placeholder="Max"
              value={filters.priceRange[1]}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  priceRange: [filters.priceRange[0], Number(e.target.value)],
                })
              }
              className="w-full p-2 border border-gray-300 dark:bg-gray-800 rounded-lg"
            />
          </div>
        </div>

        {/* Brand Filter */}
        <div>
          <label className="block text-sm font-medium ">Brand</label>
          <select
            name="brand"
            value={filters.brand}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 dark:bg-gray-800 rounded-lg"
          >
            <option value="">All Brands</option>
            <option value="Yamaha">Yamaha</option>
            <option value="Honda">Honda</option>
            <option value="Suzuki">Suzuki</option>
            <option value="Hero">Hero</option>
            <option value="Tvs">Tvs</option>
            <option value="Bajaj">Bajaj</option>
          </select>
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium">Category</label>
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 dark:bg-gray-800 rounded-lg"
          >
            <option value="">All Categories</option>
            <option value="Mountain">Mountain</option>
            <option value="Road">Road</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Electric">Electric</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
