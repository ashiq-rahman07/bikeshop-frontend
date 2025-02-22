import FeatureProducts from '../ui/uihome/FeatureProducts';
import Hero from '../ui/uihome/Hero';
import Subscribe from '../ui/uihome/Subscribe';
import Testimonials from '../ui/uihome/Testimonials';
import { Helmet } from 'react-helmet';
const Home = () => {
  return (
    <>
    <Helmet>
    <title>Home - Classic Riders</title>
        <meta name="description" content="Welcome to the home page of Classic Riders" />

    </Helmet>
    
      <Hero />
      <FeatureProducts />
      <Subscribe />
      <Testimonials />
    
    </>
  );
};

export default Home;
