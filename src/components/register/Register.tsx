
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {  Link, useNavigate } from 'react-router-dom';

import {
  RegisterUserPayload,
  useRegisterUserMutation,
} from '../../redux/features/user/authApi';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { TUser } from '../../types/alltypes';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { registrationSchema } from './registerValidation';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Button } from '../ui/button';


const Register = () => {
  const navigate = useNavigate();

  const form = useForm({
   
    resolver: zodResolver(registrationSchema),
  });

  const {
    reset,
    formState: { isSubmitting },
  } = form;

  const password = form.watch('password');
  const passwordConfirm = form.watch('passwordConfirm');

  const [registerUser, { isLoading, isError, error }] =
    useRegisterUserMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      await registerUser(data as RegisterUserPayload).unwrap();

      toast.success('Register successfully!');
      reset();
      navigate(`/signin`);
    } catch (err) {
      toast.error(`Failed To Register`);
    }
  };

  

  
  return (
   
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Create an account</h1>
            <p className="mt-2 text-gray-600">
              Join VelocityVibe to explore our collection of motorcycles
            </p>
          </div>
          
          
          <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value || ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} value={field.value || ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} value={field.value || ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} value={field.value || ''} />
                </FormControl>

                {passwordConfirm && password !== passwordConfirm ? (
                  <FormMessage> Password does not match </FormMessage>
                ) : (
                  <FormMessage />
                )}
              </FormItem>
            )}
          />

          <Button
            disabled={!!(passwordConfirm && password !== passwordConfirm)}
            type="submit"
            className="mt-5 w-full"
          >
            {isSubmitting ? 'Registering....' : 'Register'}
          </Button>
        </form>
      </Form>
        </div>
      </div>
  
  );
};

export default Register;
