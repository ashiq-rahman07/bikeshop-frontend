/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useState } from 'react';
import {
  selectCurrentUser,
  useCurrentToken,
} from '../../../redux/features/user/authSlice';
import { useAppSelector } from '../../../redux/hooks';
import {
  useGetSingleUserQuery,
  useUpdateUserMutation,
} from '../../../redux/features/user/authApi';
import Loading from '../../ui/Loading';
// import { useState } from 'react';
import PHForm from '../../ui/form/PHForm';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
// import { TUser } from '../../../types/alltypes';
import { style } from '../../register/form.style';
import PHInput from '../../ui/form/PHInput';
// import { useEffect, useState } from 'react';
import { TUser } from '../../../types/alltypes';

const UserProfile = () => {
  const user = useAppSelector(selectCurrentUser);
  const token = useAppSelector(useCurrentToken);
  console.log('user', user);
  console.log('token', token);
  const { data, isLoading, isError, refetch } = useGetSingleUserQuery(
    user?.userId,
  );
  const userProfile = data?.data;
  // Update user mutation
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  type TUpdateFormInputs = {
    name: string;
    email: string;
    phone: string;

    address: string;
  };
  // console.log('find user', userProfile);
  const defaultValues: TUpdateFormInputs = {
    name: userProfile?.name || '',
    email: userProfile?.email || '',
    phone: userProfile?.phone || '',

    address: userProfile?.address || '',
  };

  const {
    control,
    reset,
    formState: { errors },
  } = useForm<TUpdateFormInputs>();
  //   console.log(errors.address);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // console.log(data);
    const userData = data as Partial<TUser>;
    const userId = userProfile?._id as string;
    try {
      await updateUser({ userId, userData }).unwrap();

      alert('User updated successfully!');
      refetch();
    } catch (err) {
      console.log(err);
    }
  };
  // // Show loading or error state
  if (isLoading) return <Loading />;
  if (isError) return <div>Error loading user data.</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8">
      <div className="max-w-4xl w-full mx-4 bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 bg-purple-600 text-white p-8 text-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREO17hg6KvLlweeZWN0LCEdi-OXM9qGpbQ9w&s"
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto border-4 border-white"
          />
          <h1 className="text-2xl font-bold mt-4">{userProfile.name}</h1>
          <p className="text-gray-200 mt-2">Role: {userProfile.role}</p>
          <div className="mt-6 text-left">
            <p>
              <strong>Email:</strong> {userProfile.email}
            </p>
            <p>
              <strong>Phone:</strong> {userProfile.phone}
            </p>
            <p>
              <strong>Location:</strong> {userProfile.address}
            </p>
            <p>
              <strong>Customer Status:</strong>{' '}
              {userProfile.isActive ? 'Active' : 'Deactive'}
            </p>
            <p>
              <strong>Joined:</strong>{' '}
              {new Date(userProfile.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Update Profile
          </h2>

          <PHForm
            onSubmit={onSubmit}
            defaultValues={defaultValues}
            style={style}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <PHInput
                type="text"
                name="name"
                control={control}
                style={style}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <PHInput
                type="email"
                name="email"
                control={control}
                style={style}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="location"
              >
                Phone No
              </label>
              <PHInput
                type="text"
                name="phone"
                control={control}
                style={style}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="bio"
              >
                Address
              </label>
              <PHInput
                type="text"
                name="address"
                control={control}
                style={style}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300"
            >
              Update Profile
            </button>
          </PHForm>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

// const user = useAppSelector(selectCurrentUser);
// const { data: profile, isLoading, isError } = useGetSingleUserQuery(user?.userId);

// const onSubmit: SubmitHandler<FieldValues> = async (data) => {
//   console.log(data);
//   try {

//      const response = await fetch(`http://localhost:5000/api/v1/user/${userProfile._id}`, {
//       method: "PATCH", // Use PATCH if updating only specific fields
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization":`${token}`
//       },
//       body: JSON.stringify(data),
//     });
// console.log(response);

//     if (!response.ok) {
//       throw new Error("Failed to update user");
//     }

//     alert("User updated successfully!");

//   } catch (err) {
//     console.log(err);

// };
// }
