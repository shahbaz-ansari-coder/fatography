import "./App.css";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from "./pages/user/Home";
import Login from "./pages/admin/Login";
import AdminLayout from "./components/admin/AdminLayout";
import Overview from "./pages/admin/Overview";
import CelebrityManagement from "./pages/admin/CelebrityManagement";
import ReviewsManager from "./pages/admin/ReviewsManager";
import ActorShoot from "./pages/user/ActorShoot";
import SliderManager from "./pages/admin/SliderManager";
import ShootImagesManager from "./pages/admin/ShootimagesManager";
import AccountSettings from "./pages/admin/AccountSettings";
import ServicesManagement from "./pages/admin/ServicesManagement";
import ServicesPage from "./pages/user/ServicesPage";
import ContactPage from "./pages/user/Contact";
import Preloader from "./components/home/Preloader";
import TestimonialsPage from "./pages/user/TestimonialsPage";
import AllServicesPage from "./pages/user/AllServicesPage";
import CelebrityShootsPage from "./pages/user/CelebrityShootsPage";
import AboutPage from "./pages/user/AboutPage";

import ServicePage from "./pages/user/Service";
import PreWedding from "./pages/user/PreWedding";
import WeddingEvent from "./pages/user/WeddingEvent";
import FoodVideography from "./pages/user/FoodVideography";
import RouterWrapper from "./components/home/RouterWrapper";
import FashionServices from "./pages/user/FashionPhotography";
import WeddingEventsServices from "./pages/user/WeddingEventsServices";
import FoodPhotographyServices from "./pages/user/FoodPhotographyServices";
import BlackAndWhiteServices from "./pages/user/Black&WhiteServices";
import MaternityPhotographyServices from "./pages/user/MaternityPhotographyServices";
import ProductPhotographySevices from "./pages/user/ProductPhotographySevices";
import EventCoverageServices from "./pages/user/EventCoverageServices";
import RealEstateServices from "./pages/user/RealEstateServices";
import NeonPhotographyServices from "./pages/user/NeonPhotographyServices";
import CorporateAndLinkedinServices from "./pages/user/CorporateAndLinkedinServices";
import FitnessPhotographyServices from "./pages/user/FitnessPhotographyServices";
import RetouchingGuideServices from "./pages/user/RetouchingGuideServices";
import PreWeddingShootsServices from "./pages/user/PreWeddingShootsServices";
import LifestylePhotographyServices from "./pages/user/LifestylePhotographyServices";
import FamilyPhotographyServices from "./pages/user/FamilyPhotographyServices";
import CengizCoskunShoot from "./pages/user/CengizCoskunShoot";
import BilalAbbasKhanShoot from "./pages/user/BilalAbbasKhanShoot";
import ShehzadRoyShoot from "./pages/user/ShehzadRoyShoot";
import MominaMustehsanShoot from "./pages/user/MominaMustehsanShoot";
import FarhanSaeedShoot from "./pages/user/FarhanSaeedShoot";
import SadiaKhanShoot from "./pages/user/SadiaKhanShoot";
import EbraheemAlSamadiShoot from "./pages/user/EbraheemAlSamadiShoot";
import AhsanKhanShoot from "./pages/user/AhsanKhanShoot";
import MikaalZulfiqarShoot from "./pages/user/MikaalZulfiqarShoot";
import AzekahDanielShoot from "./pages/user/AzekahDanielShoot";
import SalmanSaeedShoot from "./pages/user/SalmanSaeedShoot";
import HareemFarooqShoot from "./pages/user/HareemFarooqShoot";
import SaadQureshiShoot from "./pages/user/SaadQureshiShoot";
import UsmanMukhtarShoot from "./pages/user/UsmanMukhtarShoot";
import MiraSethiShoot from "./pages/user/MiraSethiShoot";
import MaryamNafeesShoot from "./pages/user/MaryamNafeesShoot";
import RababHashimShoot from "./pages/user/RababHashimShoot";
import Blogs from "./pages/user/Blogs";
import FatographyBlog from "./pages/user/FatographyBlog";

function App() {
  const router = createBrowserRouter([
    {
      element: <RouterWrapper />,
      children: [
        // Web Pages
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/about-us",
          element: <AboutPage />,
        },
        {
          path: "/services",
          element: <AllServicesPage />,
        },
        {
          path: "/celebrity-shoots",
          element: <CelebrityShootsPage />,
        },
        {
          path: "/testimonials",
          element: <TestimonialsPage />,
        },
        {
          path: "/contact-us",
          element: <ContactPage />,
        },
        // videography Pages
        {
          path: "/videography/food-videography",
          element: <FoodVideography />,
        },

        {
          path: "/videography/pre-wedding",
          element: <PreWedding />,
        },
        {
          path: "/videography/wedding-events",
          element: <WeddingEvent />,
        },
        {
          path: "/blog",
          element: <Blogs />,
        },
        {
          path: "/blog/welcome-to-fatography",
          element: <FatographyBlog />,
        },

        // Services Pages
        // Slider Type
        {
          path: "/services/pre-wedding-shoots",
          element: <PreWeddingShootsServices />,
        },
        {
          path: "/services/lifestyle-photography",
          element: <LifestylePhotographyServices />,
        },
        {
          path: "/services/family-photography",
          element: <FamilyPhotographyServices />,
        },
        // Gallery Type
        {
          path: "/services/wedding-events",
          element: <WeddingEventsServices />,
        },
        {
          path: "/services/fashion-photography",
          element: <FashionServices />,
        },
        {
          path: "/services/food-photography",
          element: <FoodPhotographyServices />,
        },
        {
          path: "/services/black-&-white",
          element: <BlackAndWhiteServices />,
        },
        {
          path: "/services/maternity-photography",
          element: <MaternityPhotographyServices />,
        },
        {
          path: "/services/product-photography",
          element: <ProductPhotographySevices />,
        },
        {
          path: "/services/event-coverage",
          element: <EventCoverageServices />,
        },
        {
          path: "/services/real-estate",
          element: <RealEstateServices />,
        },
        {
          path: "/services/neon-photography",
          element: <NeonPhotographyServices />,
        },
        {
          path: "/services/corporate-&-linkedin",
          element: <CorporateAndLinkedinServices />,
        },
        {
          path: "/services/fitness-photography",
          element: <FitnessPhotographyServices />,
        },
        {
          path: "/services/retouching-guide",
          element: <RetouchingGuideServices />,
        },
        // Celebrity Shoots
        {
          path: "/celebrity-shoots/cengiz-coşkun",
          element: <CengizCoskunShoot />,
        },
        {
          path: "/celebrity-shoots/bilal-abbas-khan",
          element: <BilalAbbasKhanShoot />,
        },
        {
          path: "/celebrity-shoots/shehzad-roy",
          element: <ShehzadRoyShoot />,
        },
        {
          path: "/celebrity-shoots/momina-mustehsan",
          element: <MominaMustehsanShoot />,
        },
        {
          path: "/celebrity-shoots/farhan-saeed",
          element: <FarhanSaeedShoot />,
        },
        {
          path: "/celebrity-shoots/sadia-khan",
          element: <SadiaKhanShoot />,
        },
        {
          path: "/celebrity-shoots/ebraheem-al-samadi",
          element: <EbraheemAlSamadiShoot />,
        },
        {
          path: "/celebrity-shoots/ahsan-khan",
          element: <AhsanKhanShoot />,
        },
        {
          path: "/celebrity-shoots/mikaal-zulfiqar",
          element: <MikaalZulfiqarShoot />,
        },
        {
          path: "/celebrity-shoots/azekah-daniel",
          element: <AzekahDanielShoot />,
        },
        {
          path: "/celebrity-shoots/salman-saeed",
          element: <SalmanSaeedShoot />,
        },
        {
          path: "/celebrity-shoots/hareem-farooq",
          element: <HareemFarooqShoot />,
        },
        {
          path: "/celebrity-shoots/saad-qureshi",
          element: <SaadQureshiShoot />,
        },
        {
          path: "/celebrity-shoots/usman-mukhtar",
          element: <UsmanMukhtarShoot />,
        },
        {
          path: "/celebrity-shoots/mira-sethi",
          element: <MiraSethiShoot />,
        },
        {
          path: "/celebrity-shoots/maryam-nafees",
          element: <MaryamNafeesShoot />,
        },
        {
          path: "/celebrity-shoots/rabab-hashim",
          element: <RababHashimShoot />,
        },
      ],
    },

    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path: "dashboard",
          element: <Overview />,
        },
        {
          path: "celebrity-shoots",
          element: <CelebrityManagement />,
        },
        {
          path: "sliders",
          element: <SliderManager />,
        },
        {
          path: "testimonials",
          element: <ReviewsManager />,
        },
        {
          path: "new-post",
          element: <ShootImagesManager />,
        },
        {
          path: "account-settings",
          element: <AccountSettings />,
        },
        {
          path: "services",
          element: <ServicesManagement />,
        },
      ],
    },
  ]);

  return (
    <>
      <Preloader />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
