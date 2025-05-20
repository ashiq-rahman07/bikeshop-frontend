import CategorySection from '../ui/uihome/CategorySection';
import CommunitySection from '../ui/uihome/CommunitySection';
import FeaturedProducts from '../ui/uihome/FeaturedProducts';

import FeaturesSection from '../ui/uihome/FeaturesSection';

import MaintenanceSection from '../ui/uihome/MaintenanceSection';
import RidingGearSection from '../ui/uihome/RidingGearSection';

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

<Hero2 />

<FeaturesSection />
      
    <CategorySection/>
    <FeaturedProducts/>
    
        <RidingGearSection />
      
      <CommunitySection />

       <MaintenanceSection />

     <TestimonialsSection />
      

      <NewsletterSection />
    </>
  );
};

export default Home;
