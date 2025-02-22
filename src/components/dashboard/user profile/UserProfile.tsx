/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import PfImg from '../../../images/pf.png';
import { selectCurrentUser } from '../../../redux/features/user/authSlice';
import { useAppSelector } from '../../../redux/hooks';
import {
  useGetSingleUserQuery,
  useUpdateUserMutation,
} from '../../../redux/features/user/authApi';
import Loading from '../../ui/Loading';

import { useForm } from 'react-hook-form';

import { style } from '../../register/form.style';

import { TUser } from '../../../types/alltypes';
import { useState } from 'react';
import PasswordChangeModal from '../admin/productManagemant/Modal/PasswordChangeModal';
import { toast } from 'react-toastify';

const UserProfile = () => {
  const user = useAppSelector(selectCurrentUser);

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const { data, isLoading, isError, refetch } = useGetSingleUserQuery(
    user?.userId,
  );
  const userProfile = data?.data;
  // Update user mutation
  const [updateUser, { isError: isUpdatingError }] = useUpdateUserMutation();

  type TUpdateFormInputs = {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  // console.log('find user', userProfile);
  const defaultValues = {
    name: userProfile?.name || '',
    email: userProfile?.email || '',
    phone: userProfile?.phone || '',
    address: userProfile?.address || '',
  };

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<TUpdateFormInputs>();

  const onSubmit = async (data: TUpdateFormInputs) => {
    const userData = data as Partial<TUser>;
    const userId = userProfile?._id as string;
    try {
      await updateUser({ userId, userData }).unwrap();

      toast.success('User profile updating....');

      refetch();

      if (isUpdatingError) {
        toast.error('Profile Update Failed');
        refetch();
      }
    } catch (err) {
      toast.error('Profile Update Failed');
    }
  };
  // // Show loading or error state
  if (isLoading) return <Loading />;
  if (isError) return <div>Error loading user data.</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 dark:text-gray-100 py-8">
      <div className="max-w-4xl w-full mx-4 bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 bg-purple-600 text-white p-8 text-center">
          <img
            src={PfImg}
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

        <div className="w-full dark:bg-gray-800 dark-text-gray100 md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Update Profile
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className={`${style.formStyle} `}
          >
            <h2 className="text-xl font-bold text-center ">Register</h2>

            <div>
              <label className="block text-gray-400">Name</label>
              <input
                type="text"
                {...register('name')}
                defaultValue={defaultValues.name}
                className={style.authInput}
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-400">Email</label>
              <input
                type="email"
                {...register('email')}
                defaultValue={defaultValues.email}
                className={style.authInput}
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-400">Phone</label>
              <input
                type="text"
                {...register('phone')}
                defaultValue={defaultValues.phone}
                className={style.authInput}
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-400">Address</label>
              <input
                type="text"
                {...register('address')}
                defaultValue={defaultValues.address}
                className={style.authInput}
              />
            </div>

            {isError && (
              <div>
                Error:{' '}
                {(errors as any)?.data?.message || 'Something went wrong'}
              </div>
            )}
            <div className="mt-4">
              <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700  duration-300 transition-colors">
                Update Profile
              </button>
            </div>
          </form>
          <div>
            <p className="text xl my-3"> Change Password</p>
            <button
              onClick={() => setIsPasswordModalOpen(true)}
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700  duration-300 transition-colors"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
      {/* Password Change Modal */}
      <PasswordChangeModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </div>
  );
};

export default UserProfile;
