import React from 'react';

const InputField = ({ ...register }) => {
  return (
    <>
      <label className="block text-gray-700">Name</label>
      <input
        {...register('name', { required: 'Name is required' })}
        className="w-full px-4 py-2 border rounded-lg"
      />
    </>
  );
};

export default InputField;
