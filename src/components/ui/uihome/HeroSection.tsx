

const HeroSection = () => {
  return (
    <section className="hero-section relative">
    <div className="absolute inset-0 overflow-hidden">
      <img 
        src="https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=1600&h=800&fit=crop" 
        alt="Hero" 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
    </div>
    
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-48">
      <div className="max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold text-white animate-fade-in">
          Ride Beyond Limits
        </h1>
        <p className="mt-4 text-xl text-gray-200 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Experience the thrill of power and precision with our premium selection of motorcycles.
        </p>
        <div className="mt-8 flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <Link to="/products">
            <Button size="lg">
              Explore Bikes
            </Button>
          </Link>
          <Link to="/about">
            <Button variant="outline" size="lg" className="bg-white/10 text-white border-white hover:bg-white/20">
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </div>
  </section>
  )
}

export default HeroSection