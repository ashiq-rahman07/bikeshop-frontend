/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link, useNavigate } from "react-router-dom"

import { FaRegUser } from "react-icons/fa";
import { MdOutlineMail, MdOutlineRemoveRedEye  } from "react-icons/md";
import { useRegisterUserMutation } from "../../redux/features/user/authApi";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { TUser } from "../../types/alltypes";
import PHInput from "../ui/form/PHInput";
import PHForm from "../ui/form/PHForm";
import { style } from "./form.style";


type TFormConfig = {
  defaultValues?: Record<string, any>;
  resolver?: any;
};


const SignUp = () => {
  const navigate = useNavigate();
 
  const {
   
    register,
    handleSubmit,
   
    formState: { errors },
  } = useForm<TUser>();
  
  const [registerUser, { isLoading, isError, error }] = useRegisterUserMutation();
  // const onSubmit: SubmitHandler<TUser> = (data) => console.log(data)

  
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      console.log(data);
      await registerUser(data).unwrap();
     
      alert('Registration successful!');
      navigate(`/signin`);
    } catch (err) {
      alert('Registration failed!');
    }
  };
return(
 
<div className="font-[sans-serif] relative"> 
  <div className="h-[240px] font-[sans-serif]">
  
  <img
     src="https://i.ibb.co.com/wppqnqS/segway-xyber-header.jpg"
    alt="Banner Image"
      className="w-full h-full object-cover"
    /> 
  </div>

 <div className="relative -mt-40 m-4"> 
  
 <PHForm onSubmit={onSubmit}  style={style}>
      <div className="mb-12">
        <h3 className="text-gray-800 dark:text-gray-200  text-3xl text-center">Register</h3>
      </div>

      <div>
        {/* <label className="text-gray-800 text-xs block mb-2">Full Name</label> */}
        <div className="relative flex items-center">
        <PHInput type="text" name="name" label="Email" 
            style={style} />
          {errors.name && <span>{errors.name.message}</span>}
          <FaRegUser fill="#bbb"
            stroke="#bbb"  className="w-[18px] h-[18px] absolute right-2"/>
       
        </div>
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
          Already have an account?{" "}
          <Link to='/signin'  className="text-primary font-semibold hover:underline ml-1">Login here</Link>
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

export default SignUp