import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Phone, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Top section with newsletter and contact */}
    
      
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2">
            <Link to="/" className="inline-block mb-6">
              <span className="text-3xl font-montserrat font-bold bg-gradient-to-r from-primary to-white bg-clip-text text-transparent">
                VelocityVibe
              </span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-xs">
              Premium motorcycles and gear for enthusiasts who demand the best experience on two wheels.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-white/10 hover:bg-white/20 transition-colors p-2 rounded-full">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-white/20 transition-colors p-2 rounded-full">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-white/20 transition-colors p-2 rounded-full">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-white/20 transition-colors p-2 rounded-full">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white transition-colors">
                  All Motorcycles
                </Link>
              </li>
              <li>
                <Link to="/products?category=Sport" className="text-gray-400 hover:text-white transition-colors">
                  Sport Bikes
                </Link>
              </li>
              <li>
                <Link to="/products?category=Cruiser" className="text-gray-400 hover:text-white transition-colors">
                  Cruisers
                </Link>
              </li>
              <li>
                <Link to="/products?category=Adventure" className="text-gray-400 hover:text-white transition-colors">
                  Adventure Bikes
                </Link>
              </li>
              <li>
                <Link to="/riding-gear" className="text-gray-400 hover:text-white transition-colors">
                  Riding Gear
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                  News & Events
                </Link>
              </li>
              <li>
                <Link to="/financing" className="text-gray-400 hover:text-white transition-colors">
                  Financing
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                  Sustainability
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                  Warranty Info
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                  Service Centers
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                  Maintenance Tips
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Bottom section */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} VelocityVibe. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="#" className="hover:text-white transition-colors">Cookie Policy</Link>
            <Link to="#" className="hover:text-white transition-colors">Accessibility</Link>
          </div>
        </div>
        
        <div className="bg-black/50 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-gray-500">
            <p>All product names, logos, and brands are property of their respective owners. All company, product, and service names are for identification purposes only.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;