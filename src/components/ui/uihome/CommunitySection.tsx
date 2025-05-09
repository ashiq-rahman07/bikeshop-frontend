import { Link } from "react-router-dom";
import { MapPin, TrendingUp, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import prmotor from "../../../assets/bike/road/herobg.jpg"

const CommunitySection = () => {
  return (
    <section className="py-20 bg-[url('https://www.saint.cc/cdn/shop/articles/cover-photo_bd317a7b-d619-43f5-8952-9f561f8ca126.jpg?v=1689765998')] bg-cover bg-center relative">
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Join Our Riding Community</h2>
          <p className="text-white/80 max-w-2xl mx-auto">Connect with fellow riders, share your experiences, and participate in exclusive events.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 text-white border border-white/20">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-center mb-4">Group Rides</h3>
            <p className="text-white/80 text-center">Weekly organized rides exploring scenic routes with experienced guides.</p>
            <div className="mt-6 text-center">
              <Link to="/community">
                <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 px-4 py-3 text-lg font-semibold" >Learn More</Button>
              </Link>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 text-white border border-white/20">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-center mb-4">Skills Workshops</h3>
            <p className="text-white/80 text-center">Improve your riding technique with our certified instructors in a safe environment.</p>
            <div className="mt-6 text-center">
              <Link to="/workshops">
              <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 px-4 py-3 text-lg font-semibold" >Learn More</Button>
              </Link>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 text-white border border-white/20">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageSquare className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-center mb-4">Forums & Events</h3>
            <p className="text-white/80 text-center">Share your passion, stories, and technical knowledge with our global community.</p>
            <div className="mt-6 text-center">
              <Link to="/events">
              <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 px-4 py-3 text-lg font-semibold" >Learn More</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;