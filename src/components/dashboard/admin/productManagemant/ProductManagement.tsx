import { Link } from 'react-router-dom';
import { useGetAllProductsQuery } from '../../../../redux/features/products/productsApi';
import { useState } from 'react';
import AddProductModal from './Modal/AddProductModal';
// import { TBike } from "../../../../types/product.type";

const ProductManagement = () => {
  const {
    data: products,
    isLoading,
    isError,
  } = useGetAllProductsQuery(undefined);
  const allProducts = products?.data;

  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [deleteProduct] = useDeleteProductMutation();

  // const handleDelete = async (id: string) => {
  //   if (window.confirm('Are you sure you want to delete this product?')) {
  //     try {
  //       await deleteProduct(id).unwrap();
  //       alert('Product deleted successfully!');
  //     } catch (error) {
  //       console.log(error);
  //       alert('Failed to delete product.');
  //     }
  //   }
  // };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading products.</div>;
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Product Management</h1>
      <button
        // to="/dashboard/products/create"
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block"
      >
        Create New Product
      </button>
      <Link
        to="/dashboard/products/create"
        // onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block"
      >
        Create New Product Link
      </Link>
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden text-center">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Brand</th>

            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {allProducts?.map((product) => (
            <tr key={product._id} className="border-b">
              <td className="px-4 py-2">{product.name}</td>
              <td className="px-4 py-2">${product.price}</td>
              <td className="px-4 py-2">{product.category}</td>
              <td className="px-4 py-2">{product.brand}</td>

              <td className="px-4 py-2">
                <Link
                  to={`/dashboard/products/edit/${product._id}`}
                  className="text-blue-500 hover:underline mr-2"
                >
                  Edit
                </Link>
                <button
                  // onClick={() => handleDelete(product.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ProductManagement;
