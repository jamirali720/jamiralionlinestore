import Carousel from "../components/heroSection/Carousel";

import Footer from "./Footer";
import Navbar from "./Navbar";
import { Outlet, useLocation } from "react-router-dom";

const MainLayout = () => {
  const location = useLocation();

  return (
    <div className="w-screen md:w-full">
      <Navbar />
      {location.pathname === "/" && <Carousel />}
      <main>
        
        <section>
          <Outlet />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
