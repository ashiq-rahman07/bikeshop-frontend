import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const MaintenanceSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Professional Maintenance Services</h2>
            <p className="text-gray-600 mb-8">Keep your motorcycle running at peak performance with our certified technicians and state-of-the-art service center.</p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-semibold">✓</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold">Scheduled Maintenance</h3>
                  <p className="text-gray-600">Regular maintenance to ensure your motorcycle's longevity and performance.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-semibold">✓</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold">Performance Upgrades</h3>
                  <p className="text-gray-600">Custom modifications and upgrades to enhance your riding experience.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-semibold">✓</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold">Diagnostic Services</h3>
                  <p className="text-gray-600">Advanced diagnostics to identify and resolve issues quickly and accurately.</p>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <Link to="/services">
                <Button className="bg-primary hover:bg-primary/90 text-white">Book a Service</Button>
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1625047509248-ec889cbff17f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Motorcycle Maintenance" 
              className="rounded-lg shadow-lg"
            />
            <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-lg shadow-xl">
              <div className="flex items-center">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <span className="ml-2 font-semibold text-gray-800">4.9/5</span>
              </div>
              <p className="text-gray-600 text-sm">Based on 300+ service reviews</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MaintenanceSection;