import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  FieldValues,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";



import { Plus } from "lucide-react";


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


import { toast } from "sonner";
import NMImageUploader from "./ui/NMImageUploader";
import ImagePreviewer from "./ui/ImagePreviewer";
import DashboardLayout from "../newDashboard/DashboardLayout";
import { useAddProductMutation } from "@/redux/features/products/productsApi";
import { useAddGearMutation } from "@/redux/features/gears/gearsApi";
import { TResponse } from "@/types/global";
import { IGear } from "@/types/gear";
import { useNavigate } from "react-router-dom";

export default function AddGearsForm() {
  const navigate = useNavigate()
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);

const gearCategories = [
  'Helmet',
  'Gloves',
  'Jacket',
  'Boots',
  'Protection',
  'Accessories',
  'Rain Gear',
  'Electronics'
]
const gearBrand = [
  'RideTalk',
  'ThermoTech',
  'AdventureGear',
  'RideReady',
  'RoadMaster',
  'RaceTech',
  'SafeRide'
]


  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      category: "",
      brand: "",
      stock: "",
      model:"",
      features: [{ value: "" }],
      specifications: [{ key: "", value: "" }],
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

 


const [addGear, { isLoading }] = useAddGearMutation();
  const { append: appendFeatures, fields: featureFields } = useFieldArray({
    control: form.control,
    name: "features",
  });

  const addFeatures = () => {
    appendFeatures({ value: "" });
  };

  const { append: appendSpec, fields: specFields } = useFieldArray({
    control: form.control,
    name: "specifications",
  });

  const addSpec = () => {
    appendSpec({ key: "", value: "" });
  };

  // console.log(specFields);

//   useEffect(() => {
//     const fetchData = async () => {
//       const [categoriesData, brandsData] = await Promise.all([
//         getAllCategories(),
//         getAllBrands(),
//       ]);

//       setCategories(categoriesData?.data);
//       setBrands(brandsData?.data);
//     };

//     fetchData();
//   }, []);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
   

    const features = data.features.map(
      (feature: { value: string }) => feature.value
    );

    const specifications: { [key: string]: string } = {};
    data.specifications.forEach(
      (item: { key: string; value: string }) =>
        (specifications[item.key] = item.value)
    );

    // console.log({ availableColors, keyFeatures, specification });

    const modifiedData = {
      ...data,
    
      features,
      specifications,
      price: parseFloat(data.price),
      stock: parseInt(data.stock),
    
    };
console.log(modifiedData)
    const formData = new FormData();
    formData.append("data", JSON.stringify(modifiedData));

    for (const file of imageFiles) {
      formData.append("images", file);
    }
   
    try {
      const{ data} = await addGear(formData);

      console.log(data)
      if (data.success as boolean) {
        toast.success("Gear Add Successfully");
        navigate("/admin/gears-management");
      } else {
        toast.error("Can Not Add Gear");
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
<DashboardLayout>
        <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-6xl p-5 ">
      <div className="flex items-center space-x-4 mb-5 ">
        {/* <Logo /> */}

        <h1 className="text-xl font-bold">Add Gear</h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex justify-between items-center border-t border-b py-3 my-5">
            <p className="text-primary font-bold text-xl">Basic Information</p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gear Name</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
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
                  <FormLabel>Gear Model</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
           

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Product Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {gearCategories.map((category,idx) => (
                        <SelectItem key={idx} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

           
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Product Brand" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {gearBrand.map((brand,idx) => (
                        <SelectItem key={idx} value={brand}>
                          {brand}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
         
          </div>
          <div>
            <div className="flex justify-between items-center border-t border-b py-3 my-5">
              <p className="text-primary font-bold text-xl">Gear Features</p>
              <Button
                onClick={addFeatures}
                variant="outline"
                className="size-10"
                type="button"
              >
                <Plus className="text-primary" />
              </Button>
            </div>

            <div className="my-5">
              {featureFields.map((featureField, index) => (
                <div key={featureField.id}>
                  <FormField
                    control={form.control}
                    name={`features.${index}.value`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Key Feature {index + 1}</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value || ""} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center border-t border-b py-3 my-5">
              <p className="text-primary font-bold text-xl">Specification</p>
              <Button
                onClick={addSpec}
                variant="outline"
                className="size-10"
                type="button"
              >
                <Plus className="text-primary" />
              </Button>
            </div>

            {specFields.map((specField, index) => (
              <div
                key={specField.id}
                className="grid grid-cols-1 gap-4 md:grid-cols-2 my-5"
              >
                <FormField
                  control={form.control}
                  name={`specifications.${index}.key`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Feature name {index + 1}</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`specifications.${index}.value`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Feature Description {index + 1}</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </div>
          <div>
            <div className="flex justify-between items-center border-t border-b py-3 my-5">
              <p className="text-primary font-bold text-xl">Images</p>
            </div>
            <div className="flex gap-4 ">
              <NMImageUploader
                setImageFiles={setImageFiles}
                setImagePreview={setImagePreview}
                label="Upload Image"
                className="w-fit mt-0"
              />
              <ImagePreviewer
                className="flex flex-wrap gap-4"
                setImageFiles={setImageFiles}
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
              />
            </div>
          </div>
          <div className="my-5">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-36 resize-none"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="mt-5 w-full" disabled={isSubmitting}>
            {isSubmitting ? "Adding Gears....." : "Add Gear"}
          </Button>
        </form>
      </Form>
    </div>
</DashboardLayout>
  );
}