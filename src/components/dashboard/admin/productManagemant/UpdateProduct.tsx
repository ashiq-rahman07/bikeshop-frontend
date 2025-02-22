import { useForm } from 'react-hook-form';
import { AddBikePayload } from '../../../../types/alltypes';
import { style } from '../../../register/form.style';
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from '../../../../redux/features/products/productsApi';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Loading from '../../../ui/Loading';

const UpdateProdact = () => {
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();
  const {
    register,
    handleSubmit,

    reset,
  } = useForm<AddBikePayload>();

  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  const {
    data: singleProducts,
    isLoading: singleProductLoading,
    refetch,
  } = useGetProductByIdQuery(productId as string);
  const singleProduct = singleProducts?.data;
  const bikeId = singleProduct?._id as string;

  useEffect(() => {
    if (singleProduct) {
      reset({
        ...singleProduct,
      });
    }
  }, [singleProduct, , refetch]);
  //  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  const onSubmit = async (data: AddBikePayload) => {
    const bikeData = {
      ...data,
    };
    console.log(bikeData);
    // reset();
    try {
      await updateProduct({ bikeId, bikeData }).unwrap();

      toast.success('Product Updated successfully!');
      //   refetch() // Reset the form
      navigate('/dashboard/products');
      //   refetch()
    } catch (error) {
      console.log(error);
      toast.error('Failed to update Product.');
    }
  };
  if (singleProductLoading) {
    <Loading />;
  }
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
                {...register('name')}
                defaultValue={singleProduct?.name}
                className="w-full  px-4 py-2 border border-gray-700 rounded-lg dark:bg-slate-900 dark:text-gray-100"
              />
            </div>
            {/* <div>
              <label className="block  text-gray-400 mb-2">Brand</label>
              <select
                {...register('brand')}
                defaultValue={singleProduct?.brand}
                className="w-full px-4 border-gray-700 py-2 border rounded-lg dark:bg-slate-900 dark:text-100"
              >
                <option value="">Select a Brand</option>
                <option value="Yamaha">Yamaha</option>
                <option value="Honda">Honda</option>
                <option value="Suzuki">Suzuki</option>
                <option value="Tvs">Tvs</option>
                <option value="Bajaj">Bajaj</option>
              </select>
            
            </div> */}
            <div>
              <label className="block text-gray-400 mb-2">Modal</label>
              <input
                {...register('model')}
                defaultValue={singleProduct?.model}
                className="w-full px-4 border-gray-700 py-2 border rounded-lg dark:bg-slate-900 dark:text-100"
              />
            </div>
            {/* <div>
              <label className="block text-gray-400 mb-2">Category</label>
              <select
                {...register('category')}
                defaultValue={singleProduct?.category}
                className="w-full border-gray-700 px-4 py-2 border rounded-lg dark:bg-slate-900 dark:text-100"
              >
                <option value="">Select a category</option>
                <option value="Mountain">Mountain</option>
                <option value="Road">Road</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Electric">Electric</option>
              </select>
        
            </div> */}
            <div>
              <label className="block text-gray-400 mb-2">Quantity</label>
              <input
                type="number"
                {...register('quantity', { valueAsNumber: true })}
                defaultValue={singleProduct?.quantity}
                className="w-full border-gray-700 px-4 py-2 border rounded-lg dark:bg-slate-900 dark:text-100"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Price</label>
              <input
                type="number"
                {...register('price', { valueAsNumber: true })}
                defaultValue={singleProduct?.price}
                className="w-full border-gray-700 px-4 py-2 border rounded-lg dark:bg-slate-900 dark:text-100"
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-400">Bike Image Url</label>
              <input
                type="string"
                {...register('bikeImg')}
                defaultValue={singleProduct?.bikeImg}
                className="w-full border-gray-700 px-4 py-2 border rounded-lg dark:bg-slate-900 dark:text-100"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Description</label>
              <textarea
                {...register('description')}
                defaultValue={singleProduct?.description}
                className="w-full border-gray-700 px-4 py-2 border rounded-lg dark:bg-slate-900 dark:text-100"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-secondary text-xl w-full text-white px-4 py-2 mt-4 rounded hover:bg-blue-600"
          >
            {isLoading ? 'Update Product...' : 'Update Product'}
            {/* Create Product */}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProdact;
