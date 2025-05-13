import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import DashboardLayout from "@/components/newDashboard/DashboardLayout";

// Form schema with validation
const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  brand: z.string().min(1, "Brand is required"),
  model: z.string().min(1, "Type/Model is required"),
  price: z.coerce.number().positive("Price must be positive"),
  originalPrice: z.coerce.number().positive("Original price must be positive").optional(),
  description: z.string().min(10, "Description must be at least 10 characters"),
  stock: z.coerce.number().int().min(0, "Stock cannot be negative"),
  gearType: z.string().min(1, "Gear type is required"),
  features: z.string().min(1, "Features are required"),
});

type FormValues = z.infer<typeof formSchema>;

const AddGear = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      brand: "",
      model: "",
      price: undefined,
      originalPrice: undefined,
      description: "",
      stock: 0,
      gearType: "",
      features: "",
    },
  });
  
  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // In a real app, you would send the data to your backend
      console.log("Submitted gear data:", values);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Gear added successfully!");
      navigate("/admin/gear");
    } catch (error) {
      console.error("Error adding gear:", error);
      toast.error("Failed to add gear. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Add New Riding Gear</h1>
          <p className="text-gray-500">Create a new riding gear listing</p>
        </div>
        
        <Separator />
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter gear name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="brand"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Brand</FormLabel>
                      <FormControl>
                        <Input placeholder="Brand name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="model"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type/Model</FormLabel>
                      <FormControl>
                        <Input placeholder="Type or model" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price ($)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0.00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="originalPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Original Price ($) (Optional)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0.00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock Quantity</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="gearType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gear Type</FormLabel>
                    <FormControl>
                      <Input placeholder="Helmet, Jacket, Gloves, etc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="col-span-full">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Detailed description of the gear"
                        className="min-h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="features"
                render={({ field }) => (
                  <FormItem className="col-span-full">
                    <FormLabel>Features (Comma separated)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Weatherproof, Adjustable fit, Protective padding..."
                        className="min-h-20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Image Upload would go here in a real app */}
              <div className="col-span-full">
                <FormLabel>Images</FormLabel>
                <div className="mt-2 flex items-center justify-center border-2 border-dashed border-gray-300 p-6 rounded-lg">
                  <div className="space-y-1 text-center">
                    <p className="text-sm text-gray-500">
                      Drag and drop image files or click to upload
                    </p>
                    <p className="text-xs text-gray-500">
                      (Image upload functionality would be implemented in a real app)
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate("/admin/gear")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Adding..." : "Add Gear"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </DashboardLayout>
  );
};

export default AddGear;