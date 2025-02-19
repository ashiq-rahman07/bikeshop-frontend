import React from 'react';
import { useForm } from 'react-hook-form';

// import { toast } from 'react-toastify';
import Modal from './Modal';
// import { useAddProductMutation } from '../../../../../redux/features/products/productsApi';
import { AddBikePayload } from '../../../../../types/alltypes';

// interface ProductFormValues {
//   name: string;
//   price: number;
//   description: string;
// }

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
}) => {
  //   const [addProduct, { isLoading }] = useAddProductMutation();
  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm<AddBikePayload>();

  const onSubmit = async (data: AddBikePayload) => {
    console.log(data);
    // try {
    //   await addProduct(data).unwrap();
    //   toast.success('Product created successfully!');
    //   reset(); // Reset the form
    //   onClose(); // Close the modal
    // } catch (error) {
    //     console.log(error);
    //   toast.error('Failed to create product.');
    // }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold ">Add New Product</h2>
        <button onClick={() => onClose()} className="text-xl font-bold ">
          Close Modal
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-gray-700">Name</label>
          <input
            {...register('name', { required: 'Name is required' })}
            className="w-full px-4 py-2 border rounded-lg"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="block text-gray-700">Modal</label>
          <input
            {...register('model', { required: 'Model is required' })}
            className="w-full px-4 py-2 border rounded-lg"
          />
          {errors.model && (
            <p className="text-red-500 text-sm">{errors.model.message}</p>
          )}
        </div>
        <div>
          <label className="block text-gray-700">Category</label>
          <select
            {...register('category', { required: 'Category is required' })}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="">Select a category</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="books">Books</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}
        </div>
        <div>
          <label className="block text-gray-700">Quantity</label>
          <input
            type="number"
            {...register('quantity', { required: 'Quantity is required' })}
            className="w-full px-4 py-2 border rounded-lg"
          />
          {errors.quantity && (
            <p className="text-red-500 text-sm">{errors.quantity.message}</p>
          )}
        </div>
        <div>
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            {...register('price', { required: 'Price is required' })}
            className="w-full px-4 py-2 border rounded-lg"
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price.message}</p>
          )}
        </div>
        <div>
          <label className="block text-gray-700">Product Image</label>
          <input
            type="string"
            {...register('bikeImg', { required: 'Price is required' })}
            className="w-full px-4 py-2 border rounded-lg"
          />
          {errors.bikeImg && (
            <p className="text-red-500 text-sm">{errors.bikeImg.message}</p>
          )}
        </div>
        <div>
          <label className="block text-gray-700">Description</label>
          <textarea
            {...register('description')}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <button
          type="submit"
          //   disabled={isLoading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {/* {isLoading ? 'Creating...' : 'Create Product'} */}
          Create Product
        </button>
      </form>
    </Modal>
  );
};

export default AddProductModal;
