import { Bike, ChevronRight, Shield, Tag } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'

const GearHero = () => {
  return (
    <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800 z-10"></div>
        
        {/* Hero Background Image Grid */}
       <div className="absolute inset-0 grid grid-cols-3 opacity-30 z-10">
        <div style={{ backgroundImage: "url('https://images.unsplash.com/photo-1609873814058-a8928924184a?auto=format&fit=crop&w=800&q=80')" }} className="bg-cover bg-center"></div>

          <div style={{ backgroundImage: "url('https://i.ebayimg.com/images/g/wVQAAOSwE1pmPhop/s-l400.jpg')" }} className=" bg-cover bg-center"></div>

          <div  style={{ backgroundImage:"url('https://s.alicdn.com/@sc04/kf/Hd7e0749a50ca41bcac3c060857075112J.jpg_720x720q50.jpg')" }} className=" bg-cover bg-center"></div>
      </div>

        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Premium Riding Gear</h1>
              <p className="text-xl text-gray-300 mb-8 max-w-xl">
                Equip yourself with top-tier safety gear for maximum protection, all-day comfort, and unmatched style on your two-wheeled adventures.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Shop All Gear
                </Button>
                <Button variant="outline" size="lg" className="border-white bg-transparent text-white hover:bg-white/10">
                  View Safety Ratings
                </Button>
              </div>
              
              <div className="mt-12 flex items-center gap-8">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-white">CE Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-white">DOT Approved</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <Bike className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-white">Rider Tested</span>
                </div>
              </div>
            </div>
            
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute -top-8 -left-8 w-64 h-64 bg-gradient-to-br from-primary/40 to-secondary/40 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-12 -right-12 w-80 h-80 bg-gradient-to-tr from-primary/30 to-secondary/30 rounded-full blur-3xl"></div>
                
                <div className="relative bg-white/10 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border border-white/20 hover-scale">
                  <img 
                    src="https://c02.purpledshub.com/uploads/sites/39/2019/09/Fox-Rampage-Pro-Carbon-full-face-01-86c1e36.jpg?w=1029&webp=1" 
                    alt="Premium Motorcycle Helmet" 
                    className="w-full h-auto rounded-lg"
                  />
                  
                  <div className="mt-6 flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-bold text-white">Pro Carbon Helmet</h3>
                      <p className="text-gray-300">Premium Protection</p>
                    </div>
                    <div className="bg-primary/90 text-white px-4 py-2 rounded-full">
                      $599.99
                    </div>
                  </div>
                  
                  <Link to="/riding-gear/g1" className="mt-4 flex items-center text-primary hover:text-primary/80">
                    View Details <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            {["Helmets", "Jackets", "Gloves", "Boots"].map((category, index) => (
              <div 
                key={category}
                className="group bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                  {index === 0 && <Shield className="h-6 w-6 text-primary" />}
                  {index === 1 && <Shield className="h-6 w-6 text-primary" />}
                  {index === 2 && <Bike className="h-6 w-6 text-primary" />}
                  {index === 3 && <Tag className="h-6 w-6 text-primary" />}
                </div>
                <h3 className="text-lg font-medium text-white mb-1">{category}</h3>
                <p className="text-sm text-gray-400">Premium Quality</p>
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}

export default GearHero