
import { useState } from "react";
import { Link } from "react-router-dom";


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Edit, Trash, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import DashboardLayout from "@/components/newDashboard/DashboardLayout";

import { useGetAllGearsQuery } from "@/redux/features/gears/gearsApi";

const AdminGear = () => {
    const { data:gearsData, isLoading } = useGetAllGearsQuery(undefined);
         
       
         const gears = gearsData?.data || [];
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter only gear products
  const gear = gears.filter(product => 
   
    (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     product.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const handleDelete = (id: string) => {
    // In a real app, you would call an API to delete the gear
    toast.success(`Gear item with ID ${id} would be deleted in a real app`);
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              <ShoppingBag className="mr-2 h-6 w-6" />
              Riding Gear Management
            </h1>
            <p className="text-gray-500">Manage your riding gear inventory</p>
          </div>
          <Button asChild className="mt-4 md:mt-0">
            <Link to="/admin/gear/add">
              <Plus className="mr-2 h-4 w-4" /> Add New Gear
            </Link>
          </Button>
        </div>
        
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search gear..."
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
                <TableHead className="hidden md:table-cell">Category</TableHead>
                <TableHead className="hidden md:table-cell">Price</TableHead>
                <TableHead className="hidden md:table-cell">Stock</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {gear.length > 0 ? (
                gear.map(item => (
                  <TableRow key={item._id}>
                    <TableCell>
                      <img 
                        src={item.images[0]} 
                        alt={item.name} 
                        className="h-12 w-16 object-cover rounded"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.brand}</TableCell>
                    <TableCell className="hidden md:table-cell">{item.model}</TableCell>
                    <TableCell className="hidden md:table-cell">${item.price.toLocaleString()}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        item.stock > 10 ? "bg-green-100 text-green-800" :
                        item.stock > 0 ? "bg-yellow-100 text-yellow-800" :
                        "bg-red-100 text-red-800"
                      }`}>
                        {item.stock}
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
                          onClick={() => handleDelete(item._id)}
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
                    No gear items found
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

export default AdminGear;