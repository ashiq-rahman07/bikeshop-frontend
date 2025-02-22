/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link, useNavigate } from 'react-router-dom';

// import { FaRegUser } from "react-icons/fa";
// import { MdOutlineMail, MdOutlineRemoveRedEye  } from "react-icons/md";
import {
  SignInUserPayload,
  useSignInUserMutation,
} from '../../redux/features/user/authApi';
import { useForm } from 'react-hook-form';
import { TUser } from '../../types/alltypes';
// import PHInput from "../ui/form/PHInput";
// import PHForm from "../ui/form/PHForm";
import { style } from './form.style';
import { toast } from 'react-toastify';
import { verifyToken } from '../../utils/verifyToken';
import { setUser } from '../../redux/features/user/authSlice';
import { useAppDispatch } from '../../redux/hooks';

// type TFormConfig = {
//   defaultValues?: Record<string, any>;
//   resolver?: any;
// };

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TUser>();
// console.log(errors)
  // Explicitly type the errors object

  const [signInUser, { isLoading, isError, error }] = useSignInUserMutation();
  // const onSubmit: SubmitHandler<TUser> = (data) => console.log(data)

  const onSubmit = async (data: SignInUserPayload) => {
    try {
      console.log(data);
      const res = await signInUser(data).unwrap();
      // console.log(res.data.token);
      const token = res.data.token;

      const user = verifyToken(token);
      console.log(user);
      dispatch(setUser({ user, token: token }));
      toast.success('Sign In  successfully!');
      reset();
      navigate(`/`);
    } catch (err) {
      toast.error(`Failed To Sign In`);
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
          <h2 className="text-xl font-bold text-center ">Sign In</h2>

          <div className="mt-8">
            <label className="block text-gray-400">Email</label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              placeholder="Enter Your Email"
              className={style.authInput}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="mt-8">
            <label className="block text-gray-400">Password</label>
            <input
              type="password"
              {...register('password', { required: 'Password is required' })}
              placeholder="Enter Your Strong Password "
              className={style.authInput}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold tracking-wider rounded-md text-white bg-gradient-to-r from-primary to-secondary  focus:outline-none transition-all"
            >
              {isLoading ? 'Sign In...' : 'Sign In'}
            </button>
            <p className="text-gray-800 dark:text-gray-200 text-sm mt-4 text-center">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="text-primary font-semibold hover:underline ml-1"
              >
                Registration here
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

export default SignIn;
