import { Outlet } from 'react-router-dom';

import Footer from '../footer/Footer';
import Navbar from '../ui/navbar/Nav';


const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar/>
      {/* <Navbar /> */}
      <main className="flex-grow pt-[6rem]">
        <Outlet /> {/* This will render the child routes */}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
