import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Mail, Lock, User } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
import { RegisterUserPayload, useRegisterUserMutation } from "@/redux/features/user/authApi";
import { toast } from "sonner";
import { Toast } from "../ui/toast";


const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof formSchema>;

const DemoRegister = () => {
    const navigate = useNavigate();
    const [agreed, setAgreed] = useState(false);
//   const { toast } = useToast();
   const [registerUser, { isLoading, isError, error,isSuccess }] =
      useRegisterUserMutation();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const password = form.watch('password');
  const passwordConfirm = form.watch('confirmPassword');

  const onSubmit = async(data: FormData) => {
    const regData = {
        name:data.name,
        email:data.email,
        password:data.confirmPassword
    }
     try {
          const res =  await registerUser(regData).unwrap();
        //   toast({
        //     title: "Registration Attempt",
        //     description: "Registration functionality will be implemented soon!",
        //   });
          
            toast.success(
                 "Registration Completed, You Can Login now!",
              );
          
          navigate(`/login`);
         
          
        } catch (err:any) {
        console.log(err);
          toast.error(`Registration Not Completed for ${err.data?.errorSources[0]?.message}`);
        }

  
  };

  return (
    <div className="flex items-start justify-center  px-4 sm:px-6 lg:px-8 bg-[hsl(240,3.7%,15.9%)] relative overflow-hidden min-h-screen  pt-10">

        {/* bg gradient */}
        <div className="absolute -top-32 -left-40 w-[500px] h-[500px] bg-[hsl(0,72.2%,50.6%)] opacity-20 blur-[140px] rounded-full z-0"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[hsl(0,72.2%,50.6%)] opacity-20 blur-[120px] rounded-full z-0"></div>

    <div className=" relative z-10 max-w-7xl w-full p-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-fade-in">
      
    

      {/* Left Column */}
      <div className="hidden md:flex flex-col justify-center">
        <div className="relative bg-white p-6 rounded-2xl shadow-xl">
          <h1 className="text-4xl font-bold text-bike-dark mb-3">Join Our Cycling Community</h1>
          <p className="text-gray-600 mb-6">Discover the best gear for your cycling adventures.</p>
          <img 
            src="https://images.unsplash.com/photo-1571068316344-75bc76f77890?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80" 
            alt="Cycling gear" 
            className="w-full h-64 object-cover rounded-lg shadow-md" 
          />
          <div className="mt-2 space-y-3">
            {["Create your account", "Browse our premium collection", "Enjoy special member benefits"].map((text, i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className={`h-8 w-8 rounded-full bg-red-700 opacity-${55 + i * 15} flex items-center justify-center`}>
                  <span className="text-white font-bold">{i + 1}</span>
                </div>
                <span className="text-sm text-gray-600">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
  
      {/* Right Column - Form */}
      <div className="flex items-center justify-center">
        <Card className="w-full md:max-w-[600px] shadow-lg border-0">
        <div className="py-3">
    <h2 className="text-2xl font-bold text-center ">Create an Account</h2>
    <CardDescription className="text-center">
      Enter your information to get started
    </CardDescription>
  </div>
  <CardContent className="">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    <User size={18} />
                  </span>
                  <Input 
                    {...field} 
                    placeholder="John Doe" 
                    className="pl-10 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                  />
                </div>
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
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    <Mail size={18} />
                  </span>
                  <Input 
                    {...field} 
                    placeholder="you@example.com" 
                    className="pl-10 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                  />
                </div>
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
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    <Lock size={18} />
                  </span>
                  <Input 
                    {...field} 
                    type="password" 
                    placeholder="••••••••" 
                    className="pl-10 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    <Lock size={18} />
                  </span>
                  <Input 
                    {...field} 
                    type="password" 
                    placeholder="••••••••" 
                    className="pl-10 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                  />
                </div>
              </FormControl>
              {passwordConfirm && password !== passwordConfirm ? (
                  <FormMessage> Password does not match </FormMessage>
                ) : (
                  <FormMessage />
                )}
            </FormItem>
          )}
        />
        <div className="flex items-start space-x-2 pt-2">
          <input 
            type="checkbox" 
            id="terms" 
            className="mt-1 rounded text-bike-blue focus:ring-bike-blue"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <label htmlFor="terms" className="text-sm text-gray-600">
            By creating an account, you agree to our <a href="#" className="text-yellow-500 hover:underline">Terms of Service</a> and <a href="#" className="text-yellow-600 hover:underline">Privacy Policy</a>
          </label>
        </div>
        <Button 
          type="submit" 
          className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 w-full text-white"
          disabled={
            !agreed || (passwordConfirm && password !== passwordConfirm)
          }
        >
          Create Account
        </Button>
      </form>
    </Form>
  </CardContent>
  <CardFooter className="">
   
    <p className="text-center text-sm text-gray-600 w-full">
      Already have an account?{" "}
      <Link to="/login" className="font-medium text-primary hover:underline">
        Sign in
      </Link>
    </p>
  </CardFooter>
        </Card>
      </div>
      
    </div>
  </div>
  
  );
};

export default DemoRegister;
