import { Bike, Gauge, Shield, Award } from "lucide-react";

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose VelocityVibe</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">We're committed to providing the best motorcycles with unmatched quality, performance, and customer service.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Bike className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Premium Selection</h3>
            <p className="text-gray-600">Handpicked premium motorcycles from the world's leading manufacturers.</p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Gauge className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Performance Tested</h3>
            <p className="text-gray-600">Every bike is rigorously tested to ensure peak performance and reliability.</p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Warranty Protected</h3>
            <p className="text-gray-600">Comprehensive warranty coverage for peace of mind with every purchase.</p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Award className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Expert Support</h3>
            <p className="text-gray-600">Our team of motorcycle enthusiasts is always ready to help you.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;