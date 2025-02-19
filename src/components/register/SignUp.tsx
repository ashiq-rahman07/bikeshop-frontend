/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link, useNavigate } from 'react-router-dom';

// import { FaRegUser } from "react-icons/fa";
// import { MdOutlineMail, MdOutlineRemoveRedEye  } from "react-icons/md";
import {
  RegisterUserPayload,
  useRegisterUserMutation,
} from '../../redux/features/user/authApi';
import { useForm } from 'react-hook-form';
import { TUser } from '../../types/alltypes';
// import PHInput from "../ui/form/PHInput";
// import PHForm from "../ui/form/PHForm";
import { style } from './form.style';
import { toast } from 'react-toastify';

// type TFormConfig = {
//   defaultValues?: Record<string, any>;
//   resolver?: any;
// };

const SignUp = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TUser>();

  // Explicitly type the errors object

  const [registerUser, { isLoading, isError, error }] =
    useRegisterUserMutation();
  // const onSubmit: SubmitHandler<TUser> = (data) => console.log(data)

  const onSubmit = async (data: RegisterUserPayload) => {
    try {
      console.log(data);
      await registerUser(data as RegisterUserPayload).unwrap();

      toast.success('Register successfully!');
      reset();
      navigate(`/signin`);
    } catch (err) {
      toast.error(`Failed To Register`);
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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`${style.formStyle} `}
        >
          <h2 className="text-xl font-bold text-center ">Register</h2>

          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              {...register('name', { required: 'Name is required' })}
              placeholder="Enter Your Full Name"
              className="w-full px-4 py-2 border rounded-lg"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div className="mt-8">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              placeholder="Enter Your Email"
              className="w-full px-4 py-2 border rounded-lg"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div className="mt-8">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              {...register('password', { required: 'Password is required' })}
              placeholder="Enter Your Strong Password "
              className="w-full px-4 py-2 border rounded-lg"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold tracking-wider rounded-md text-white bg-gradient-to-r from-primary to-secondary  focus:outline-none transition-all"
            >
              {isLoading ? 'Registering...' : 'Register'}
            </button>
            <p className="text-gray-800 dark:text-gray-200 text-sm mt-4 text-center">
              Already have an account?{' '}
              <Link
                to="/signin"
                className="text-primary font-semibold hover:underline ml-1"
              >
                Login here
              </Link>
            </p>
          </div>
          {isError && (
            <div>
              Error: {(error as any)?.data?.message || 'Something went wrong'}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignUp;
