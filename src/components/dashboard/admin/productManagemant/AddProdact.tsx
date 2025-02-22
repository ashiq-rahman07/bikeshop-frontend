import { useForm } from 'react-hook-form';
import { AddBikePayload } from '../../../../types/alltypes';
import { style } from '../../../register/form.style';
import { useAddProductMutation } from '../../../../redux/features/products/productsApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddProdact = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    // control,
    reset,
    formState: { errors },
  } = useForm<AddBikePayload>();
  const [addProduct, { isLoading }] = useAddProductMutation();

  const onSubmit = async (data: AddBikePayload) => {
    const addData = {
      ...data,
      price: Number(data.price),
      quantity: Number(data.quantity),
    };
    // reset();
    try {
      await addProduct(addData as AddBikePayload).unwrap();
      toast.success('Product added successfully!');
      reset(); // Reset the form
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error('Failed to Add Product.');
    }
  };
  return (
    <div className="font-[sans-serif] relative dark:bg-gray-900">
      <div className="h-[240px] font-[sans-serif]">
        <img
          src="https://i.ibb.co.com/wppqnqS/segway-xyber-header.jpg"
          alt="Banner Image"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative -mt-40 mb-0">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`${style.formStyle} `}
        >
          <h2 className="text-xl font-bold text-center pb-4">
            Add New Product
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-gray-400 mb-2">Name</label>
              <input
                {...register('name', { required: 'Name is required' })}
                placeholder="Enter Your Bike Name"
                className="w-full  px-4 py-2 border border-gray-700 rounded-lg dark:bg-slate-900 dark:text-gray-100"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label className="block  text-gray-400 mb-2">Brand</label>
              <select
                {...register('brand', { required: 'Category is required' })}
                className="w-full px-4 border-gray-700 py-2 border rounded-lg dark:bg-slate-900 dark:text-100"
              >
                <option value="">Select a Brand</option>
                <option value="Yamaha">Yamaha</option>
                <option value="Honda">Honda</option>
                <option value="Suzuki">Suzuki</option>
                <option value="Tvs">Tvs</option>
                <option value="Bajaj">Bajaj</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm">
                  {errors.category.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Modal</label>
              <input
                {...register('model', { required: 'Model is required' })}
                placeholder="Enter Your Model Name"
                className="w-full px-4 border-gray-700 py-2 border rounded-lg dark:bg-slate-900 dark:text-100"
              />
              {errors.model && (
                <p className="text-red-500 text-sm">{errors.model.message}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Category</label>
              <select
                {...register('category', { required: 'Category is required' })}
                className="w-full border-gray-700 px-4 py-2 border rounded-lg dark:bg-slate-900 dark:text-100"
              >
                <option value="">Select a category</option>
                <option value="Mountain">Mountain</option>
                <option value="Road">Road</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Electric">Electric</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm">
                  {errors.category.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Quantity</label>
              <input
                type="number"
                {...register('quantity', { required: 'Quantity is required' })}
                placeholder="Enter Stock Quantity"
                className="w-full border-gray-700 px-4 py-2 border rounded-lg dark:bg-slate-900 dark:text-100"
              />
              {errors.quantity && (
                <p className="text-red-500 text-sm">
                  {errors.quantity.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Price</label>
              <input
                type="number"
                {...register('price', { required: 'Price is required' })}
                placeholder="Enter  Bike Price"
                className="w-full border-gray-700 px-4 py-2 border rounded-lg dark:bg-slate-900 dark:text-100"
              />
              {errors.price && (
                <p className="text-red-500 text-sm">{errors.price.message}</p>
              )}
            </div>
            <div>
              <label className="block mb-2 text-gray-400">Bike Image Url</label>
              <input
                type="string"
                {...register('bikeImg', { required: 'Price is required' })}
                placeholder="Enter  Bike Image url link"
                className="w-full border-gray-700 px-4 py-2 border rounded-lg dark:bg-slate-900 dark:text-100"
              />
              {errors.bikeImg && (
                <p className="text-red-500 text-sm">{errors.bikeImg.message}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Description</label>
              <textarea
                {...register('description')}
                placeholder="Write Bike Description"
                className="w-full border-gray-700 px-4 py-2 border rounded-lg dark:bg-slate-900 dark:text-100"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-secondary text-xl w-full text-white px-4 py-2 mt-4 rounded hover:bg-blue-600"
          >
            {isLoading ? 'Add Product...' : 'Add Product'}
            {/* Create Product */}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProdact;
