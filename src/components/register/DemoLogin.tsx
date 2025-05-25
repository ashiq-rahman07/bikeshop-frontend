import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Mail, Lock } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
import { useAppDispatch } from "@/redux/hooks";
import { useSignInUserMutation } from "@/redux/features/user/authApi";
import { verifyToken } from "@/utils/verifyToken";
import { setUser } from "@/redux/features/user/authSlice";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type FormData = z.infer<typeof formSchema>;

const DemoLogin = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
     const [signInUser, { isLoading, isError, error ,isSuccess}] = useSignInUserMutation();

  // const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async(data: FormData) => {
     try {
              const res = await signInUser(data).unwrap();
             
                   const token = res.data.token;
             
                   const user = verifyToken(token);
             
                   dispatch(setUser({ user, token: token }));
                  toast.success('Login Successfully')

                    form.reset();
                    navigate(`/`);
            } catch (err:any) {
              console.log(err)
              toast.error('Login Failed for', err.message)
            }
 
  };
  const adminLoginHandle = async() => {
     try {
              const res = await signInUser({email:"admin7@gmail.com",password:"admin12345"}).unwrap();
             
                   const token = res.data.token;
             
                   const user = verifyToken(token);
             
                   dispatch(setUser({ user, token: token }));
                  toast.success('Login Successfully')

                    form.reset();
                    navigate(`/`);
            } catch (err:any) {
              console.log(err)
              toast.error('Login Failed for', err.message)
            }
 
  };

  return (
    <div className= "flex items-start justify-center  px-4 sm:px-6 lg:px-8 bg-[hsl(240,3.7%,15.9%)] relative overflow-hidden min-h-screen pt-10" >
        {/* bg gradient */}
        <div className="absolute -top-32 -left-40 w-[500px] h-[500px] bg-[hsl(0,72.2%,50.6%)] opacity-20 blur-[140px] rounded-full z-0"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[hsl(0,72.2%,50.6%)] opacity-20 blur-[120px] rounded-full z-0"></div>

      <div className="  relative z-10 max-w-7xl w-full md:w-auto  p-0 m-0 grid grid-cols-1 md:grid-cols-2  gap-8 items-center animate-fade-in">
        {/* Left Column - Illustration */}
        <div className="hidden md:flex flex-col items-center justify-center ">
          <div className="relative">
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-bike-blue via-bike-accent to-bike-green blur-xl opacity-50"></div>
            <div className="relative bg-white p-6 rounded-2xl shadow-xl">
              <h1 className="text-4xl font-bold text-bike-dark mb-3">Pedal Perfect</h1>
              <p className="text-gray-600 mb-6">Your premier online destination for all your cycling needs.</p>
              <img 
                src="https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                alt="Bicycle" 
                className="w-full h-64 object-cover rounded-lg shadow-md" 
              />
             <div className="mt-6 space-y-3">
            {["Premium quality bikes and accessories", "Expert customer support", "Fast shipping nationwide"].map((text, i) => (
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
        </div>

        {/* Right Column - Login Form */}
        <div className="w-full flex justify-center">
          <Card className="w-full max-w-md shadow-lg border-0">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
              <CardDescription className="text-center">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="remember" 
                        className="rounded text-bike-blue focus:ring-bike-blue"
                      />
                      <label htmlFor="remember" className="text-sm text-gray-600">
                        Remember me
                      </label>
                    </div>
                    <a href="#" className="text-sm font-medium text-bike-blue hover:text-bike-accent">
                      Forgot password?
                    </a>
                  </div>
                  <Button 
                    type="submit" 
                    className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 w-full text-white"
                  >
                    Sign In
                  </Button>
                  <Button 
                    type="submit" 
                    variant="outline"
                    className="bg-transparent hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 w-full text-primary"
                    onClick={adminLoginHandle}
                  >
                    Admin Login
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
             
              <p className="text-center text-sm text-gray-600 mt-4">
                Don't have an account?{" "}
                <Link to="/register" className="font-medium text-primary hover:underline">
                  Create an account
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DemoLogin;