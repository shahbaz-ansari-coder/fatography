import "./App.css";
import { createBrowserRouter, Navigate, useParams } from "react-router";
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

const SERVICE_SLUGS = [
  "pre-wedding-shoots",
  "lifestyle-photography",
  "family-photography",
  "product-photography",
  "wedding-events",
  "fashion-photography",
  "food-photography",
  "black-&-white",
  "maternity-photography",
  "event-coverage",
  "real-estate",
  "neon-photography",
  "corporate-&-linkedin",
  "fitness-photography",
  "retouching-guide",
  "fashion-weeks",
];

// Keep this list in sync with the slugs used in /celebrity-shoots/:name
const CELEBRITY_SLUGS = [
  "cengiz-coşkun",
  "bilal-abbas-khan",
  "shehzad-roy",
  "momina-mustehsan",
  "farhan-saeed",
  "sadia-khan",
  "ebraheem-al-samadi",
  "ahsan-khan",
  "mikaal-zulfiqar",
  "azekah-daniel",
  "salman-saeed",
  "hareem-farooq",
  "saad-qureshi",
  "usman-mukhtar",
  "mira-sethi",
  "maryam-nafees",
  "rabab-hashim",
  "hasnain-lehri",
  "farhana-bodi",
  "faisal-kapadia",
];

function findSlugMatch(list, value) {
  return list.find((item) => item.toLowerCase() === value);
}

/**
 * Handles old /dubai/:slug and /pakistan/:slug links.
 * - If the slug belongs to a celebrity -> /celebrity-shoots/:slug
 * - If the slug belongs to a service   -> /our-services/:slug
 * - Otherwise -> home page
 */
function LegacyCategoryRedirect() {
  const { slug = "" } = useParams();
  const decodedSlug = decodeURIComponent(slug).toLowerCase();

  const matchedCelebrity = findSlugMatch(CELEBRITY_SLUGS, decodedSlug);
  if (matchedCelebrity) {
    return <Navigate to={`/celebrity-shoots/${matchedCelebrity}`} replace />;
  }

  const matchedService = findSlugMatch(SERVICE_SLUGS, decodedSlug);
  if (matchedService) {
    return <Navigate to={`/our-services/${matchedService}`} replace />;
  }

  return <Navigate to="/" replace />;
}

/** Catch-all for any other unknown/old URL. */
function NotFoundRedirect() {
  return <Navigate to="/" replace />;
}

function App() {
  const router = createBrowserRouter([
    {
      element: <RouterWrapper />,
      children: [
        // Main pages
        { path: "/", element: <Home /> },
        { path: "/about-us", element: <AboutPage /> },
        { path: "/our-services", element: <AllServicesPage /> },
        { path: "/celebrity-shoots", element: <CelebrityShootsPage /> },
        { path: "/testimonials", element: <TestimonialsPage /> },
        { path: "/contact-us", element: <ContactPage /> },
        { path: "/login", element: <Login /> },

        // Videography pages
        { path: "/pre-wedding-videography", element: <PreWedding /> },
        { path: "/wedding-events-videography", element: <WeddingEvent /> },
        { path: "/digital-video-commercials", element: <DigitalVideoCommercials /> },

        // Blog
        { path: "/blogs", element: <Blogs /> },
        {
          path: "/blogs/fashion-photography-dubai-17-years",
          element: <FashionPhotographyBlog />,
        },

        // Dynamic current-generation pages
        { path: "/our-services/:title", element: <ServicePage /> },
        { path: "/celebrity-shoots/:name", element: <ActorShootPage /> },

        // ---- Legacy URL redirects (old /dubai and /pakistan structure) ----
        { path: "/dubai/:slug", element: <LegacyCategoryRedirect /> },
        { path: "/dubai", element: <Navigate to="/our-services" replace /> },
        { path: "/pakistan/:slug", element: <LegacyCategoryRedirect /> },
        { path: "/pakistan", element: <Navigate to="/our-services" replace /> },

        // Catch-all: any other unknown link -> home
        { path: "*", element: <NotFoundRedirect /> },
      ],
    },

    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        { path: "dashboard", element: <Overview /> },
        { path: "celebrity-shoots", element: <CelebrityManagement /> },
        { path: "sliders", element: <SliderManager /> },
        { path: "testimonials", element: <ReviewsManager /> },
        { path: "new-post", element: <ShootImagesManager /> },
        { path: "account-settings", element: <AccountSettings /> },
        { path: "services", element: <ServicesManagement /> },
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