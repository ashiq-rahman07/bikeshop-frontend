import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import prmotor from "../../../assets/bike/road/herobg.jpg"

const Hero2 = () => {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white pt-28 pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=2070')] bg-cover bg-center opacity-20"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Experience the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Ultimate Ride</span> with VelocityVibe
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 max-w-lg">
              Premium motorcycles engineered for performance, style, and the freedom of the open road.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/products">
                <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-8 py-6 text-lg font-semibold transition-all duration-300">
                  Explore Bikes
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          
          {/* <div className="relative animate-fade-in">
            <img 
              src={prmotor}
              alt="Premium Motorcycle" 
              className="rounded-lg shadow-2xl transform hover:scale-[1.02] transition-transform duration-500"
            />
            <div className="absolute -bottom-6 -right-6 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg">
              <div className="flex items-center space-x-2">
                <span className="text-3xl font-bold text-gray-900">$12,999</span>
                <span className="text-sm text-gray-500 line-through">$14,500</span>
              </div>
              <div className="text-primary font-medium">Limited Time Offer</div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Hero2;