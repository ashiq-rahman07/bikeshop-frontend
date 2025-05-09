import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const RidingGearSection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Premium Riding Gear</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Equip yourself with the best gear for safety, comfort, and style on your two-wheeled adventures.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group">
            <div className="h-64 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1552568283-2667b8e8d9a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Motorcycle Helmets" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Premium Helmets</h3>
              <p className="text-gray-600 mb-4">DOT-certified helmets combining safety and style for the ultimate protection.</p>
              <Link to="/products?category=gear" className="text-primary hover:text-primary/80 font-medium inline-flex items-center">
                Shop Helmets <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
          
          <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group">
            <div className="h-64 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1591534446793-0c4a1cb186a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Motorcycle Jackets" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Riding Jackets</h3>
              <p className="text-gray-600 mb-4">All-weather protection with reinforced impact zones and maximum comfort.</p>
              <Link to="/products?category=gear" className="text-primary hover:text-primary/80 font-medium inline-flex items-center">
                Shop Jackets <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
          
          <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group">
            <div className="h-64 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1603312568312-cfce4f6f8549?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Motorcycle Gloves" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Performance Gloves</h3>
              <p className="text-gray-600 mb-4">Precision-engineered for grip, protection, and control in all conditions.</p>
              <Link to="/products?category=gear" className="text-primary hover:text-primary/80 font-medium inline-flex items-center">
                Shop Gloves <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <Link to="/products?category=gear">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">View All Riding Gear</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RidingGearSection;