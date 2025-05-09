import { Star } from "lucide-react";

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Riders Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Hear from motorcycle enthusiasts who have experienced the VelocityVibe difference.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              
              <blockquote className="text-gray-700 mb-6">
                "VelocityVibe delivered an exceptional experience from start to finish. The selection process was smooth, and the motorcycle exceeded my expectations. Their customer service is unmatched!"
              </blockquote>
              
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-gray-200 mr-4"></div>
                <div>
                  <p className="font-semibold">John Doe</p>
                  <p className="text-sm text-gray-500">Proud owner of Streetfighter V4</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;