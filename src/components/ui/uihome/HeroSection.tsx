import { Link } from "react-router-dom"
import { Button } from "../button"
import herobg from "../../../assets/bike/road/herobg.jpg"

const HeroSection = () => {
  return (
    <section className="relative h-screen overflow-hidden font-montserrat">
      {/* Background Image + Overlay */}
      <div className="absolute inset-0">
        <img
          src={herobg}
          alt="Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="max-w-2xl text-left">
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-md animate-fade-in">
            Ride Beyond Limits
          </h1>
          <p
            className="mt-6 text-lg sm:text-xl text-gray-300 animate-fade-in"
            style={{ animationDelay: '0.2s' }}
          >
            Experience the thrill of power and precision with our premium selection of motorcycles.
          </p>
          <div
            className="mt-8 flex flex-wrap gap-4 animate-fade-in"
            style={{ animationDelay: '0.4s' }}
          >
            <Link to="/products">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary text-white shadow-lg hover:opacity-90 transition"
              >
                Explore Bikes
              </Button>
            </Link>
            <Link to="/about">
              <Button
                size="lg"
                variant={"outline"}
                className="text-white bg-transparent border-white hover:bg-white/50 transition"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};


export default HeroSection