import React from 'react';
import { useForm } from 'react-hook-form';
import { AddBikePayload } from '../../../../types/alltypes';
import { style } from '../../../register/form.style';
import { useAddProductMutation } from '../../../../redux/features/products/productsApi';
import { toast } from 'react-toastify';
// import PHForm from '../../../../ui/form/PHForm';
// import { useAddProductMutation } from '../../../../../redux/features/products/productsApi';
// import PHInput from '../../../../ui/form/PHInput';
// import PHTextarea from '../../../../ui/form/PHTextarea';
// import PHSelect from '../../../../ui/form/PHSelect';
// import InputField from './InputField';

const AddProdact = () => {
  const {
    register,
    handleSubmit,
    // control,
    reset,
    formState: { errors },
  } = useForm<AddBikePayload>();
  const [addProduct, { isLoading }] = useAddProductMutation();

  const onSubmit = async (data: AddBikePayload) => {
    console.log(data);
    reset();
    try {
      await addProduct(data as AddBikePayload).unwrap();
      toast.success('Product added successfully!');
      reset(); // Reset the form
    } catch (error) {
      console.log(error);
      toast.error('Failed to Add Product.');
    }
  };
  return (
    <div className="font-[sans-serif] relative">
      <div className="h-[240px] font-[sans-serif]">
        <img
          src="https://i.ibb.co.com/wppqnqS/segway-xyber-header.jpg"
          alt="Banner Image"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative -mt-40 m-4">
        <div className=" mb-4">
          <h2 className="text-xl font-bold ">Add New Product</h2>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`${style.formStyle} `}
        >
          <h2 className="text-xl font-bold ">Add New Product</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                {...register('name', { required: 'Name is required' })}
                placeholder="Enter Your Bike Name"
                className="w-full px-4 py-2 border rounded-lg"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700">Brand</label>
              <select
                {...register('category', { required: 'Category is required' })}
                className="w-full px-4 py-2 border rounded-lg"
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
              <label className="block text-gray-700">Modal</label>
              <input
                {...register('model', { required: 'Model is required' })}
                placeholder="Enter Your Model Name"
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
              <label className="block text-gray-700">Quantity</label>
              <input
                type="number"
                {...register('quantity', { required: 'Quantity is required' })}
                placeholder="Enter Stock Quantity"
                className="w-full px-4 py-2 border rounded-lg"
              />
              {errors.quantity && (
                <p className="text-red-500 text-sm">
                  {errors.quantity.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700">Price</label>
              <input
                type="number"
                {...register('price', { required: 'Price is required' })}
                placeholder="Enter  Bike Price"
                className="w-full px-4 py-2 border rounded-lg"
              />
              {errors.price && (
                <p className="text-red-500 text-sm">{errors.price.message}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700">Bike Image Url</label>
              <input
                type="string"
                {...register('bikeImg', { required: 'Price is required' })}
                placeholder="Enter  Bike Image url link"
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
                placeholder="Write Bike Description"
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-500 w-full text-white px-4 py-2 mt-4 rounded hover:bg-blue-600"
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

{
  /* <div className='flex justify-between items-center mb-4'>
          <h2  className="text-xl font-bold ">Add New Product</h2>
         
    </div> */
}
//     <form onSubmit={handleSubmit(onSubmit)} className={style.formStyle}>
//     <h2  className="text-xl font-bold ">Add New Product</h2>
// <div>
//    <label className="block text-gray-700">Name</label>
//    <input
//    {...register('name', { required: 'Name is required' })}
//    className="w-full px-4 py-2 border rounded-lg"
//    />
//    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
// </div>

// <div>
//    <label className="block text-gray-700">Modal</label>
//    <input
//    {...register('model', { required: 'Model is required' })}
//    className="w-full px-4 py-2 border rounded-lg"
//    />
//    {errors.model && <p className="text-red-500 text-sm">{errors.model.message}</p>}
// </div>
// <div>
//    <label className="block text-gray-700">Category</label>
//    <select
//    {...register('category', { required: 'Category is required' })}
//    className="w-full px-4 py-2 border rounded-lg"
//    >
//    <option value="">Select a category</option>
//    <option value="electronics">Electronics</option>
//    <option value="clothing">Clothing</option>
//    <option value="books">Books</option>
//    </select>
//    {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
// </div>
// <div>
//    <label className="block text-gray-700">Quantity</label>
//    <input
//    type="number"
//    {...register('quantity', { required: 'Quantity is required' })}
//    className="w-full px-4 py-2 border rounded-lg"
//    />
//    {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity.message}</p>}
// </div>
// <div>
//    <label className="block text-gray-700">Price</label>
//    <input
//    type="number"
//    {...register('price', { required: 'Price is required' })}
//    className="w-full px-4 py-2 border rounded-lg"
//    />
//    {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
// </div>
// <div>
//    <label className="block text-gray-700">Product Image</label>
//    <input
//    type="string"
//    {...register('bikeImg', { required: 'Price is required' })}
//    className="w-full px-4 py-2 border rounded-lg"
//    />
//    {errors.bikeImg && <p className="text-red-500 text-sm">{errors.bikeImg.message}</p>}
// </div>
// <div>
//    <label className="block text-gray-700">Description</label>
//    <textarea
//    {...register('description')}
//    className="w-full px-4 py-2 border rounded-lg"
//    />
// </div>
// <button
// type="submit"
// //   disabled={isLoading}
// className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
// >
// {/* {isLoading ? 'Creating...' : 'Create Product'} */}
// Create Product
// </button>
// </form>

/* <PHForm onSubmit={onSubmit} defaultValues={{
     
     name: "",
     brand: '',
     model: '',
     price: 0,
     category: "Mountain",
     description: "",
     bikeImg: "",
     quantity: 0
 
} }
style={style}>
 <div className="mb-12">
     <h3 className="text-gray-800 dark:text-gray-200  text-3xl text-center">Register</h3>
 </div>

<div className='grid grid-cols-1 md:grid-cols-2'>
<div>
 <label className="text-gray-800 text-xs block mb-2">Bike Name</label>
     <div className="relative flex items-center">
     <PHInput type="text" control={control} name="name" label="name" 
     style={style} />
     {errors.name && <span>{errors.name.message}</span>}
  

     </div>
 </div>
 <div className='mt-4'>
     <label className="text-gray-800 text-xs block mb-2">Brand</label>
     <div className="relative flex items-center">
         <PHInput type="text" name="model" style={style} />
         {errors.name && <span>{errors.name.message}</span>}
     </div>    
 </div>
 <div className='mt-4'>
 <label className="text-gray-800 text-xs block mb-2">Brand</label>
     <div className="relative flex items-center">
         <PHSelect  name="brand" control={control} />
         {errors.name && <span>{errors.name.message}</span>}
     </div>
 </div>
 <div className='mt-4'>
     <label className="text-gray-800 text-xs block mb-2">Price</label>
     <div className="relative flex items-center">
         <PHInput type="number" control={control} name="price" style={style} />
         {errors.name && <span>{errors.name.message}</span>}
     </div>
 </div>
 <div className='mt-4'>
     <label className="text-gray-800 text-xs block mb-2">Description</label>
     <div className="relative flex items-center">
         <PHTextarea control={control} type="text" name="description" style={style} />
         {errors.name && <span>{errors.name.message}</span>}
     </div>
 </div>
 <div className='mt-4'>
     <label className="text-gray-800 text-xs block mb-2">Quantity</label>
     <div className="relative flex items-center">
         <PHInput control={control} type="number" name="quantity" style={style} />
         {errors.name && <span>{errors.name.message}</span>}
     </div>
 </div>
 <div className='mt-4'>
     <label className="text-gray-800 text-xs block mb-2">Product Image</label>
     <div className="relative flex items-center">
         <PHInput control={control} type="text" name="bikeImg" style={style} />
         {errors.name && <span>{errors.name.message}</span>}
     </div>
 </div>
</div>
 <div className="mt-8">
 <button
   type="submit"
   className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold tracking-wider rounded-md text-white bg-gradient-to-r from-primary to-secondary  focus:outline-none transition-all"
 >
 
    {/* {isLoading ? 'Registering...' : 'Register'} */
//     Add Product

//  </button>

// </div>

// </PHForm> */}
