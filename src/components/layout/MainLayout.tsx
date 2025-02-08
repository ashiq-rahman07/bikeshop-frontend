import { Outlet } from 'react-router-dom';

import Footer from '../footer/Footer';
import Navbar from '../ui/navbar/Navbar';


const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar/>
      <main className="flex-grow">
        <Outlet /> {/* This will render the child routes */}
      </main>
      <Footer/>
    </div>
  );
};

export default MainLayout;