import { Link } from 'react-router-dom';
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from '../../../../redux/features/products/productsApi';
import { useState } from 'react';

import Loading from '../../../ui/Loading';

const ProductManagement = () => {
  const [deleteProduct] = useDeleteProductMutation();

  const [currentPage, setCurrentPage] = useState(1);

  // Query parameters
  const params = [
    {
      name: 'page',
      value: currentPage,
    },
  ];

  const {
    data: products,
    isLoading,
    isError,
    refetch,
  } = useGetAllProductsQuery(params);

  const allProducts = products?.data || [];
  const totalProducts = products?.meta?.total || 0;
  const totalPages = products?.meta?.totalPage || 0;

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    refetch();
  };

  const handleDelete = async (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(productId).unwrap();
        alert('Product deleted successfully!');
        refetch();
      } catch (error) {
        console.log(error);
        alert('Failed to delete product.');
      }
    }
  };

  if (isLoading) return <Loading />;
  if (isError) return <div>Error loading products.</div>;
  return (
    <div className="p-6 dark:bg-gray-800 dark:text-gray-100 text-gray-900">
      <h1 className="text-2xl font-bold mb-6">Product Management</h1>

      <div className="flex justify-between items Center">
        <Link
          to="/dashboard/products/create"
          className="bg-gradient-to-r from-primary to-secondary text-gray-100 px-4 py-2 rounded mb-4 inline-block"
        >
          Add New Product
        </Link>
        <p className="text-xl font-semibold">Total Products: {totalProducts}</p>
      </div>
      <table className="w-full  dark:dark:bg-slate-700 text-gray-900 dark:text-gray-100 shadow-md rounded-lg overflow-hidden text-center">
        <thead className="bg-gray-200 dark:bg-slate-700">
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Brand</th>

            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody className="dark:bg-slate-800">
          {allProducts?.map((product) => (
            <tr
              key={product._id}
              className="border-b border-slate-300 dark:border-slate-600"
            >
              <td className="px-4 py-2">{product.name}</td>
              <td className="px-4 py-2">${product.price}</td>
              <td className="px-4 py-2">{product.category}</td>
              <td className="px-4 py-2">{product.brand}</td>

              <td className="px-4 py-2">
                <Link
                  to={`/dashboard/products/update/${product._id}`}
                  className="text-primary hover:underline mr-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-4 py-2 rounded ${
              currentPage === index + 1
                ? 'bg-primary text-white'
                : 'bg-gray-200 dark:bg-slate-700 text-gray-900 dark:text-gray-100'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductManagement;
