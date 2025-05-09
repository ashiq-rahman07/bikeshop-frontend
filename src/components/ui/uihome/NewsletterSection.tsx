import { Button } from "@/components/ui/button";
import Banner from '../../../assets/bike/electrical/bannerbike.jpg';
const NewsletterSection = () => {
  const BannerImg = {
    backgroundImage: `url(${Banner})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '250px',
    width: '100%',
  };
  return (
    <section className="py-16 bg-gray-900 text-white " style={BannerImg}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center md:justify-between">
          <div className="mb-8 md:mb-0 md:max-w-lg">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Join Our Newsletter</h2>
            <p className="text-gray-300">Subscribe to get exclusive updates, offers, and motorcycle news delivered straight to your inbox.</p>
          </div>
          
          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="px-4 py-3 rounded-md bg-white/30 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white transition-all duration-300">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;