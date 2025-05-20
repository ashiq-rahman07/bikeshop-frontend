import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Bike, Search, Plus, Edit, Trash } from "lucide-react";
import { toast } from "sonner";
import DashboardLayout from "@/components/newDashboard/DashboardLayout";
import { useDeleteBikeMutation, useGetAllProductsQuery } from "@/redux/features/products/productsApi";
import { TResponse } from "@/types/global";

const BikesManagement = () => {
  const navigate = useNavigate()
    const { data:bikesData, isLoading,refetch } = useGetAllProductsQuery(undefined);
    const [deleteBike] = useDeleteBikeMutation();
    
    const allBikes = bikesData?.data || [];
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter only bikes (not gear)
  const bikes = allBikes.filter(product => 
    (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
     product.model.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const handleDelete = async(bikeId: string) => {
  try {
      const confirm = window.confirm(
        'Are you sure? This will delete  this bike all details and admin data also.'
      );
      if (!confirm) return;
      const {data} = await deleteBike(bikeId);
      console.log(data)
      if (data.success as boolean) {
        toast.success('Bike are Deleted Successfully');
        refetch()
      
      }
    } catch (error) {
      toast.error('Can Not Deleted This Bike')
      console.log(error);
    }
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              <Bike className="mr-2 h-6 w-6" />
              Bike Management
            </h1>
            <p className="text-gray-500">Manage your motorcycle inventory</p>
          </div>
          <Button asChild className="mt-4 md:mt-0">
            <Link to="/admin/add-bike">
              <Plus className="mr-2 h-4 w-4" /> Add New Bike
            </Link>
          </Button>
        </div>
        
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search bikes..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Model</TableHead>
                <TableHead className="hidden md:table-cell">Price</TableHead>
                <TableHead className="hidden md:table-cell">Stock</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bikes.length > 0 ? (
                bikes.map(bike => (
                  <TableRow key={bike._id}>
                    <TableCell>
                      <img 
                        src={bike.images[0]} 
                        alt={bike.name} 
                        className="h-12 w-16 object-cover rounded"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{bike.name}</TableCell>
                    <TableCell>{bike.brand}</TableCell>
                    <TableCell>{bike.model}</TableCell>
                    <TableCell className="hidden md:table-cell">${bike.price.toLocaleString()}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        bike.stock > 10 ? "bg-green-100 text-green-800" :
                        bike.stock > 0 ? "bg-yellow-100 text-yellow-800" :
                        "bg-red-100 text-red-800"
                      }`}>
                        {bike.stock}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="ghost">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-red-500 hover:text-red-600"
                          onClick={() => handleDelete(bike._id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No bikes found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BikesManagement;