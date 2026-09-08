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
import { HelmetProvider } from "react-helmet-async";
import HasnainLehriShoot from "./pages/user/HasnainLehriShoot";
import BackStageServices from "./pages/user/BackStageServices";
import FashionWeeksServices from "./pages/user/FashionWeeksServices";
import FarhanaBodi from "./pages/user/FarhanaBodi";
import DigitalVideoCommercials from "./pages/user/DigitalVideoCommercials";
import FashionPhotographyBlog from "./pages/blogs/FashionPhotographyBlog";
import PakistanPage from "./pages/user/Pakistan";
import DubaiPage from "./pages/user/dubai";
import PakistanPreWeddingShootsServices from "./pages/user/pakistan-services/PreWeddingShootsServices";
import PakistanLifestylePhotographyServices from "./pages/user/pakistan-services/LifestylePhotographyServices";
import PakistanFamilyPhotographyServices from "./pages/user/pakistan-services/FamilyPhotographyServices";
import PakistanProductPhotographySevices from "./pages/user/pakistan-services/ProductPhotographySevices";
// import PakistanWeddingEventsServices from "./pages/user/pakistan-services/WeddingEventsServices";
import PakistanFoodPhotographyServices from "./pages/user/pakistan-services/FoodPhotographyServices";
import PakistanFashionServices from "./pages/user/pakistan-services/FashionServices";
import PakistanBlackAndWhiteServices from "./pages/user/pakistan-services/BlackAndWhiteServices";
import PakistanMaternityPhotographyServices from "./pages/user/pakistan-services/MaternityPhotographyServices";
import PakistanEventCoverageServices from "./pages/user/pakistan-services/EventCoverageServices";
import PakistanRealEstateServices from "./pages/user/pakistan-services/RealEstateServices";
import PakistanNeonPhotographyServices from "./pages/user/pakistan-services/NeonPhotographyServices";
import PakistanCorporateAndLinkedinServices from "./pages/user/pakistan-services/CorporateAndLinkedinServices";
import PakistanFitnessPhotographyServices from "./pages/user/pakistan-services/FitnessPhotographyServices";
import PakistanFashionWeeksServices from "./pages/user/pakistan-services/FashionWeeksServices";
import PakistanRetouchingGuideServices from "./pages/user/pakistan-services/RetouchingGuideServices";
import PakistanWeddingEventsServices from "./pages/user/pakistan-services/WeddingEventsServices";
import FaisalKapadia from "./pages/user/FaisalKapadiaShoot";
import ActorShootPage from "./pages/user/ActorShoot";

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
        // {
        //   path: "/pakistan",
        //   element: <PakistanPage />,
        // },
        // {
        //   path: "/dubai",
        //   element: <DubaiPage />,
        // },
        {
          path: "/our-services",
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
        {
          path: "/login",
          element: <Login />,
        },
        // videography Pages
        {
          path: "/pre-wedding-videography",
          element: <PreWedding />,
        },
        {
          path: "/wedding-events-videography",
          element: <WeddingEvent />,
        },
        {
          path: "/digital-video-commercials",
          element: <DigitalVideoCommercials />,
        },
        // Blog
        {
          path: "/blogs",
          element: <Blogs />,
        },
        {
          path: "/blogs/fashion-photography-dubai-17-years",
          element: <FashionPhotographyBlog />,
        },

        // Dubai Services Pages
        // Slider Type
        {
          path: "/our-services/:title",
          element: <ServicePage />,
        },
        {
          path: "/celebrity-shoots/:name",
          element: <ActorShootPage />,
        },
        // {
        //   path: "/pre-wedding-shoots",
        //   element: <PreWeddingShootsServices />,
        // },
        // {
        //   path: "/lifestyle-photography",
        //   element: <LifestylePhotographyServices />,
        // },
        // {
        //   path: "/family-photography",
        //   element: <FamilyPhotographyServices />,
        // },
        // {
        //   path: "/product-photography",
        //   element: <ProductPhotographySevices />,
        // },
        // // Gallery Type
        // {
        //   path: "/wedding-events",
        //   element: <WeddingEventsServices />,
        // },
        // {
        //   path: "/fashion-photography",
        //   element: <FashionServices />,
        // },
        // {
        //   path: "/food-photography",
        //   element: <FoodPhotographyServices />,
        // },
        // {
        //   path: "/black-&-white",
        //   element: <BlackAndWhiteServices />,
        // },
        // {
        //   path: "/maternity-photography",
        //   element: <MaternityPhotographyServices />,
        // },
        // {
        //   path: "/event-coverage",
        //   element: <EventCoverageServices />,
        // },
        // {
        //   path: "/real-estate",
        //   element: <RealEstateServices />,
        // },
        // {
        //   path: "/neon-photography",
        //   element: <NeonPhotographyServices />,
        // },
        // {
        //   path: "/corporate-&-linkedin",
        //   element: <CorporateAndLinkedinServices />,
        // },
        // {
        //   path: "/fitness-photography",
        //   element: <FitnessPhotographyServices />,
        // },
        // {
        //   path: "/retouching-guide",
        //   element: <RetouchingGuideServices />,
        // },
        // {
        //   path: "/fashion-weeks",
        //   element: <FashionWeeksServices />,
        // },
        // // Pakistan Services Pages
        // // Slider Type
        // {
        //   path: "/pakistan/pre-wedding-shoots",
        //   element: <PakistanPreWeddingShootsServices />,
        // },
        // {
        //   path: "/pakistan/lifestyle-photography",
        //   element: <PakistanLifestylePhotographyServices />,
        // },
        // {
        //   path: "/pakistan/family-photography",
        //   element: <PakistanFamilyPhotographyServices />,
        // },
        // {
        //   path: "/pakistan/product-photography",
        //   element: <PakistanProductPhotographySevices />,
        // },
        // // // Gallery Type
        // {
        //   path: "/pakistan/wedding-events",
        //   element: <PakistanWeddingEventsServices />,
        // },
        // {
        //   path: "/pakistan/fashion-photography",
        //   element: <PakistanFashionServices />,
        // },
        // {
        //   path: "/pakistan/food-photography",
        //   element: <PakistanFoodPhotographyServices />,
        // },
        // {
        //   path: "/pakistan/black-&-white",
        //   element: <PakistanBlackAndWhiteServices />,
        // },
        // {
        //   path: "/pakistan/maternity-photography",
        //   element: <PakistanMaternityPhotographyServices />,
        // },
        // {
        //   path: "/pakistan/event-coverage",
        //   element: <PakistanEventCoverageServices />,
        // },
        // {
        //   path: "/pakistan/real-estate",
        //   element: <PakistanRealEstateServices />,
        // },
        // {
        //   path: "/pakistan/neon-photography",
        //   element: <PakistanNeonPhotographyServices />,
        // },
        // {
        //   path: "/pakistan/corporate-&-linkedin",
        //   element: <PakistanCorporateAndLinkedinServices />,
        // },
        // {
        //   path: "/pakistan/fitness-photography",
        //   element: <PakistanFitnessPhotographyServices />,
        // },
        // {
        //   path: "/pakistan/retouching-guide",
        //   element: <PakistanRetouchingGuideServices />,
        // },
        // {
        //   path: "/pakistan/fashion-weeks",
        //   element: <PakistanFashionWeeksServices />,
        // },

        // Celebrity Shoots
        // {
        //   path: "/celebrity-shoots/cengiz-coşkun",
        //   element: <CengizCoskunShoot />,
        // },
        // {
        //   path: "/celebrity-shoots/bilal-abbas-khan",
        //   element: <BilalAbbasKhanShoot />,
        // },
        // {
        //   path: "/celebrity-shoots/shehzad-roy",
        //   element: <ShehzadRoyShoot />,
        // },
        //  {
        //  path: "/celebrity-shoots/momina-mustehsan",
        //   element: <MominaMustehsanShoot />,
        // },
        // {
        //   path: "/celebrity-shoots/farhan-saeed",
        //   element: <FarhanSaeedShoot />,
        // },
        // {
        //   path: "/celebrity-shoots/sadia-khan",
        //   element: <SadiaKhanShoot />,
        // },
        // {
        //   path: "/celebrity-shoots/ebraheem-al-samadi",
        //   element: <EbraheemAlSamadiShoot />,
        // },
        // {
        //   path: "/celebrity-shoots/ahsan-khan",
        //   element: <AhsanKhanShoot />,
        // },
        // {
        //   path: "/celebrity-shoots/mikaal-zulfiqar",
        //   element: <MikaalZulfiqarShoot />,
        // },
        // {
        //   path: "/celebrity-shoots/azekah-daniel",
        //   element: <AzekahDanielShoot />,
        // },
        // {
        //   path: "/celebrity-shoots/salman-saeed",
        //   element: <SalmanSaeedShoot />,
        // },
        // {
        //   path: "/celebrity-shoots/hareem-farooq",
        //   element: <HareemFarooqShoot />,
        // },
        // {
        //   path: "/celebrity-shoots/saad-qureshi",
        //   element: <SaadQureshiShoot />,
        // },
        // {
        //   path: "/celebrity-shoots/usman-mukhtar",
        //   element: <UsmanMukhtarShoot />,
        // },
        // {
        //   path: "/celebrity-shoots/mira-sethi",
        //   element: <MiraSethiShoot />,
        // },
        // {
        //   path: "/celebrity-shoots/maryam-nafees",
        //   element: <MaryamNafeesShoot />,
        // },
        // {
        //   path: "/celebrity-shoots/rabab-hashim",
        //   element: <RababHashimShoot />,
        // },
        // {
        //   path: "/celebrity-shoots/hasnain-lehri",
        //   element: <HasnainLehriShoot />,
        // },
        // {
        //   path: "/celebrity-shoots/farhana-bodi",
        //   element: <FarhanaBodi />,
        // },
        // {
        //   path: "/celebrity-shoots/faisal-kapadia",
        //   element: <FaisalKapadia />,
        // },
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
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    </>
  );
}

export default App;
