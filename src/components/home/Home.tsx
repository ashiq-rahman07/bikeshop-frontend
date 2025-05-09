import CategorySection from '../ui/uihome/CategorySection';
import CommunitySection from '../ui/uihome/CommunitySection';
import FeaturedProducts from '../ui/uihome/FeaturedProducts';
import FeatureProducts from '../ui/uihome/FeatureProducts';
import FeaturesSection from '../ui/uihome/FeaturesSection';
import Hero from '../ui/uihome/Hero';
import HeroSection from '../ui/uihome/HeroSection';
import MaintenanceSection from '../ui/uihome/MaintenanceSection';
import RidingGearSection from '../ui/uihome/RidingGearSection';
import Subscribe from '../ui/uihome/Subscribe';
import Testimonials from '../ui/uihome/Testimonials';
import { Helmet } from 'react-helmet';
import TestimonialsSection from '../ui/uihome/TestimonialsSection';
import NewsletterSection from '../ui/uihome/NewsletterSection';
import Hero2 from '../ui/uihome/Hero2';
const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home - Classic Riders</title>
        <meta
          name="description"
          content="Welcome to the home page of Classic Riders"
        />
      </Helmet>
{/* <HeroSection/> */}
<Hero2 />
{/* Features Section */}
<FeaturesSection />
      
    <CategorySection/>
    <FeaturedProducts/>
      {/* <FeatureProducts /> */}
        {/* NEW: Riding Gear Section */}
        <RidingGearSection />
         {/* NEW: Riding Community Section */}
      <CommunitySection />
       {/* NEW: Maintenance Services Section */}
       <MaintenanceSection />
      
     {/* Testimonials Section */}
     <TestimonialsSection />
      
      {/* Newsletter Section */}
      <NewsletterSection />
    </>
  );
};

export default Home;
