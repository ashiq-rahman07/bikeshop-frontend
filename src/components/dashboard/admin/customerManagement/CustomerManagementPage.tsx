import React from 'react';
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserStatusMutation,
} from '../../../../redux/features/user/authApi';
import { toast } from 'react-toastify';

const CustomerManagementPage: React.FC = () => {
  const { data, isLoading, isError, refetch } = useGetUsersQuery();
  const usersData = data?.data;

  // Update user status
  const [updateUser] = useUpdateUserStatusMutation();

  // Delete user
  const [deleteUser] = useDeleteUserMutation();

  // Handle toggle active status
  const handleToggleActive = async (id: string, isActive: boolean) => {
    const payload = {
      userId: id,
      isActive: !isActive,
    };
    console.log(payload);
    try {
      await updateUser(payload).unwrap();
      toast.success('User Status Updating...');
      refetch();
    } catch (error) {
      toast.error('Failed To Update User Status');
      console.error('Failed to update user status:', error);
    }
  };

  // Handle delete user
  const handleDeleteUser = async (userId: string) => {
    console.log(userId);
    try {
      await deleteUser(userId).unwrap();
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading users.</div>;

  return (
    <div className="p-6 overflow-x-auto bg-gray-100 dark:bg-gray-900 dark:text-gray-100 min-h-screen">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Customer Management</h1>
        </div>

        {/* Customer Table */}
        <div className="rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full text-cente">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Role</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {usersData?.map((user) => (
                <tr
                  key={user._id}
                  className="border-b r hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 text-sm rounded-full ${
                        user.role === 'admin'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 text-sm rounded-full ${
                        user.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() =>
                          handleToggleActive(user._id, user.isActive)
                        }
                        className={`px-2 py-1 text-sm rounded-full ${
                          user.isActive
                            ? 'bg-red-100 text-red-800 hover:bg-red-200'
                            : 'bg-green-100 text-green-800 hover:bg-green-200'
                        }`}
                      >
                        {user.isActive ? 'Deactivate' : 'Activate'}
                      </button>

                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="px-2 py-1 text-sm rounded-full bg-red-600 hover:text-red-800 hover:bg-slate-100"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerManagementPage;
