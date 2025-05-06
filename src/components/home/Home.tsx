import CategorySection from '../ui/uihome/CategorySection';
import FeaturedProducts from '../ui/uihome/FeaturedProducts';
import FeatureProducts from '../ui/uihome/FeatureProducts';
import Hero from '../ui/uihome/Hero';
import HeroSection from '../ui/uihome/HeroSection';
import Subscribe from '../ui/uihome/Subscribe';
import Testimonials from '../ui/uihome/Testimonials';
import { Helmet } from 'react-helmet';
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
<HeroSection/>
      {/* <Hero /> */}
    <CategorySection/>
    <FeaturedProducts/>
      {/* <FeatureProducts /> */}
      <Subscribe />
      <Testimonials />
    </>
  );
};

export default Home;
