/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode } from 'react'
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import PHForm from '../ui/form/PHForm'
import { style } from './form.style'
import { useRegisterUserMutation, useSignInUserMutation } from '../../redux/features/user/authApi';
import { Link, useNavigate } from 'react-router-dom';
import PHInput from '../ui/form/PHInput';
import { FaRegUser } from 'react-icons/fa';
import { MdOutlineMail, MdOutlineRemoveRedEye } from 'react-icons/md';
import { TUser } from '../../types/alltypes';
import { useAppDispatch } from '../../redux/hooks';
import { verifyToken } from '../../utils/verifyToken';
import { setUser } from '../../redux/features/user/authSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';



type TSignInFormInputs ={
  email: string;
  password: string;
}
type TFormConfig = {
  defaultValues?: Record<string, any>;
  resolver?: any;
};
type TFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
} & TFormConfig;

const SignIn = () => {
  const [signInUser, { isLoading, isError, error }] = useSignInUserMutation();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  // Define the form input types

const navigate = useNavigate();
const dispatch = useAppDispatch();
 
  const {
   
    register,
    handleSubmit,
   
    formState: { errors },
  } = useForm<TUser>();
  
  const defaultValues = {
    email: 'ask6@gmail.com',
    password: 'ask123',
  };
  // const onSubmit: SubmitHandler<TUser> = (data) => console.log(data)

  
  const onSubmit:SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    try {
      const res = await signInUser(data).unwrap();
      console.log(res.data.token);
      const user = verifyToken(res.data.token) as TUser;
      console.log(user);
      dispatch(setUser({ user: user, token: res.data.token }));
      // alert(`Sign-in successful! Token: ${res.token}`);
      if(cartItems.length){
        navigate('/cart')
      }else{
        navigate(`/`);
      }

      
      // You can save the token to localStorage or Redux state for future requests
      // localStorage.setItem('token', response.token);
    } catch (err) {
      alert('Sign-in failed!');
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
  
 <PHForm onSubmit={onSubmit}  style={style} defaultValues={defaultValues}>
      <div className="mb-12">
        <h3 className="text-gray-800 dark:text-gray-200  text-3xl text-center">Sign In</h3>
      </div>


      <div className="mt-8">
        {/* <label className="text-gray-800 text-xs block mb-2">Email</label> */}
        <div className="relative flex items-center">
           <PHInput type="email" name="email" label="Email" 
            style={style} />
        
          <MdOutlineMail fill="#bbb"
            stroke="#bbb"
            className="w-[18px] h-[18px] absolute right-2" />
       
        </div>
        {errors.email && <span className="text-red-700">{errors.email.message}</span>}
      </div>

      <div className="mt-8">
        {/* <label className="text-gray-800 text-xs block mb-2">Password</label> */}
        <div className="relative flex items-center">

        <PHInput type="password" name="password" label="Email" 
            style={style} />
          <MdOutlineRemoveRedEye   fill="#bbb"
            stroke="#bbb"
            className="w-[18px] h-[18px] absolute right-2 cursor-pointer"/>
          
        </div>
        {errors.password && <span>{errors.password.message}</span>}
      </div>

      <div className="mt-8">
        <button
          type="submit"
          className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold tracking-wider rounded-md text-white bg-gradient-to-r from-primary to-secondary  focus:outline-none transition-all"
        >
        
           {isLoading ? 'Registering...' : 'Register'}
          
        </button>
        <p className="text-gray-800 dark:text-gray-200 text-sm mt-4 text-center">
        Don't have an account?{" "}
          <Link to='/signup'  className="text-primary font-semibold hover:underline ml-1">Register here</Link>
        </p>
      </div>
      {isError && (
        <div>Error: {(error as any)?.data?.message || 'Something went wrong'}</div>
      )}
    </PHForm>
  </div>
</div>
  )
}

export default SignIn